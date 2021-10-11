const mongoose = require('mongoose')

const formSchema = mongoose.Schema({
    email: {
        type:String,require:true
    },
    inputs: [{
        type:String
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Form', formSchema)