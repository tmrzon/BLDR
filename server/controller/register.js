const dotenv = require('dotenv');
const firebase = require('firebase');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const mongoose = require('mongoose')
const User = require('../models/User')
// const initActions=require('./initActions')
const bcrypt = require('bcrypt');

const firebaseConfig = {
    apiKey: "AIzaSyCznY66GuoxjVLKMveNJ7C8WwRuB9C7L-Y",
    authDomain: "tammarproject.firebaseapp.com",
    databaseURL: "https://tammarproject.firebaseio.com",
    projectId: "tammarproject",
    storageBucket: "tammarproject.appspot.com",
    messagingSenderId: "255374237533",
    appId: "1:255374237533:web:a31e9ee46bedf3ec44d2b4",
    measurementId: "G-C2ZZ1DEV44"
  };
firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig);

let uid;
let email;
let ip;
let accessToken;
let jsonWebToken
let numSessions = 0;
let usernameToCheck
let userName;
let uName

const insertIfExsist = async(userEmail,userName) => {
    return new Promise(async(resolve, reject) => {
        await User.find({ email: userEmail }, async(err, users) => {
            if (users.length) {
                
                resolve({ message: 'user exists',code:0 });
                return;
            }
            const saltRounds = 10;
            const myPlaintextPassword = 's0/\/\P4$$w0rD';
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(myPlaintextPassword, salt,async function(err, hash) {         
                  const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: userEmail,
                    uid:uid,
                    username:userName,
                    apiKey:hash
                })
                let success = await user.save();
                  if (success) {                  
                resolve({ message: 'user added successfully',code:1 });
                               }
                 });         
        })
    })
    })
}



const varify = (req, res, next) => {
    return new Promise((resolve, reject) => {
        let token = (typeof req === "object") ? req.body.token : req
        decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) reject("access deiend")
        console.log("decoded " + JSON.stringify(decoded));
        resolve(decoded)
    })
}

const createLeaderJwt = (req, res) => {
    accessToken = jwt.sign({ uid: uid, email: email }, process.env.SECRET);
}

const checkPremission = async(req, res) => {
    console.log('in checkpermission',req.body.username)
    uName=req.body.username
    varify(req).then((decodedToken) => {
        uid = decodedToken.uid
        email = decodedToken.email
    })
    if (uName=="")
    {
        uName=email
    }
    try{
        console.log('before insertifexist',uName)
    insertIfExsist(email,uName).then(async(result) => {
        if (result.message) {
           
            const usernamePresent = await usernameExistCheck(uid)
             jsonWebToken = req.headers["authorization"]
             console.log('after register',userName)
            return res.status(200).json({
                "jwt": jsonWebToken,
                "uid": uid,
                "redirectUrl": req.redirectUrl,
                "is_username": usernamePresent,
                "userName":userName
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)

    })
}
catch(err)
{console.log(err)
    res.status(500).send(err)
}
}


const usernameExistCheck = async (uid) => {
    return new Promise(async(s, j) => {
      await  User.find({ uid: uid }, (err, $) => {
            console.log($)
            if($.length)
           {
               if($[0].username=="")
              {
                userName=""
                  s(false)
              }
              else{
                  if($[0].username==undefined)
                  {
                    userName=""
                    s(false)
                  }
                  else
                {userName= $[0].username
                s(true)}
               }
              }  
         else{
             j("temporary error, please try again later.")
         }

        })
    })

}

const usernameCheck = async(req, res) => {
    console.log('got to usernameCheck')
     usernameToCheck = req.body.usernameToCheck
     console.log('username',usernameToCheck)
    User.find({ username: usernameToCheck }, async(err, users) => {
        console.log('user found',users)
        if (users.length) {
            return res.json({availability: false,userName:usernameToCheck})
        }
// console.log('uid of user',uid)
    //   const newUser= await User.findOneAndUpdate({'uid' : uid}, {'username' : usernameToCheck}, {upsert: true})
    //         console.log('inside create user',doc)
    //         if (err) return res.json({error: err});
    //         else
    //        {
            return res.json({availability: true, userName:usernameToCheck})
       

    })
}

const getToken = (req, res) => {
    //console.log('verify token jwt',req.body)
    admin.auth().verifyIdToken(req.body.jwt)
        .then(function(decodedToken) {
            
    //console.log('verify token jwt',req.body.jwt)
            var token = req.body.jwt
            uid = decodedToken.uid;
            email = decodedToken.email;
            createLeaderJwt(req, res);
            console.log(accessToken)
            res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly`, 'domain = bldr.codes');
            return res.status(200).json({
                accessToken
            })
        }).catch(function(error) {
            res.status(500)
        });
}



const getUidFromToken = async(token) => {
    const decodedToken = await varify(token)
    const uid = decodedToken.uid
    return uid
}

module.exports = {
    getToken,
    checkPremission,
    usernameCheck,
    getUidFromToken,
    usernameExistCheck,
    varify

} 