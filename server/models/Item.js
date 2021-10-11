const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name:{type: String},
    json:{type: String},
})

module.exports = mongoose.model('Item', itemSchema)