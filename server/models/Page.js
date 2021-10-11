const mongoose = require('mongoose')

const pageSchema = mongoose.Schema({
    name: { type: String },
    url: {
        type: String, require: true
    },
    index: { type: Number },
    title: { type: String },
    description: { type: String },
    enable: { type: Boolean },
    pageLayout: { type: String },
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }],
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
    publishPage: {
        type: String
    }
})

module.exports = mongoose.model('Page', pageSchema)