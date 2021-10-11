const express = require('express')
const router = express.Router()
const path=require('path')
const { getToken, usernameCheck, checkPremission } = require('../controller/register')


router.post("/getAccessToken",(req,res,next)=>{console.log('inside register');next()}, getToken)
router.post("/checkPremission",(req,res,next)=>{console.log('inside register');next()}, checkPremission)
router.post("/usernameCheck",(req,res,next)=>{console.log('inside register');next()}, usernameCheck)
// router.get('/', (req, res) => {
//     console.log('succeded to enter to login')
//     res.sendFile(path.join(__dirname,"../Login/views/index.html"))
// });

//changed: green code - get login views
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,"../Login/views/index.html"))
// });

module.exports = router;