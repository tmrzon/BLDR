const User = require('../models/User');
const Site = require('../models/Site');
const SiteContent = require('../models/SiteContent');


module.exports = {
    getUserDetails: async (req, res) => {
        const userId = req.params.uid
        let user = await User.findOne({ uid: userId }).exec()
        //console.log("details", user)
        if (user) {
            res.status(200).json({
                'details': user
            })
        }
        else {
            res.status(500).json({
                'meassage': 'user is not defind'
            })
        }
    },
    // postUserDetails: async (req, res) => {
    //     console.log('req', req.body)
    //     const site = req.body.site
    //     console.log("lastSite", site)
    //     let user = await User.findOne({ uid: req.params.uid }).exec()
    //     console.log("user", user)
    //     const newUserDetails = new User({ userId: user._id, lastSite: site })
    //     newUserDetails.save().then(ud => {
    //         res.status(200).json({
    //             ud
    //         })
    //     }).catch(e => {
    //         res.status(500).json(e)
    //     })
    // },
    editLastSite: async (req, res) => {
        console.log('req', req.body)
        const site = req.body.site
        console.log("lastSite", site)
        let user = await User.findOne({ username: req.params.userName }).exec()
        //console.log("user", user)
        user.lastSite = site
        User.findById(user._id).then((result) => {
            result.set(user);
            console.log("result", result)
            User.save(result).then((userD) => {
                console.log("res", userD)
                res.status(200).json({
                    userD
                })
            })
        }).catch(error => {
            res.status(500).json({
                message: 'last site saved failed',
                error
            })
        });
    },

    newFileInUse: async (req, res) => {
        console.log('req', req.body)
        const file = req.body.file
        console.log("file", file)
        let user = await User.findOne({ username: req.params.userName }).exec()
        //console.log("user", user)
        user.filesInUse.push(file)
        User.findById(user._id).then((result) => {
            result.set(user);
            console.log("result", result)
            User.save(result).then((userD) => {
                console.log("res", userD)
                res.status(200).json({
                    userD
                })
            })
        }).catch(error => {
            res.status(500).json({
                message: 'file saved failed',
                error
            })
        });
    }
}