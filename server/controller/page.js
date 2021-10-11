const Page = require('../models/Page');
const SiteContent = require('../models/SiteContent');
const Section = require('../models/Section');
const User = require('../models/User');
const sectionController = require('../controller/section');



saveChangesInPages = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!page)
                resolve(true)
            let updatedPage = await Page.findById(page._id)
            // console.log('updatedPage', updatedPage)
            // console.log('page', page)
            // console.log('sections', updatedPage.sections)
            for (const sec of updatedPage.sections) {
                await Section.findByIdAndDelete(sec)
            }
            let newPage = Object.assign({}, page)
            newPage.sections = []
            for (const s of page.sections) {
                // console.log('sectionnnn', s)
                let se = new Section(s)
                delete se._id
                se = await se.save()
                newPage.sections.push(se._id)
                // console.log('sesesese', se)
            }
            await updatedPage.set(newPage)
            // console.log('new page', newPage)
            await updatedPage.save()
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}
newPageBySiteId = (siteContentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const siteContent = await SiteContent.findById(siteContentId)
            const index = siteContent.pages.length

            const item = JSON.stringify({
                "tagName": "grid",
                "attributes": {},
                "styles": {
                    "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center" },
                    "divStyles": { "justify-content": "center" }, "spanStyles": { "width": "100%" }
                },
                "index": null,
                "rows": [{
                    "attributes": {},
                    "cols": [{
                        "attributes": { "class": "col p-1" },
                        "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "100vh" },
                        "items": [], "index": 0, "_parentRow": null
                    }], "index": 0, "_parentItem": null
                }],
                "children": [], "textContent": null, "_parentCol": null
            })

            let newPage = new Page({
                name: 'New Page',
                url: 'newPage' + index,
                index,
                title: 'new page in ' + siteContent.name,
                enable: true,
                pageLayout: 'container-fluid',
                siteId: siteContent._id
            });
            newPage = await newPage.save()
            await SiteContent.findOneAndUpdate({ _id: newPage.siteId }, { $push: { pages: newPage._id } })
            let newSection = new Section({
                name: 'untitled',
                index: 0,
                pageId: newPage._id,
                item
            })
            newSection = await newSection.save()
            newPage = await Page.findOneAndUpdate({ _id: newPage._id }, { $push: { sections: newSection._id } })
            let resPage = await Page.findById(newPage._id).populate({ path: 'sections' })
            resolve(resPage)
        }
        catch (error) {
            reject(error)
        }
    })
}
setPageAsset = (pageAsset, pageToSet, siteId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('pageToSet', pageToSet);
            let newPage
            console.log('pageAsset', pageAsset);
            if (pageToSet) {
                newPage = await Page.findByIdAndUpdate(pageToSet, {
                    $set: {
                        name: pageAsset.name,
                        url: pageAsset.url,
                        sections: [],
                        index: pageAsset.index,
                        title: pageAsset.title,
                        enable: pageAsset.enable,
                        pageLayout: pageAsset.pageLayout,
                        siteId: siteId,
                        description: pageAsset.description
                    }
                }, { new: true })
            }
            else {
                newPage = new Page({
                    name: pageAsset.name,
                    url: pageAsset.url,
                    sections: [],
                    index: pageAsset.index,
                    title: pageAsset.title,
                    enable: pageAsset.enable,
                    pageLayout: pageAsset.pageLayout,
                    siteId: siteId,
                    description: pageAsset.description
                })
                newPage = await newPage.save()
                let siteContent
                if (newPage.name != 'Not Found')
                    siteContent = await SiteContent.findByIdAndUpdate(siteId, { $push: { pages: [newPage._id] } }, { new: true })
                console.log('newsiteeeee', siteContent)

            }
            console.log('new page _id', newPage);
            for (const sec of pageAsset.sections) {
                let section = await Section.findOne({ _id: sec }).exec()
                let newSection = await sectionController.setSectionAsset(section, newPage._id)
            }
            newPage = await Page.findOne({ _id: newPage._id })
            console.log('newPageee', newPage)
            console.log('siteId', siteId)
            if (newPage.name == 'Not Found')
                siteContent = await SiteContent.findByIdAndUpdate(siteId, { $set: { notFoundPage: newPage._id } }, { new: true })
            resolve(newPage)
        }
        catch (error) {
            reject(error)
        }

    })
}
module.exports = {
    newPageBySiteId,
    saveChangesInPages,
    setPageAsset,
    getPage: (req, res) => {
        const { pageId } = req.body;
        console.log("pageId", pageId)
        Page.findOne({ _id: pageId }).populate({ path: 'sections' })
            .then((page) => {
                console.log("page", page)
                res.status(200).json({
                    page
                })

            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
    },
    getPageByUrl: (req, res) => {
        const pageUrl = req.body.pageUrl;
        const siteId = req.body.siteId;
        Page.find({ url: pageUrl })
            .then((page) => {
                if (page[0].siteId == siteId) {
                    console.log("page", page)
                    res.status(200).json({
                        page
                    })
                }
                else {
                    res.status(500).json({
                        message: 'page not found',
                    })
                }
            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
    },

    newPage: async (req, res) => {
        const siteContentId = req.body.siteId
        if (!siteContentId)
            return res.status(500).json({ message: 'no site Id' })
        try {
            let resPage = await newPageBySiteId(siteContentId)
            res.status(200).json({
                message: 'page created',
                result: resPage
            })

        } catch (error) {
            res.status(500).json({ error })
        }
    },
    editPage: (req, res) => {
        const page = req.body;
        Page.findOne({ siteId: page.siteId, url: req.body.page.url }).exec((err, result) => {
            if (result && result._id != page._id) {
                res.status(409).json({
                    message: 'url already exists '
                })
            }
            else
                Page.findOneAndUpdate({ _id: page._id }, { page }).then((page) => {

                    console.log('page updated', page)
                    res.status(200).json({
                        page
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        message: 'page error',
                        error
                    })
                })
        })

    },
    editPageIndex: async (req, res) => {
        const page = req.body.page;
        console.log("req", req.body.page)
        console.log("page", page)
        try {
            const myPage = await Page.findOne({ _id: page._id }).exec()
            const site = await SiteContent.findById(page.siteId).populate({ path: 'pages' })

            let pages = []
            if (site.pages.length == 1) {
                res.status(500).json({
                    message: 'page index error'
                })
            }
            else {
                if (myPage.index > page.index) {
                    site.pages.forEach(async (p) => {
                        if (p.index >= page.index && p.index < myPage.index) {
                            console.log("p", p)
                            p.index++
                            p = await p.save()
                            pages.push({ "_id": p._id, "index": p.index })
                        }
                    })
                }
                if (myPage.index < page.index) {
                    site.pages.forEach(async (p) => {
                        if (p.index <= page.index && p.index > myPage.index) {
                            console.log("p", p)
                            p.index--
                            p = await p.save()
                            pages.push({ "_id": p._id, "index": p.index })
                        }
                    })
                }
                myPage.index = page.index;
                myPage = await myPage.save();
                console.log(pages)
                res.status(200).json({
                    message: 'the index changed',
                    pages
                })
            }
        }
        catch (err) {
            res.status(500).json({
                message: 'page index error',
                err
            })
        }


        // Page.findById(page._id).then((result) => {
        //     console.log("result", result)
        //     Page.find({}).then((data) => {
        //         let pages = []
        //         if (data.length == 1) {
        //             result.index = 0;
        //             result.save()
        //             res.status(500).json({
        //                 message: 'page index error'
        //             })
        //         }
        //         else {
        //             if (result.index > page.index)
        //                 data.forEach(p => {
        //                     if (p.index >= page.index && p.index < result.index) {
        //                         console.log("p", p)
        //                         p.index++
        //                         p.save()
        //                         pages.push({ "_id": p._id, "index": p.index })
        //                     }
        //                 })
        //             if (result.index < page.index)
        //                 data.forEach(p => {
        //                     if (p.index <= page.index && p.index > result.index) {
        //                         console.log("p", p)
        //                         p.index--
        //                         p.save()
        //                         pages.push({ "_id": p._id, "index": p.index })
        //                     }
        //                 })
        //             result.index = page.index;
        //             result.save();
        //             console.log(pages)
        //             res.status(200).json({
        //                 pages
        //             })
        //         }
        //     })
        // }).catch(error => {
        //     console.log(error);
        //     res.status(500).json({
        //         message: 'page index error',
        //         error
        //     })
        // })
    },
    duplicatePage: async (req, res) => {
        try {
            const page = req.body.page
            const currentUser = await User.findOne({ username: req.params.userName })
            const pageToDuplicte = await Page.findOne({ _id: page._id }).populate({ path: 'sections' })
            let site = await SiteContent.findOne({ _id: pageToDuplicte.siteId })
            console.log('site', site)
            await saveChangesInPages(page)
            const pagesAmount = site.pages.length
            let newPage = new Page({
                name: pageToDuplicte.name + ' copy',
                url: pageToDuplicte.url + 'Copy',
                index: pagesAmount,
                title: pageToDuplicte.title + ' copy',
                description: pageToDuplicte.description,
                enable: pageToDuplicte.enable,
                pageLayout: pageToDuplicte.pageLayout,
                siteId: site._id,
                sections: []
            })
            newPage = await newPage.save()
            for (const sec of pageToDuplicte.sections) {
                console.log('sec', sec);
                let sourceSec = new Section({
                    index: sec.index,
                    name: sec.name,
                    item: sec.item,
                    pageId: sec.pageId,
                    categoryId: sec.categoryId
                })
                sourceSec = await sourceSec.save()
                console.log('sourceSec', sourceSec);
                newPage.sections.push(sourceSec._id)
            }
            console.log('new page', newPage)
            newPage = await newPage.save()
            site.pages.push(newPage._id)
            console.log('site', site)
            site = await site.save()
            let resPage = await Page.findById(newPage._id).populate({ path: 'sections' })
            console.log('resssPage', resPage)
            res.status(200).json({
                message: 'page created',
                result: resPage
            })
        }
        catch (e) {
            console.log('duplicate error', e)
            res.status(500).json(e)
        }
    },
    //This function is working perfect 14.01
    deletePage: async (req, res) => {
        const { pageId } = req.body;
        try {
            const page = await Page.findByIdAndDelete(pageId)
            const sections = page.sections;

            for (const sectionId of sections) {
                await Section.findByIdAndDelete(sectionId).catch(error => {
                    throw error
                })
            }
            let siteC = await SiteContent.findOne({ _id: page.siteId }).populate([{ path: 'pages', populate: { path: 'sections' } }])
            console.log('siteC', siteC)
            for (const p of siteC.pages) {
                if (p.index > page.index) {
                    p.index--
                    await p.save()
                }
            }
            siteC = await SiteContent.findOneAndUpdate({ _id: page.siteId }, { $pull: { pages: pageId } }).populate([
                { path: 'pages', populate: { path: 'sections' } }])
            if (siteC.pages.length == 0) {
                let newPage = await newPageBySiteId(page.siteId)
                console.log('newPageee', newPage);
                return res.status(200).send({
                    result: newPage
                })
            }
            return res.status(200).send({
                result: null
            })

        }
        catch (error) {
            res.status(500).json({
                error
            })
        }


    }
}