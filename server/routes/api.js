const express = require('express');
const router = express.Router();
const path = require('path')
const request = require('request')

// const fileupload = require('express-fileupload');
// app.use(fileupload({ createParentPath: true }))

const { getPage, newPage, editPage, deletePage, editPageIndex, getPageByUrl, duplicatePage } = require('../controller/page')
const { getItem, newItem, uploadImage } = require('../controller/item')
// const {getSite, newSite ,getSiteByUrl,editSite,getUidByUserName,getSites,deleteSite} = require('../controller/site')
const { getSection, newSection, editSection, getSections, deleteSection, getSectionsByCategoryId } = require('../controller/section')
const { newSectionCategory, getCategories, deleteCategory, editSectionCategory } = require('../controller/sectionCategory')
const { getSites, getUidByUserName, deleteSite, newSite, publishSite, duplicateSite } = require('../controller/site')
const { getSite, saveChanges, getLastSite,saveScreenShotChange } = require('../controller/siteContent')
const { usernameCheck, checkPremission, getToken } = require('../controller/register')
const { getUserDetails, editLastSite } = require('../controller/user')
const { getStatistics } = require('../controller/statistics')
const { newForm } = require('../controller/form')
const { checkPermission } = require('../controller/auth')
const { newAsset, getAssets, setAsset,deleteAllAssetsToUser,getAllAssetByType } = require('../controller/asset')
const logCrud = async (req, res, next) => {
    const options = {
        method: "POST",
        url: `https://activity-log.leader.codes/createNewLog`,
        headers: {
            "User-Agent": "chrome",
            // "Host": "12.34.56"
        },
        json: {
            "logDate": new Date(),
            "userName": req.params.userName,
            "appName": "bldr",
            "action": "end the task",
            "details": "send mail",
            "actionBody": req.body
        }
    };
    request(options, async (error, response, body) => {
        if (error) {
            return res.status(502).json({ error })
        }
        return next();
    });
}
function print(req, res, next) {
    console.log('before routing in api router');
    console.log(req.originalUrl);
    return next();
}


router.post('/getAccessToken', getToken);
router.post('/checkPremission', checkPremission);
router.post('/usernameCheck', usernameCheck);

router.get('/getUser/:userName', getUidByUserName)
router.post('/:userName/getPage', checkPermission, getPage)
router.post('/:userName/newPage', checkPermission, newPage)
router.post('/:userName/editPage', checkPermission, editPage)
router.post('/:userName/deletePage', checkPermission, deletePage)
router.post('/:userName/duplicatePage', checkPermission, duplicatePage)
router.post('/:userName/editPageIndex', checkPermission, editPageIndex)
router.post('/:userName/getPageByUrl', checkPermission, getPageByUrl)

router.post('/:userName/getItem', checkPermission, getItem)
router.post('/:userName/newItem', checkPermission, newItem)

router.post('/:userName/getSite', checkPermission, getSite)
router.post('/:userName/newSite', checkPermission, newSite)
router.post('/:userName/getSites', print, checkPermission, getSites)
// router.post('/:userName/getSiteByUrl',getSiteByUrl)
// router.post('/:userName/editSite',editSite)

router.post('/:userName/getSection', checkPermission, getSection)
router.post('/:userName/newSection', checkPermission, newSection)
router.post('/:userName/editSection', checkPermission, editSection)
router.post('/:userName/getSections', checkPermission, getSections)
router.post('/:userName/deleteSection', checkPermission, deleteSection)
router.post('/:userName/getSectionsByCategoryId', checkPermission, getSectionsByCategoryId)

router.post('/:userName/uploadImage', checkPermission, uploadImage)
// router.post('/:userName/deleteSite',deleteSite)

router.post('/:userName/newCategory', checkPermission, newSectionCategory)
router.post('/:userName/getCategories', checkPermission, getCategories)
router.post('/:userName/deleteCategory', checkPermission, deleteCategory)
router.post('/:userName/editCategory', checkPermission, editSectionCategory)

router.post('/:userName/getSiteContent', checkPermission, getSite)
router.post('/:userName/deleteSite', checkPermission, deleteSite)
router.post('/:userName/saveSite', checkPermission, saveChanges)
router.post('/:userName/duplicateSite', checkPermission, duplicateSite)
router.post('/:userName/saveScreenShotChange', checkPermission, saveScreenShotChange)


router.post('/:userName/getUserDetails', checkPermission, getUserDetails)
router.post('/:userName/getLastSite', checkPermission, getLastSite)
router.post('/:userName/editLastSite', checkPermission, editLastSite)
router.post('/:userName/publishSite', checkPermission, publishSite)

router.get('/:userName/:siteId/getStatistics', checkPermission, getStatistics)

router.post('/:userName/newForm', checkPermission, newForm)

router.post('/:userName/newAsset', checkPermission, newAsset)
router.post('/:userName/getAssets', checkPermission, getAssets)
router.post('/:userName/setAsset', checkPermission, setAsset)
router.post('/:userName/deleteAllAssetsToUser', checkPermission, deleteAllAssetsToUser)
router.post('/:userName/getAllAssetByType', checkPermission, getAllAssetByType)

module.exports = router;
