const express = require('express');
const router = express.Router();
const {getSiteByUrl} =require('../controller/site');
const statisticsController = require('../controller/statistics');


router.post('/getSiteByUrl',getSiteByUrl)
router.get('/addPageToViewer/:viewerId/:pageId', statisticsController.addPageToViewer);
router.post('/updateViewerLeavingDate/:viewerId', statisticsController.updateViewerLeavingDate);
// router.post('/updateViewerLeavingDate',function(req,res){
//     console.log('i got the request',req.body)
//   });
//router.post('/addViewer', statisticsController.addViewer);

module.exports = router;