const mongoose = require('mongoose')

const sectionCategorySchema = mongoose.Schema({
    name: { type: String },
    img: { type:String }
})

module.exports = mongoose.model('SectionCategory', sectionCategorySchema)