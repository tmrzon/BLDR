const path = require('path')
const jwt = require('jsonwebtoken')
const express = require("express");
const request = require('request')
const User = require('../models/User.js');
const keys = require('../config/keys')

checkPermission = async (req, res, next) => {
    const host = req.get('host');
    // console.log('host',host);
    // console.log('local',req.url);
    const isLocal = (req.query.isLocal == 'true');
    console.log("newIsLocal", isLocal);
    if (isLocal)
        return next();
    console.log("in checkPermission", req.originalUrl.split("/"));
    let userName = req.originalUrl.split("/")[1];
    let apiFlag = false
    let urlRoute
    let redirectUrl = host + "/admin";
    if (userName == "api") {
        userName = req.originalUrl.split("/")[2];
        apiFlag = true
    }
    if (!apiFlag) urlRoute = req.originalUrl.split("/")[3]
    if (!userName) {
        console.log("no uid");
        return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
    }
    else {
        console.log(req.cookies);
        const jwt = req.cookies.devJwt ? req.cookies.devJwt : req.headers['authorization'] ? req.headers['authorization'] : null
        const cookie = request.cookie(`jwt=${jwt}`)
        console.log(req.cookies.devJwt, cookie)
        console.log('keyyyys', keys(req.get('host')).API_URL_ACCOUNT)
        const options = {
            method: "GET",
            url: `${keys(req.get('host')).API_URL_ACCOUNT}/isPermission/${userName}`,
            headers: { Cookie: cookie }
        };
        request(options, (error, response, body) => {
            console.log("response.statusCode", response.statusCode)
            console.log("body", typeof (body), body)
            if (error || response.statusCode != 200) {
                return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
            }
            else {
                console.log("userName", userName)
                if (body == 'true') {
                    console.log("no error!!!!!!!");
                    return next();
                }
                return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
            }
        });
    }
};
createUser = async (req, res, next) => {
    console.log('create user')
    console.log(req.params)
    console.log(req.params.userName)
    const host = req.get('host');
    let redirectUrl = host + "/admin";
    let currentUser = await User.findOne({ username: req.params.userName })
    console.log('current user', currentUser)
    if (!currentUser) {
        let newUser = new User();
        const jwt = req.cookies.devJwt ? req.cookies.devJwt : req.headers['authorization'] ? req.headers['authorization'] : null
        const cookie = request.cookie(`jwt=${jwt}`)
        const options = {
            method: "GET",
            url: `${keys(req.get('host')).API_URL_ACCOUNT}/api/${req.params.userName}`,
            headers: { Cookie: cookie }
        };
        request(options, async (error, response, body) => {
            console.log("response.statusCode", response.statusCode)
            if (error || response.statusCode != 200) {
                return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
            }
            else {

                console.log("userName", req.params.userName)
                newUser.username = req.params.userName;
                newUser.email = JSON.parse(body).user.email;
                newUser.imgProfile = JSON.parse(body).user.imgProfile;
                newUser.uid = JSON.parse(body).user.uid;
                if (JSON.parse(body).user.displayName !== undefined) {
                    newUser.displayName = JSON.parse(body).user.displayName;
                }
                await newUser.save();
            }

        });
    }
    next()
}
// getBldrUser=async(req,res)=>{
//     try{
//         const currentUser = await User.findOne({ uid: req.params.uid });
// if(currentUser)
// res.status(200).json({user:currentUser})
// else
// res.status(401).json('message':'unauthorized')
//     }catch(error){
//         res.status(500).json({ error })
//     }
// }

// const checkPermission = async (req, res, next) => {
//     console.log('check permission!!!')
//     if (req.subdomains.length > 0) {
//         return next()
//     }
//     const pathname = req.originalUrl.split(';')[0]
//     if (pathname == "/" || pathname == '/login' || pathname == '/login/signUp') {
//         next()
//         return
//     }
//     // if (req.headers["authorization"] == "view")
//     //     return next();
//     // if (req.body && req.body.action == "firebaseloginwithcredentials" || req.body && req.body.action == "loginCheckPermission"
//     //     || req.body && req.body.action == "userNameCheck") {
//     //         console.log('after usernamecheck')
//     //     return next();
//     // }
//     //console.log('req.headers["authorization"]', req.headers["authorization"])
//     //console.log(req.headers["authorization"])
//     if (!req.headers["authorization"]) {
//         console.log('req.cookies', req.cookies)
//         if (req.cookies && req.cookies.jwt)
//             req.headers["authorization"] = req.cookies.jwt;
//         else {
//             res.redirect('https://bldr.codes/login')
//             return 
//         }
//     }
//     console.log('before jwt', req.headers["authorization"])
//     if (req.headers["authorization"]) {
//         varifyToken(req.headers["authorization"])
//             .then((varifyResult) => {
//                 if (varifyResult) {
//                     let uId = varifyResult.uid
//                     req.uId = uId
//                     console.log(req.originalUrl)
//                     console.log('return answer after valid jwt')
//                     return next();
//                 }
//             })
//             .catch((err) => {
//                 res.redirect('https://bldr.codes/login')
//                 return
//             });
//     } else {
//         res.redirect('https://bldr.codes/login')
//         return
//     }
// };

const varifyToken = (token) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) reject("access deiend");
        resolve(decoded);
    });
};

module.exports = {
    checkPermission, createUser
}
