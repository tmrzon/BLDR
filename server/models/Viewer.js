const mongoose = require('mongoose')
const viewerSchema = mongoose.Schema({
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    date: { type: Date },
    IPAddress: { type: String },
    location: { type: String},
    device: { type: String},
    browser: { type: String},
    OS: { type: String},
    leavingDate: { type: Date }
   // isFirstTime: { type: Boolean}
})

module.exports = mongoose.model('Viewer', viewerSchema)