const User = require('../models/User.js');
const Site = require('../models/Site');
const Page = require('../models/Page');
const Asset = require('../models/Asset');
const Section = require('../models/Section');
const SiteContent = require('../models/SiteContent');
const SiteContentController = require('../controller/siteContent');
const pageController = require('../controller/page')
const Viewer = require('../models/Viewer');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const systemObjects = require('../systemObjects')
const globalFunctions = require('../controller/globalFunctions')

//let socketHolder = require('./socket');


addViewer = (req) => {
    console.log('in addViewer');
    return new Promise(async (resolve, reject) => {
        try {
            let newViewer = new Viewer(req.body.viewerDetails);
            newViewer.IPAddress = requestIp.getClientIp(req);
            let geo = geoip.lookup(newViewer.IPAddress);
            console.log('geo: ');
            console.log(geo.country);
            console.log(geo.city);
            newViewer.location = geo.country;
            newViewer.date = new Date();
            //newViewer.isFirstTime = await isFirstTime(newViewer.IPAddress, newViewer.pageId);
            await newViewer.save();
            //socketHolder.emit('dataUpdate',statistics);
            resolve(newViewer._id);
        }
        catch (err) {
            console.log('error: ' + err);
            reject(err);
        }
    })
}
// duplicateSiteContent = async (sourceSiteContent, ifPublish, currentUser) => {
//     return new Promise(async (resolve, reject) => {
//         console.log('source', sourceSiteContent)
//         try {
//             const sitesAmount = currentUser.sites.length
//             let newSiteContent
//             if (ifPublish) {
//                 newSiteContent = new SiteContent({
//                     header: sourceSiteContent.header,
//                     name: sourceSiteContent.name,
//                     url: sourceSiteContent.url.toLowerCase(),
//                     logo: sourceSiteContent.logo,
//                     generalSetting: sourceSiteContent.generalSetting,
//                     screenshot: sourceSiteContent.screenshot,
//                     globalWidgetsName: sourceSiteContent.globalWidgetsName
//                 })
//             }
//             else {
//                 newSiteContent = new SiteContent({
//                     header: sourceSiteContent.header,
//                     name: sourceSiteContent.name + 'copy' + sitesAmount,
//                     url: sourceSiteContent.url.toLowerCase() + 'copy' + sitesAmount,
//                     logo: sourceSiteContent.logo,
//                     generalSetting: sourceSiteContent.generalSetting,
//                     screenshot: sourceSiteContent.screenshot,
//                     globalWidgetsName: sourceSiteContent.globalWidgetsName
//                 })
//             }
//             newSiteContent = await newSiteContent.save()
//             console.log('newSiteContent', newSiteContent)
//             let sourcePage, sourceSec
//             for (const p of sourceSiteContent.pages) {
//                 sourcePage = await Page.findById(p)
//                 const pageSections = sourcePage.sections

//                 let sourcePage1 = new Page({
//                     name: sourcePage.name,
//                     url: sourcePage.url,
//                     index: sourcePage.index,
//                     enable: sourcePage.enable,
//                     pageLayout: sourcePage.pageLayout,
//                     siteId: sourcePage.siteId,
//                     title: sourcePage.title,
//                     sections: []
//                 })
//                 sourcePage1 = await sourcePage1.save()

//                 // sourcePage.set({ sections: [] })
//                 sourcePage1.siteId = newSiteContent._id
//                 for (const sec of pageSections) {
//                     sourceSec = await Section.findById(sec)
//                     sourceSec = new Section({
//                         name: sourceSec.name,
//                         item: sourceSec.item,
//                         index: sourceSec.index,
//                         pageId: sourcePage._id,
//                         categoryId: sourceSec.categoryId
//                     })
//                     sourceSec = await sourceSec.save()
//                     sourcePage1.sections.push(sourceSec._id)
//                 }
//                 // console.log('sp', sourcePage)
//                 sourcePage1 = await sourcePage1.save()
//                 console.log('sorcePage1', sourcePage1)
//                 // console.log('sps', sourcePage)
//                 newSiteContent.pages.push(sourcePage1._id)
//             }
//             let pageSections = []
//             if (sourceSiteContent.notFoundPage) {
//                 sourcePage = await Page.findById(sourceSiteContent.notFoundPage)
//                 pageSections = sourcePage.sections
//             }
//             let sourcePage1 = new Page({
//                 name: sourcePage.name,
//                 url: sourcePage.url,
//                 enable: sourcePage.enable,
//                 pageLayout: sourcePage.pageLayout,
//                 siteId: sourcePage.siteId,
//                 title: sourcePage.title,
//                 sections: []
//             })
//             sourcePage1 = await sourcePage1.save()

