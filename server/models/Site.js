const mongoose = require('mongoose')

const siteSchema = mongoose.Schema({
    name: { type: String },
    header: { type: String },
    url: {
        type: String, require: true
    },
    screenshot: {
        type: String
    },
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }],
    logo: { type: String },
    generalSetting: {
        type: String,
        default: JSON.stringify({
            'simpleStyles': {
                'color': 'black',
                'background-color': 'rgb(0,0,0,0)',
                'text-align': 'center',
                'width': '100%'
            },
            'divStyles': {
                'justify-content': 'center'
            },
            'spanStyles': {
                'width': '100%',
                'display': 'flex'
            },
            'divStylesHeader': {
                'color': 'black',
                'background-color': '#f0f0f0',
                // 'margin-left':'20px'
            },
            'imgStylesHeader': {

            }
        })
    },
    footer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    notFoundPage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    globalWidgetsName: { type: String },
    publishHeader: { type: String },
    publishFooter: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})



module.exports = mongoose.model('Site', siteSchema)