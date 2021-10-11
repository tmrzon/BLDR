const mongoose = require('mongoose')

const headerSchema = mongoose.Schema({
    item: {
        type:String
    },
    links: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }],
    siteId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
})

module.exports = mongoose.model('Header', headerSchema)