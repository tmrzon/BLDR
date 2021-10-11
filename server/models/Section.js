const mongoose = require('mongoose')

const sectionSchema = mongoose.Schema({
    name: { type: String },
    item: {
        type: String
    },
    index: { type: Number },
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sectionCategory'
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SiteContent'
    }
})

module.exports = mongoose.model('Section', sectionSchema)