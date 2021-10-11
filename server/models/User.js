const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    uid: { type: String, require: true },
    premium: { type: Boolean },
    lastSite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SiteContent'
    },
    username: { type: String },
    sites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }],
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset'
    }],
    filesInUse: [{
        type: String
    }],
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }]
})

module.exports = mongoose.model('User', userSchema)