const User = require('../models/User')
const Asset = require('../models/Asset')
const Site = require('../models/Site')
const SiteContent = require('../models/SiteContent')
const Section = require('../models/Section')
const path = require('path')
const jwt = require('jsonwebtoken')
const express = require("express");
const siteController = require('../controller/site')
const siteContentController=require('../controller/siteContent')
const pageController=require('../controller/page')
const request = require('request')
const Page = require('../models/Page')
const sectionController=require('../controller/section')
const { newPage } = require('../controller/page')

module.exports = {
    newAsset: async (req, res) => {
        console.log('in new asset')
        try {
            console.log('screenShot', req.body)
            let asset
            switch(req.body.assetType)
            {
                case 'site':
                        await siteContentController.saveChangesInSiteContent(req.body.object)
                        let newSite=await siteContentController.setSiteContentAsset(req.body.object)
                        asset = new Asset({assetType:req.body.assetType,siteId:newSite._id,screenShot:req.body.screenShot})
                        let user = await User.findOne({ username: req.params.userName })            
                        user = await User.findByIdAndUpdate(user._id, { $push: { assets: [asset._id] } }, { new: true })    
                    break
                case 'page':
                    await pageController.saveChangesInPages(req.body.object)
                    // let newPage=await new Page(req.body.object)
                    // delete newPage._id
                    // console.log('object',req.body.object);
                    let pageAsset=req.body.object
                    let newPage = new Page({
                        name:pageAsset.name,
                        url:pageAsset.url,
                        sections:[],
                        index:pageAsset.index,
                        title:pageAsset.title,
                        enable:pageAsset.enable,
                        pageLayout:pageAsset.pageLayout,
                        description:pageAsset.description
                    })
                    newPage=await newPage.save()
                    for (const sec of pageAsset.sections) {
                        let newSection = await sectionController.setSectionAsset(sec, newPage._id)
                    }
                    newPage=await Page.findOne({_id:newPage._id})
                    console.log('newPage',newPage);
                    asset = new Asset({assetType:req.body.assetType,pageId:newPage._id,screenShot:req.body.screenShot})
                    break
            }
            const userName = req.params.userName
            const user = await User.findOne({ username: userName })
            console.log('user', user)
            asset.userId = user._id
            await User.updateOne({ _id: user._id }, { $push: { assets: asset._id } })
            console.log('asset', asset)
            await asset.save()
            res.status(200).json({ message: 'asset created successfully', asset })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    getAssets: async (req, res) => {
        let user = await User.findOne({ username: req.params.userName }).exec()
        let result = await Asset.find({ assetType: req.body.type }).exec()

        console.log('all assets', result)
        res.status(200).json({
            'assets': result
        })
    },
    setAsset: async (req, res) => {
        try {
            let asset = await Asset.findOne({ _id: req.body.assetId }).exec()
            console.log('asset', asset)
            console.log('asset id', req.body.assetId)
            console.log('site to set', req.body.siteToSet)
            console.log('assetType', asset.assetType)
            let result
            switch (asset.assetType) {
                case 'site': {
                    console.log('in the case site')
                    //to do new site
                    let siteAsset = await SiteContent.findOne({ _id: asset.siteId }).exec()
                    let site=await siteContentController.setSiteContentAsset(siteAsset,req.body.siteId)
                    result=await SiteContent.findOne({_id:req.body.siteId}).populate([
                        { path: 'pages', populate: { path: 'sections' } }])
                    break
                }
                case 'page': {
                    console.log('in the case page')
                    let pageAsset = await Page.findOne({ _id: asset.pageId }).exec()
                    let page =await pageController.setPageAsset( pageAsset,req.body.objectToSet,req.body.siteId)
                    console.log('result', page)
                    result=await Page.findOne({_id:page._id}).populate([{ path: 'sections' }])
                    break
                }
                case 'section': {
                    break
                }
                case 'widget': {
                    break
                }
            }
            res.status(200).json({
                message: 'set asset',
                data: result
            })
        }
        catch (e) {
            console.log('set asset error', e)
            res.status(500).json(e)
        }
    },
    deleteAllAssetsToUser: async (req, res) => {
        try {
            let user = await User.findOne({ username: req.params.userName })
            for (const asset of user.assets) {
                await Asset.findByIdAndDelete(asset)
            }
            user.assets=[]
            console.log('user',user)
            user=await user.save()
            console.log('user',user)
            res.status(200).json({
                'message': 'all assets deleted',
                'result': user
            })
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    },
    getAllAssetByType:async (req,res)=>{
        try{
            let user=await User.findOne({ username: req.params.userName }) 
            let assets=await Asset.find({assetType:req.body.type,userId:user._id}).exec()
            console.log('assets',assets)
            res.status(200).json({
                'message': 'all assets by type',
                'result': assets
            })
        }
        catch(err)
        {
            console.log(err)
            res.status(500).json(err) 
        }
    }

}