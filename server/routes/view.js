const express = require('express');
const router = express.Router();
const path = require('path')
router.use(logger)
function logger(res, req, next) {
    console.log("inside");
    next()
}


// router.get('/:uid', (req,res)=>{
router.get('/*', (req, res) => {
    console.log('got to views')
    console.log(path.join(__dirname, '../dist/leaderSites/index.html'));
    return res.sendFile(path.join(__dirname, "../dist/leaderSites/index.html"))
})


module.exports = router;

