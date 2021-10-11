const Header = require('../models/Header');
const SiteContent = require('../models/SiteContent');

module.exports = {
    getHeader: (req, res) => {
        const { HeaderId } = req.body;
        Header.find({ _id: HeaderId})
            .then((header) => {
               // console.log("Section",Section)
                res.status(200).json({
                    header
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
    },
    newHeader: (req, res) => {
        console.log('new header')
        const { header } = req.body;
        //let item=JSON.stringify(section.item)
       // console.log("item",item)
        const newHeader=new Header(header);
        console.log(header,"header.siteId",header.siteId)
       // let pageId = section.pageId.substring(0, section.pageId.length - 1)
        SiteContent.findOneAndUpdate({_id:header.siteId},{$push:{header:newHeader._id}}).then((site)=>{
            newHeader.siteId = site._id;
            console.log("kkkkkkkkk:",newHeader)
            newHeader.save().then((result) => {
                res.status(200).json({
                    message: 'header created',
                    result
                })
                console.log("sssss")
            }).catch(error => {
                res.status(500).json({
                    error
                })
                console.log("eeeeee")
            })
 
        }).catch(error => {
            res.status(500).json({
                error
            })
            console.log("rrrrrr")
        })
    },
    editHeader: (req, res) => {
        const { header } = req.body;
        Header.findById(header._id).then((result) => {
            if (!result) {
                this.newHeader(req, res)
            }
            else {
                result.set(section);
                result.save().then((section) => {
                    console.log("sssssssssssssssssssssss")
                    res.status(200).json({
                        section
                    })
                }).catch(error => {
                    res.status(500).json({
                        message: 'section not found',
                        error
                    })
                });
            }
        }).catch(error => {
            console.log("eeeeeeee", error);
            res.status(500).json({
                message: 'section not found',
                error
            })
        })
    },
}