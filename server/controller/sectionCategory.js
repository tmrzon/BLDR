const SectionCategory = require('../models/SectionCategory');

module.exports = {
    newSectionCategory: async (req, res) => {
        //console.log('req', req.body)
        const category = req.body.name;
        console.log('catName', category)
        const newCategory = new SectionCategory({ name: category, img:req.body.img});
        //console.log('category', newCategory)
        newCategory.save().then((result) => {
            console.log('newCategory', result)
            res.status(200).json({
                message: 'category created',
                result
            })
        }).catch(error => {
            console.log('here is the error', error)
            res.status(500).json({
                error
            })
        })
    },
    getCategories: (req, res) => {
        console.log('get categories')
        SectionCategory.find().then((result) => {
            //console.log('get cat', result)
            res.status(200).json({
                result
            })
        }).catch(err => {
            res.status(500).json({
                err
            })
        })
    },

    deleteCategory: (req, res) => {
        console.log('req.body.categoryId', req.body)
        SectionCategory.findByIdAndDelete(req.body.categoryId, (err) => {
            console.log('err', err)
            if (err)
                res.status(500).json({ err })
            else {

                res.status(200).json({ message: 'category deleted' })
            }
        })
    },
    editSectionCategory: (req, res) => {
        const category = req.body.sectionCategory;
        console.log("req", req.body)
        SectionCategory.findById(category._id).then((result) => {
            console.log("result", result)
            result.set(category);
            result.save();
            res.status(200).json({
                result
            })
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'category error',
                error
            })
        })
    },
}