//             // sourcePage.set({ sections: [] })
//             sourcePage1.siteId = newSiteContent._id
//             for (const sec of pageSections) {
//                 sourceSec = await Section.findById(sec)
//                 sourceSec = new Section({
//                     name: sourceSec.name,
//                     item: sourceSec.item,
//                     index: sourceSec.index,
//                     pageId: sourcePage._id,
//                     categoryId: sourceSec.categoryId
//                 })
//                 sourceSec = await sourceSec.save()
//                 sourcePage1.sections.push(sourceSec._id)
//             }
//             // console.log('sp', sourcePage)
//             sourcePage1 = await sourcePage1.save()
//             console.log('sorcePage1', sourcePage1)
//             // console.log('sps', sourcePage)
//             newSiteContent.notFoundPage = sourcePage1._id

//             newSiteContent = await newSiteContent.save()
//             resolve(newSiteContent)
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// duplicateSitePromise = (site, siteToSet, userName) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // console.log('siteContent', siteContent)
//             const currentUser = await User.findOne({ username: userName });
//             const siteToDuplicte = await Site.findOne({ _id: site._id })
//             /////
//             const sitesAmount = currentUser.sites.length
//             let newSite = new Site({
//                 userId:currentUser._id,
//                 header: sourceSiteContent.header,
//                 name: sourceSiteContent.name + 'copy' + sitesAmount,
//                 url: sourceSiteContent.url.toLowerCase() + 'copy' + sitesAmount,
//                 logo: sourceSiteContent.logo,
//                 generalSetting: sourceSiteContent.generalSetting,
//                 screenshot: sourceSiteContent.screenshot,
//                 globalWidgetsName: sourceSiteContent.globalWidgetsName
//             })
//             newSite=await newSite.save()
//             for (const p of site.pages) {
//                 sourcePage = await Page.findById(p)
//                 const pageSections = sourcePage.sections

//                 let sourcePage1 = new Page({
//                     name: sourcePage.name,
//                     url: sourcePage.url,
//                     index: sourcePage.index,
//                     enable: sourcePage.enable,
//                     pageLayout: sourcePage.pageLayout,
//                     siteId: sourcePage.siteId,
//                     title: sourcePage.title,
//                     sections: []
//                 })
//                 sourcePage1 = await sourcePage1.save()

//                 // sourcePage.set({ sections: [] })
//                 sourcePage1.siteId = newSiteContent._id
//                 for (const sec of pageSections) {
//                     sourceSec = await Section.findById(sec)
//                     sourceSec = new Section({
//                         name: sourceSec.name,
//                         item: sourceSec.item,
//                         index: sourceSec.index,
//                         pageId: sourcePage._id,
//                         categoryId: sourceSec.categoryId
//                     })
//                     sourceSec = await sourceSec.save()
//                     sourcePage1.sections.push(sourceSec._id)
//                 }
//                 // console.log('sp', sourcePage)
//                 sourcePage1 = await sourcePage1.save()
//                 console.log('sorcePage1', sourcePage1)
//                 // console.log('sps', sourcePage)
//                 newSiteContent.pages.push(sourcePage1._id)
//             }

