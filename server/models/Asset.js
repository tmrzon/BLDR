const mongoose = require('mongoose')

const assetSchema = mongoose.Schema({
   userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   },
   assetType: { type: String },
   price: { type: Number },
   screenShot: { type: String },
   siteId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'SiteContent'
   },
   pageId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Page'
   },
   templateId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Section'
   },
   widgetId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Item' 
   }
})

module.exports = mongoose.model('Asset', assetSchema)