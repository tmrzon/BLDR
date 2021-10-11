const Section = require('../models/Section');
const Page = require('../models/Page');

setSectionAsset=(sectionAsset,pageId)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            console.log('sectionAsset',sectionAsset)
            let newSection=new Section({
                index:sectionAsset.index,
                name:sectionAsset.name,
                item:sectionAsset.item,
                pageId:pageId,
                categoryId:sectionAsset.categoryId
            })
            newSection=await newSection.save()
            console.log('newSection',newSection)
            if(pageId)
                page = await Page.findByIdAndUpdate(pageId, { $push: { sections: [newSection._id] } }, { new: true })
            console.log('paggggg',page)
            resolve(newSection)
        }
        catch(error){
            reject(error) 
        }

    })
}

module.exports = {
    setSectionAsset,
    getSection: (req, res) => {
        const { sectionId } = req.body;
        Section.find({ _id: sectionId})
            .then((section) => {
               // console.log("Section",Section)
                res.status(200).json({
                    section
                })

            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
    },
    getSections: (req, res) => { 
        console.log('get sections')    
        Section.find().then((result) => {
            console.log('get sec',result) 
            res.status(200).json({
                result
            })
        }).catch(err=>{
            res.status(500).json({
                err
            })
        })
    },
    newSection: (req, res) => {
        console.log('new section')
        const  section = req.body;
        console.log('req',req.body)
        //let item=JSON.stringify(section.item)
       // console.log("item",item)
        const newSection=new Section({index:section.index,name:section.name,item:section.item,categoryId:section.categoryId});
        console.log('section:::',newSection)
        console.log('pageId',section.pageId)
        // console.log(section,"section.pageId",section.pageId)
       // let pageId = section.pageId.substring(0, section.pageId.length - 1)
       if(section.pageId)
        Page.findOneAndUpdate({_id:section.pageId},{$push:{sections:newSection._id}}).then((page)=>{
            newSection.pageId = page._id;
            console.log("kkkkkkkkk:",newSection)
            newSection.save().then((result) => {
                res.status(200).json({
                    message: 'section created',
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
        else
        newSection.save().then(s=>{
            res.status(200).json({
                'message':'global section created',
                'result':s
            }).catch(e=>{
                res.status(500).json(e)
            })
        })
    },
    editSection: (req, res) => {
        const { section } = req.body;
        console.log('section.index before create new',section.index)
        Section.findById(section._id).then((result) => {
                result.set(section);
                result.save().then((section) => {
                    console.log("sssssssssssssssssssssss")
                    res.status(200).json({
                        section
                    })
                }).catch(error => {
                    res.status(500).json({
                        message: 'section saved failed',
                        error
                    })
                });
        }).catch(error => {
            console.log("eeeeeeee", error);
            console.log('section.index',section.index)
            const newSection=new Section({'name':section.name,'item':section.item,'index':section.index,'pageId':section.pageId});
            console.log('newSection',newSection)
            console.log(section,"section.pageId",section.pageId)
           // let pageId = section.pageId.substring(0, section.pageId.length - 1)
            Page.findOneAndUpdate({_id:section.pageId},{$push:{sections:newSection._id}}).then((page)=>{
                newSection.pageId = page._id;
                console.log("kkkkkkkkk:",newSection)
                newSection.save().then((result) => {
                    res.status(200).json({
                        message: 'section created',
                        result
                    })
                    console.log("sssss")
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                    console.log("failed to save new section")
                    console.log(error
                        )
                })     
            }).catch(error => {
                res.status(500).json({
                    error
                })
                console.log("rrrrrr")
            })
    
            // res.status(500).json({
            //     message: 'section not found',
            //     error
            // })
        })
    },
    deleteSection: (req, res) => {
        const  sectionId = req.body.sectionId;
         console.log(sectionId);
        Section.findByIdAndDelete(sectionId).exec()
            // Section.deleteOne(section).then((result) => {
            //     // Page.findById(section.pageId).then((data) => {
            //         // console.log('data',data)
            //         // let i=data.sections.indexOf(section._id)
            //         // console.log('index',i)
            //         // data.sections.splice(i,1)
            //         // data.save()
            //         // })
            //         // console.log("sections", data.sections)
            //         res.status(200).send({
            //             pages
            //         })
            //     }).catch(error => {
            //     res.status(500).json({
            //         message: 'section not deleted',
            //         error
            //     })
            // })
        // }).catch(error => {
        //     res.status(500).json({
        //         message: 'section error',
        //         error
        //     })
        // })
    },
    duplicateSection:(req,res)=>{
        //todo duplicate actions
    },
    getSectionsByCategoryId: (req, res) => {
        const categoryId = req.body.categoryId;
        console.log("id",categoryId)
        Section.find({ categoryId: categoryId})
            .then((result) => {
                console.log('result',result)
                res.status(200).json({
                    result
                })

            }).catch(error => {
                console.log('error',error)
                res.status(500).json({
                    error
                })
            })
    },
}