//             /////
//             // let publish = await SiteContentController.duplicateSiteContent(source, false, currentUser, siteToSet ? siteToSet.publish : null)
//             let site
//             if (siteToSet) {
//                 siteToSet.draft = draft._id
//                 siteToSet.publish = publish._id
//                 site = await siteToSet.save()
//                 console.log('site to set', site)
//             }
//             else {
//                 site = new Site({ draft: draft._id, publish: publish._id, userId: currentUser._id })
//                 site = await site.save()
//             }
//             await SiteContent.findByIdAndUpdate(draft._id, { siteId: site._id }, { new: true })
//             await SiteContent.findByIdAndUpdate(publish._id, { siteId: site._id }, { new: true })
//             await User.findByIdAndUpdate(currentUser._id, { $push: { sites: site._id } })
//             let s = await SiteContent.findOne({ _id: site.draft }).populate({ path: 'pages', populate: { path: 'sections' } })
//             console.log('s', s)
//             resolve(s)
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
createBlankSite = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const item = JSON.stringify(systemObjects.blankPageItem)
            let section = new Section({
                name: 'empty',
                item,
                index: 0,
            })
            let page = new Page({
                name: 'Home',
                url: 'home',
                index: 0,
                enable: true,
                pageLayout: 'container-fluid',
                sections: []
            })
            const item404 = JSON.stringify(systemObjects.item404)
            let section404 = new Section({
                name: 'not found',
                item: item404,
                index: 0,
            })
            let page404 = new Page({
                name: 'Not Found',
                url: '**',
                enable: false,
                pageLayout: 'canvas',
                sections: []
            })
            let site = new Site({ name: 'blank', pages: [], logo: './assets/icons/bldr 2.png' })
            site = await site.save()
            let footerSection = new Section({
                name: 'footer',
                item: JSON.stringify(systemObjects.defaultFooterItem),
                siteId: Site._id
            })
            footerSection = await footerSection.save()

            page.siteId = site._id
            page = await page.save()
            page404.siteId = site._id
            page404 = await page404.save()
            site = await Site.findByIdAndUpdate(site._id, { $push: { pages: [page._id] }, $set: { notFoundPage: page404._id, footer: footerSection._id } }, { new: true })
            console.log('site with 404')
            section.pageId = page._id
            section404.pageId = page404._id
            section = await section.save()
            section404 = await section404.save()
            await Page.findByIdAndUpdate(page._id, { $push: { sections: section._id } })
            await Page.findByIdAndUpdate(page404._id, { $set: { notFoundPage: page404._id } })
            resolve(site)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    // duplicateSitePromise,
    getUidByUserName: async (req, res) => {
        const userName = req.params.userName
        const user = await User.findOne({ username: userName })
        if (user)
            res.json({ "uid": user.uid })
    },
    newSite: async (req, res) => {
        console.log('************************')
        try {
            const userName = req.params.userName
            const user = await User.findOne({ username: userName })
            const siteName = userName.toLowerCase() + user.sites.length
            const isUrlExist = await Site.findOne({ url: siteName })
            if (isUrlExist)
                return res.status(409).json({ message: 'site name exist' })
            const url = siteName
            let site
            switch (req.body.siteType) {
                case 'blank': site = await createBlankSite(siteName)
                    break;
                case 'bldrTemplate':
                    // let asset = await Asset.findOne({ _id: '60ed86e1bd205f18dcbed4b5' })
                    // let siteAsset = await SiteContent.findOne({ _id: asset.siteId })
                    // siteContentToPublish = await SiteContentController.createPublishEmptySiteContent(req.body.siteName.toLowerCase())
                    // // siteContent = await SiteContentController.createTemplateSiteContentPage2(req.body.siteName.toLowerCase())
                    // siteContent = await SiteContentController.setSiteContentAsset(siteAsset)
                    // console.log('siteContentAsset',siteContent);
                    break;
            }
            await Site.findByIdAndUpdate(site._id, { url: url, name: siteName, userId: user._id }, { new: true })
            await User.findByIdAndUpdate(user._id, { $push: { sites: site._id }, lastSite: site._id })
            let siteWithAllData = await Site.findById(site._id).populate([
                { path: 'pages', populate: { path: 'sections' } },
                { path: 'notFoundPage', populate: { path: 'sections' } },
                { path: 'footer' }])
            res.status(200).json({ message: 'site created', site: siteWithAllData })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    getSites: async (req, res) => {
        console.log('All Projects')
        const user = await User.findOne({ username: req.params.userName }).exec()
        console.log('user', user)
        let sites = await Site.find({ userId: user._id }).exec()
        res.status(200).json({
            'sites': sites
        })
    },
    getSiteByUrl: async (req, res) => {
        //get url of siteContent
        console.log('succeded')
        console.log(req.body.siteUrl)
        const siteUrl = req.body.siteUrl;
        try {
            let siteContents = await SiteContent.find({ url: siteUrl })
            const globalSite = await Site.findById(siteContents[0].siteId)
            let siteContent = siteContents.find(s => s._id.toString() == globalSite.publish.toString())
            const pages = await Page.find({ siteId: siteContent._id })
            let allSections = []
            let sections
            for (const p of pages) {
                console.log('p for s', p)
                sections = await Section.find({ pageId: p._id })
                console.log('s of p', sections)
                allSections = allSections.concat(sections)
            }
            req.body.viewerDetails.site = siteContent._id;
            let viewerId = await addViewer(req);
            console.log('sc1', siteContent)
            let siteContentToSend = await SiteContent.findById(siteContent._id).populate([
                { path: 'pages', populate: { path: 'sections' } },
                { path: 'notFoundPage', populate: { path: 'sections' } },
                { path: 'footer' }]);
            console.log('scp', siteContentToSend)
            res.status(200).json({
                'site': siteContentToSend,
                pages,
                'sections': allSections,
                'viewerId': viewerId
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error })
        }
    },

    duplicateSite: async (req, res) => {
        console.log('in duplicateSite', req.body)
        try {
            let result = await Site.findOne({ name: req.body.site.name })
            console.log('efore', result)
            let cl = globalFunctions.cleanId(result)
            console.log('cl', cl)
            // let result = await duplicateSitePromise(req.body.site, req.body.siteToSet, req.params.userName)

            res.status(200).json({
                message: 'site duplicated',
                siteContent: result
            })
        }
        catch (e) {
            console.log('duplicate error', e)
            res.status(500).json(e)
        }
    },

    // works perfectly 14.01
    deleteSite: async (req, res) => {
        //get draft Id and delete its parent site and all the descendants.
        console.log('req.body.siteId', req.body)
        try {
            const siteContentDraft = await SiteContentController.deleteSiteContent(req.body.siteId)
            const user = await User.findOne({ username: req.params.userName })
            let siteToDelete = user.sites.find(s => s == siteContentDraft.siteId)
            user.sites.splice(user.sites.indexOf(siteToDelete), 1)
            console.log('user before last site', user)
            if (user.lastSite == req.body.siteId)
                if (user.sites.length > 0) {
                    let u = await Site.findById(user.sites[user.sites.length - 1])
                    console.log('uls', u)
                    user.lastSite = u.draft
                    console.log('ls', user.lastSite)
                }
                else {
                    user.lastSite = null;
                }
            let u = await user.save()
            console.log('user after last site', u)
            const site = await Site.findByIdAndDelete(siteContentDraft.siteId)
            console.log('site.pulish', site.publish)
            if (site.publish)
                await SiteContentController.deleteSiteContent(site.publish.toString())
            res.status(200).json({
                'message': 'site deleted',
                'result': req.body.siteId
            })
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    },
    publishSite: async (req, res) => {
        try {
            console.log('publish site')
            const site = req.body.site;
            let draftSiteContent = await SiteContentController.saveChangesInSiteContent(site, req.body.pages)
            const publishSite = await SiteContentController.duplicateSiteContent(draftSiteContent, true, null)
            const globalSite = await Site.findById(draftSiteContent.siteId)
            if (globalSite.publish)
                await SiteContentController.deleteSiteContent(globalSite.publish)
            console.log('after delete')
            globalSite.publish = publishSite._id
            await globalSite.save()
            publishSite.siteId = globalSite._id
            await publishSite.save()

            // console.log("result", result)
            res.status(200).json({
                'message': 'site saved',
                'data': publishSite,
                'publishSiteId': globalSite.publish,
                'link': 'https://' + publishSite.url + '.bldr.codes'
            })
        } catch (error) {
            console.log('errrrrrrrrrrrrrrror')
            console.log(error);
            res.status(500).json({
                message: 'site error',
                error
            })
        }

    }
}