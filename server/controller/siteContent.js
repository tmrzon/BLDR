const User = require('../models/User.js');
const Site = require('../models/Site');
const Page = require('../models/Page');
const Section = require('../models/Section');
const Header = require('../models/Header')
const SiteContent = require('../models/SiteContent')
const pageController = require('../controller/page')
const systemObjects = require('../systemObjects')
const sectionController = require('../controller/section')

createTemplateSiteContentPage2 = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            //***************section 1******************/
            const item1 = JSON.stringify({
                "tagName": "grid", "attributes": { "class": "container-fluid" }, "styles": { "simpleStyles": { "color": "black", "background-color": "black", "text-align": "center", "width": "100%" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": null,
                "rows": [{
                    "attributes": {}, "cols": [
                        {
                            "attributes": { "class": "col p-1" },
                            "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content" },
                            "items": [{
                                "tagName": "grid",
                                "styles": { "simpleStyles": { "background-color": "black", "min-height": "150px", "height": "fit-content" } },
                                "index": null,
                                "rows": [{
                                    "attributes": {},
                                    "cols": [{
                                        "attributes": { "class": "col-12 col-lg-7 p-1" },
                                        "styles": {
                                            "align-items": "center", "background-color": "black", "background-position": "center",
                                            "background-repeat": "no-repeat", "background-size": "80%", "height": "fit-content", "min-height": "150px"
                                        },
                                        "items": [{
                                            "tagName": "img",
                                            "attributes": { "src": "https://files.bldr.codes/uploads/shira0/img/1625040443567__mask.png" },
                                            "styles": {
                                                "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%" },
                                                "spanStyles": { "width": "100%", "display": "flex" },
                                                "divStyles": { "justify-content": "center", "margin": "5%" }
                                            },
                                            "index": 0,
                                            "rows": [], "children": [], "_parentCol": null,
                                            "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                        }], "index": 0, "_parentRow": null
                                    }, {
                                        "attributes": { "class": "col p-1" },
                                        "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content", "padding": "10%" },
                                        "items": [
                                            {
                                                "tagName": "h1",
                                                "attributes": {},
                                                "styles": {
                                                    "simpleStyles": { "color": "#FBD15B", "backdround-color": "rgb(0,0,0,0)", "text-align": "left", "width": "100%", "letter-spacing": "0.15px", "opacity": "1", "border": "none", "background-color": "rgba(0,0,0,0)", "line-height": "0.8em", "font": "normal normal normal 18px/21px Roboto" },
                                                    "spanStyles": { "width": "100%", "display": "flex" },
                                                    "divStyles": { "justify-content": "flex-start" }
                                                },
                                                "index": 0,
                                                "rows": [], "children": [], "_parentCol": null,
                                                "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Introducing Today Web UI Kit", "value": "Introducing Today Web UI Kit", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                            }, {
                                                "tagName": "h1",
                                                "attributes": {},
                                                "styles": {
                                                    "simpleStyles": { "color": "#FFFFFF", "backdround-color": "rgb(0,0,0,0)", "text-align": "left", "width": "100%", "opacity": "1", "overflow": "hidden", "border": "none", "font": "normal normal bold 48px/57px Roboto", "letter-spacing": "-0.5px", "white-space": "initial" },
                                                    "spanStyles": { "width": "100%", "display": "flex" },
                                                    "divStyles": { "justify-content": "center" }
                                                },
                                                "index": 1,
                                                "rows": [], "children": [], "_parentCol": null,
                                                "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Design website,", "value": "Design website,", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                            }, {
                                                "tagName": "h1",
                                                "attributes": {},
                                                "styles": {
                                                    "simpleStyles": { "color": "#FFFFFF", "backdround-color": "rgb(0,0,0,0)", "text-align": "left", "width": "100%", "letter-spacing": "-1px", "opacity": "1", "border": "none", "font": "normal normal 300 48px/57px Roboto", "white-space": "initial" },
                                                    "spanStyles": { "width": "100%", "display": "flex" },
                                                    "divStyles": { "justify-content": "center" }
                                                },
                                                "index": 2,
                                                "rows": [], "children": [], "_parentCol": null,
                                                "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Easier than ever.", "value": "Easier than ever.", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                            }, {
                                                "tagName": "h1",
                                                "attributes": {},
                                                "styles": {
                                                    "simpleStyles": { "color": "#FFFFFF", "backdround-color": "rgb(0,0,0,0)", "text-align": "left", "width": "100%", "top": "0px", "opacity": "1", "border": "none", "font": "normal normal normal 17px/22px Roboto", "letter-spacing": "0px" },
                                                    "spanStyles": { "width": "100%", "display": "flex" },
                                                    "divStyles": { "justify-content": "center" }
                                                },
                                                "index": 3,
                                                "rows": [], "children": [], "_parentCol": null,
                                                "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Bunch of components will\r\n help you to prototype, design\r\n & build much faster.", "value": "Bunch of components will\r\n help you to prototype, design\r\n & build much faster.", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                            }], "index": 1, "_parentRow": null
                                    }], "index": 0, "_parentItem": null
                                }],
                                "children": [], "textContent": null, "_parentCol": null
                            }], "index": 0, "_parentRow": null
                        }], "index": 0, "_parentItem": null
                }], "children": [], "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }, "_parentCol": null
            })
            let section1 = new Section({
                name: 'section1page2',
                item: item1,
                index: 0,
            })
            //****************section 2*****************/
            const item2 = JSON.stringify({
                "tagName": "grid",
                "styles": {},
                "index": null,
                "rows": [{
                    "attributes": {},
                    "cols": [{
                        "attributes": {},
                        "styles": {},
                        "items": [{
                            "tagName": "spacer",
                            "attributes": {},
                            "styles": {
                                "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "height": "80px" },
                                "spanStyles": { "width": "100%", "display": "flex" },
                                "divStyles": { "justify-content": "center" }
                            },
                            "index": 0,
                            "rows": [], "children": [], "_parentCol": null,
                            "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                        }, {
                            "tagName": "grid",
                            "attributes": { "class": "container-fluid" },
                            "styles": {
                                "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%" },
                                "spanStyles": { "width": "100%", "display": "flex" },
                                "divStyles": { "justify-content": "center" }
                            },
                            "index": 1,
                            "rows": [{
                                "attributes": {},
                                "cols": [{
                                    "attributes": { "class": "col-12 col-lg-7 p-1" },
                                    "styles": { "background-color": "#ffff", "min-height": "150px", "height": "fit-content" },
                                    "items": [{
                                        "tagName": "spacer",
                                        "attributes": {},
                                        "styles": {
                                            "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "height": "100%" },
                                            "spanStyles": { "width": "100%", "display": "flex" },
                                            "divStyles": { "justify-content": "center" }
                                        },
                                        "index": 0,
                                        "rows": [], "children": [], "_parentCol": null,
                                        "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                    }, {
                                        "tagName": "h1",
                                        "attributes": {},
                                        "styles": {
                                            "simpleStyles": { "color": "#4B4B4B", "backdround-color": "rgb(0,0,0,0)", "text-align": "left", "width": "100%", "letter-spacing": "-0.5px", "opacity": "1", "border": "none", "background-color": "rgba(0,0,0,0)", "line-height": "0.8em", "font": "normal normal normal 18px/21px Roboto" },
                                            "spanStyles": { "width": "100%", "display": "flex" },
                                            "divStyles": { "justify-content": "center" }
                                        },
                                        "index": 1,
                                        "rows": [], "children": [], "_parentCol": null,
                                        "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Introducing Today Web UI Kit", "value": "Introducing Today Web UI Kit", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                    }, {
                                        "tagName": "h1",
                                        "attributes": {},
                                        "styles": {
                                            "simpleStyles": { "color": "#1D1D1B", "backdround-color": "rgb(0,0,0,0)", "text-align": "left", "width": "100%", "opacity": "1", "overflow": "hidden", "border": "none", "font": "normal normal bold 48px/57px Roboto", "letter-spacing": "-1px" },
                                            "spanStyles": { "width": "100%", "display": "flex" },
                                            "divStyles": { "justify-content": "center" }
                                        },
                                        "index": 2,
                                        "rows": [], "children": [], "_parentCol": null,
                                        "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Design website,", "value": "Design website,", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                    }, {
                                        "tagName": "h1",
                                        "attributes": {},
                                        "styles": {
                                            "simpleStyles": { "color": "#1D1D1B", "backdround-color": "rgb(0,0,0,0)", "text-align": "left", "width": "100%", "letter-spacing": "-1px", "opacity": "1", "border": "none", "font": "normal normal 300 48px/57px Roboto" },
                                            "spanStyles": { "width": "100%", "display": "flex" },
                                            "divStyles": { "justify-content": "center" }
                                        },
                                        "index": 3,
                                        "rows": [], "children": [], "_parentCol": null,
                                        "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Easier than ever.", "value": "Easier than ever.", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                    }, {
                                        "tagName": "grid",
                                        "attributes": { "class": "container-fluid" },
                                        "styles": {
                                            "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%" },
                                            "spanStyles": { "width": "100%", "display": "flex" },
                                            "divStyles": { "justify-content": "center" }
                                        },
                                        "index": 4,
                                        "rows": [{
                                            "attributes": {},
                                            "cols": [{
                                                "attributes": { "class": "col p-1" },
                                                "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content", "display": "flex", "flex-direction": "row" },
                                                "items": [{
                                                    "tagName": "button",
                                                    "attributes": { "class": "btn float-right login_btn" },
                                                    "styles": {
                                                        "simpleStyles": { "color": "#FFFFFF", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "background-color": "#FBCD4F", "font": "normal normal medium 16px/19px Roboto", "border-radius": "5px", "border-color": "none", "min-height": "50px", "letter-spacing": "0px", "box-shadow": "20px 20px 60px #02081666", "margin-top": "5%" },
                                                        "spanStyles": { "width": "100%", "display": "flex" },
                                                        "divStyles": { "justify-content": "center", "margin": "3px" }
                                                    },
                                                    "index": 0,
                                                    "rows": [], "children": [], "_parentCol": null,
                                                    "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Download App", "value": "Download App", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                                }, {
                                                    "tagName": "button",
                                                    "attributes": { "class": "btn float-right login_btn" },
                                                    "styles": {
                                                        "simpleStyles": { "color": "#FFFFFF", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "background-color": "#1D1D1B", "font": "normal normal medium 16px/19px Roboto", "border-radius": "5px", "border-color": "none", "min-height": "50px", "box-shadow": "20px 20px 60px #02081666", "letter-spacing": "0px", "margin-top": "5%" },
                                                        "spanStyles": { "width": "100%", "display": "flex" },
                                                        "divStyles": { "justify-content": "center", "margin": "3px" }
                                                    },
                                                    "index": 1,
                                                    "rows": [], "children": [], "_parentCol": null,
                                                    "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Download App", "value": "Download App", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                                }],
                                                "index": 0, "_parentRow": null
                                            }],
                                            "index": 0, "_parentItem": null
                                        }],
                                        "children": [], "_parentCol": null,
                                        "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                    }],
                                    "index": 0, "_parentRow": null
                                }, {
                                    "attributes": { "class": "col p-1" },
                                    "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "300px", "height": "fit-content", "background-image": "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://files.bldr.codes/uploads/shira0/img/1625040575862__m2.png)", "background-repeat": "no-repeat", "background-position": "center", "border-radius": "5px" },
                                    "items": [], "index": 1, "_parentRow": null
                                }],
                                "index": 0, "_parentItem": null
                            }],
                            "children": [], "_parentCol": null,
                            "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                        }, {
                            "tagName": "spacer",
                            "attributes": {},
                            "styles": {
                                "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "height": "80px" },
                                "spanStyles": { "width": "100%", "display": "flex" },
                                "divStyles": { "justify-content": "center" }
                            },
                            "index": 2,
                            "rows": [], "children": [], "_parentCol": null,
                            "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                        }],
                        "index": 0, "_parentRow": null
                    }],
                    "index": 1, "_parentItem": null
                }],
                "children": [], "textContent": null, "_parentCol": null
            })
            let section2 = new Section({
                name: 'section2page2',
                item: item2,
                index: 0,
            })
            //****************section 3*****************/
            const item3 = JSON.stringify({
                "tagName": "grid",
                "styles": {},
                "index": null,
                "rows": [{
                    "attributes": {},
                    "cols": [{
                        "attributes": { "class": "col p-0" },
                        "styles": { "background-image": "url(https://files.bldr.codes/uploads/shira0/img/1625040685762__Bg.png)", "background-size": "cover" },
                        "items": [{
                            "tagName": "grid",
                            "attributes": { "class": "container-fluid" },
                            "styles": {
                                "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%" },
                                "spanStyles": { "width": "100%", "display": "flex" },
                                "divStyles": { "justify-content": "center" }
                            },
                            "index": 0,
                            "rows": [{
                                "attributes": {},
                                "cols": [{
                                    "attributes": { "class": "col p-1" },
                                    "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content" },
                                    "items": [{
                                        "tagName": "grid",
                                        "attributes": { "class": "container-fluid" },
                                        "styles": {
                                            "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%" },
                                            "spanStyles": { "width": "100%", "display": "flex" },
                                            "divStyles": { "justify-content": "center" }
                                        },
                                        "index": 0,
                                        "rows": [{
                                            "attributes": {},
                                            "cols": [{
                                                "attributes": { "class": "col-12 col-lg-6 p-1" },
                                                "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content" },
                                                "items": [{
                                                    "tagName": "h5",
                                                    "attributes": {},
                                                    "styles": {
                                                        "simpleStyles": { "color": "black", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "opacity": "1", "font-size": "30px", "vertical-align": "middle", "margin-top": "25px", " margin-bottom": "0px", "padding-top": "0px", "line-height": "1.3", "font": "normal normal bold 46px/55px Roboto", "border": "none" },
                                                        "spanStyles": { "width": "100%", "display": "flex" },
                                                        "divStyles": { "justify-content": "center" }
                                                    },
                                                    "index": 0,
                                                    "rows": [], "children": [], "_parentCol": null,
                                                    "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Design website, \r\n Easier than ever.", "value": "Design website, \r\n Easier than ever.", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                                }],
                                                "index": 0, "_parentRow": null
                                            }, {
                                                "attributes": { "class": "col-12 col-lg-6 p-1" },
                                                "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content" },
                                                "items": [{
                                                    "tagName": "button",
                                                    "attributes": { "class": "btn" },
                                                    "styles": {
                                                        "simpleStyles": { "color": "#fcfcff", "backdround-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "background": "black", "border": "none", "border-radius": "3px", "padding": "5%", "font": "normal normal medium 16px/19px Roboto" },
                                                        "spanStyles": { "width": "35%", "display": "flex" },
                                                        "divStyles": { "justify-content": "center", "margin": "8%" }
                                                    },
                                                    "index": 0,
                                                    "rows": [], "children": [], "_parentCol": null,
                                                    "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Design your website >", "value": "Design your website >", "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                                }],
                                                "index": 1, "_parentRow": null
                                            }],
                                            "index": 0, "_parentItem": null
                                        }],
                                        "children": [], "_parentCol": null,
                                        "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                                    }],
                                    "index": 0, "_parentRow": null
                                }],
                                "index": 0, "_parentItem": null
                            }],
                            "children": [], "_parentCol": null,
                            "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": null, "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
                        }],
                        "index": 0, "_parentRow": null
                    }],
                    "index": 2, "_parentItem": null
                }],
                "children": [], "textContent": null, "_parentCol": null
            })
            let section3 = new Section({
                name: 'section3page2',
                item: item3,
                index: 0,
            })
            //*****************create header to page****************/
            const header = JSON.stringify({
                "tagName": "header",
                "attributes": {},
                "styles": { "divStylesHeader": { "color": "white", "background-color": "black" } },
                "index": 0,
                "rows": [], "children": [], "_parentCol": null,
                "textContent": { "validator": null, "asyncValidator": null, "pristine": true, "touched": false, "_onDisabledChange": [], "_onChange": [], "_pendingValue": "Design website, \r\n Easier than ever.", "value": null, "status": "VALID", "errors": null, "valueChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false }, "statusChanges": { "_isScalar": false, "observers": [], "closed": false, "isStopped": false, "hasError": false, "thrownError": null, "__isAsync": false } }
            })
            //****************create site with page*****************/
            let page = new Page({
                name: 'About Us',
                url: 'about',
                index: 0,
                enable: true,
                pageLayout: 'container-fluid',
                sections: []
            })
            let itemP2 = JSON.stringify({
                "tagName": "grid", "attributes": { "class": "container-fluid" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "background": "linear-gradient(black 55%, white 45%)" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": null, "rows": [{
                    "attributes": {}, "cols": [{
                        "attributes": { "class": "col p-1" }, "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content" }, "items": [{
                            "tagName": "grid", "attributes": { "class": "container-fluid" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [{ "attributes": {}, "cols": [{ "attributes": { "class": "col p-1" }, "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content" }, "items": [{ "tagName": "h2", "attributes": {}, "styles": { "simpleStyles": { "color": "#FBD15B", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "opacity": "1", "font-size": "48px", "vertical-align": "middle", "margin": "0px", "line-height": "0.8", "font-weight": "3", "height": "50px", "font": "Roboto light", "letter-spacing": "0.57px", "border": "none" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": "Discover our Store" }, "_parentCol": null }, { "tagName": "h2", "attributes": {}, "styles": { "simpleStyles": { "color": "#ffffff", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "opacity": "1", "font-size": "15px", "vertical-align": "middle", "margin": "0px", "line-height": "1.3", "font-weight": "3", "font": "Roboto light", "letter-spacing": "0.57px", "border": "none", "min-height": "70px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Our team of designers, developers & strategists,\r\n make custom digital products for startups and brands." }, "_parentCol": null }], "index": 0, "_parentRow": null }], "index": 0, "_parentItem": null }, { "attributes": {}, "cols": [{ "attributes": { "class": "col p-1" }, "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "2vh", "height": "fit-content", "display": "flex", "flex-direction": "row", "justify-content": "center" }, "items": [{ "tagName": "a", "attributes": {}, "styles": { "simpleStyles": { "color": "white", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "min-width": "6vw", "opacity": "1", "font-size": "10px", "vertical-align": "middle", "background": "#FBCD4F", "border-radius": "10px", "margin": "0px", "display": "flex", "justify-content": "center", "line-height": "2", "align-items": "center", "font-weight": "bold", "font": "Heavy 57px/56px SF Pro Display", "letter-spacing": "0.57px", "border": "none" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": "Everything" }, "_parentCol": null }, { "tagName": "a", "attributes": {}, "styles": { "simpleStyles": { "color": "white", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "min-width": "6vw", "opacity": "1", "font-size": "10px", "vertical-align": "middle", "align-items": "center", "margin": "0px", "line-height": "2", "display": "flex", "justify-content": "center", "padding": "0%", "font-weight": "bold", "font": "Heavy 57px/56px SF Pro Display", "letter-spacing": "0.57px", "border": "none" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Tabels" }, "_parentCol": null }, { "tagName": "a", "attributes": {}, "styles": { "simpleStyles": { "color": "white", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "min-width": "6vw", "opacity": "1", "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "10px", "vertical-align": "middle", "margin": "0px", "padding": "0%", "line-height": "2", "font-weight": "bold", "font": "Heavy 57px/56px SF Pro Display", "letter-spacing": "0.57px", "border": "none" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Laptops" }, "_parentCol": null }, { "tagName": "a", "attributes": {}, "styles": { "simpleStyles": { "color": "white", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "min-width": "6vw", "opacity": "1", "font-size": "10px", "vertical-align": "middle", "align-items": "center", "margin": "0px", "padding": "0%", "display": "flex", "justify-content": "center", "line-height": "2", "font-weight": "bold", "font": "Heavy 57px/56px SF Pro Display", "letter-spacing": "0.57px", "border": "none" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 3, "rows": [], "children": [], "textContent": { "value": "Iphones" }, "_parentCol": null }, { "tagName": "a", "attributes": {}, "styles": { "simpleStyles": { "color": "white", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "min-width": "6vw", "opacity": "1", "font-size": "10px", "vertical-align": "middle", "margin": "0px", "align-items": "center", "display": "flex", "justify-content": "center", "padding": "0%", "line-height": "2", "font-weight": "bold", "font": "Heavy 57px/56px SF Pro Display", "letter-spacing": "0.57px", "border": "none" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 4, "rows": [], "children": [], "textContent": { "value": "Screens" }, "_parentCol": null }, { "tagName": "a", "attributes": {}, "styles": { "simpleStyles": { "color": "white", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "min-width": "6vw", "opacity": "1", "font-size": "10px", "align-items": "center", "display": "flex", "justify-content": "center", "vertical-align": "middle", "margin": "0px", "padding": "0%", "line-height": "2", "font-weight": "bold", "font": "Heavy 57px/56px SF Pro Display", "letter-spacing": "0.57px", "border": "none" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 5, "rows": [], "children": [], "textContent": { "value": "Boards" }, "_parentCol": null }], "index": 0, "_parentRow": null }], "index": 1, "_parentItem": null }, {
                                "attributes": {}, "cols": [{
                                    "attributes": { "class": "col p-1" }, "styles": { "background-color": "rgba(0, 0, 0, 0)", "min-height": "150px", "height": "fit-content" }, "items": [{
                                        "tagName": "grid", "attributes": { "class": "container-fluid" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "padding-left": "4%", "padding-right": "4%", "padding-bottom": "4%" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [{
                                            "attributes": {}, "cols": [{
                                                "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr24.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, {
                                                    "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Faux Fur Jacket" }, "_parentCol": null
                                                }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Graphic Design" }, "_parentCol": null }], "index": 0, "_parentRow": null
                                            }, { "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr23.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Floral Faux" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Web Design" }, "_parentCol": null }], "index": 1, "_parentRow": null }, { "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr22.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Bejeweled Jacket" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "App Design" }, "_parentCol": null }], "index": 2, "_parentRow": null }, { "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr2.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Leather Effect" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Web Design" }, "_parentCol": null }], "index": 3, "_parentRow": null }], "index": 0, "_parentItem": null
                                        }], "children": [], "textContent": { "value": null }, "_parentCol": null
                                    }, {
                                        "tagName": "grid", "attributes": { "class": "container-fluid" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "padding-left": "4%", "padding-right": "4%", "padding-bottom": "4%" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [{
                                            "attributes": {}, "cols": [{ "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr24.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Faux Fur Jacket" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Graphic Design" }, "_parentCol": null }], "index": 0, "_parentRow": null }, {
                                                "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr23.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, {
                                                    "tagName": "h5", "attributes": {}, "styles": {
                                                        "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles":
                                                            { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {}
                                                    }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Floral Faux" }, "_parentCol": null
                                                }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Web Design" }, "_parentCol": null }], "index": 1, "_parentRow": null
                                            }, { "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr22.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Bejeweled Jacket" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "App Design" }, "_parentCol": null }], "index": 2, "_parentRow": null }, { "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr2.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Leather Effect" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Web Design" }, "_parentCol": null }], "index": 3, "_parentRow": null }], "index": 0, "_parentItem": null
                                        }], "children": [], "textContent": { "value": null }, "_parentCol": null
                                    }, {
                                        "tagName": "grid", "attributes": { "class": "container-fluid" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "padding-left": "4%", "padding-right": "4%", "padding-bottom": "4%" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [{
                                            "attributes": {}, "cols": [{ "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr24.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Faux Fur Jacket" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Graphic Design" }, "_parentCol": null }], "index": 0, "_parentRow": null }, { "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr23.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Floral Faux" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Web Design" }, "_parentCol": null }], "index": 1, "_parentRow": null }, {
                                                "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{
                                                    "tagName": "img", "attributes": { "src": "assets/img/bldr22.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": {
                                                        "value":
                                                            null
                                                    }, "_parentCol": null
                                                }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Bejeweled Jacket" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "App Design" }, "_parentCol": null }], "index": 2, "_parentRow": null
                                            }, { "attributes": { "class": "col p-1" }, "styles": { "background-color": "white", "min-height": "150px", "height": "fit-content", "padding-top": "2vh", "border-radius": "6px" }, "items": [{ "tagName": "img", "attributes": { "src": "assets/img/bldr2.png" }, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "box-shadow": "10px 10px 5px #aaaaaa", "min-height": "80%", "min-width": "100%", "border-radius": "6px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 0, "rows": [], "children": [], "textContent": { "value": null }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "500", "font-size": "20px", "margin-top": "2vh" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 1, "rows": [], "children": [], "textContent": { "value": "Leather Effect" }, "_parentCol": null }, { "tagName": "h5", "attributes": {}, "styles": { "simpleStyles": { "color": "black", "background-color": "rgb(0,0,0,0)", "text-align": "center", "width": "100%", "border": "none", "font-weight": "200", "font-size": "15px", "margin-top": "0px" }, "spanStyles": { "width": "100%", "display": "flex" }, "divStyles": { "justify-content": "center" }, "divStylesHeader": { "color": "black", "background-color": "#f0f0f0" }, "imgStylesHeader": {} }, "index": 2, "rows": [], "children": [], "textContent": { "value": "Web Design" }, "_parentCol": null }], "index": 3, "_parentRow": null }], "index": 0, "_parentItem": null
                                        }], "children": [], "textContent": { "value": null }, "_parentCol": null
                                    }], "index": 0, "_parentRow": null
                                }], "index": 2, "_parentItem": null
                            }], "children": [], "textContent": { "value": null }, "_parentCol": null
                        }], "index": 0, "_parentRow": null
                    }], "index": 0, "_parentItem": null
                }], "children": [], "textContent": { "value": null }, "_parentCol": null
            })
            let sectionP2 = new Section({
                name: 'products',
                item: itemP2,
                index: 0,
            })
            // let page2 = new Page({
            //     name: 'Our Products',
            //     url: 'products',
            //     index: 1,
            //     enable: true,
            //     pageLayout: 'container-fluid',
            //     sections: []
            // })
            let footerSection = new Section({
                name: 'footer',
                item: JSON.stringify(systemObjects.defaultFooterItem),
                siteId: SiteContent._id
            })
            footerSection = await footerSection.save()
            let siteContent = new SiteContent({ name: 'bldrTemplate', pages: [], logo: './assets/icons/bldr 2.png', footer: footerSection._id, screenshot: 'https://files.bldr.codes/uploads/pdZwA4gNDQZUu4jvNHclPNXoXrQ2/img/1617776911938__screenshotBldr Ui Kit 6.jpg' })
            siteContent = await siteContent.save()
            page.siteId = siteContent._id
            // page2.siteId = siteContent._id
            // console.log('page 22', page2)
            // page2 = await page2.save()

            page = await page.save()
            siteContent = await SiteContent.findByIdAndUpdate(siteContent._id, { $push: { pages: [page._id] } }, { new: true })
            siteContent = await SiteContent.findByIdAndUpdate(siteContent._id, { header: header }, { new: true })
            section1.pageId = page._id
            section2.pageId = page._id
            section3.pageId = page._id
            // sectionP2.pageId = page2._id
            // console.log('page 2', page2)
            section1 = await section1.save()
            section2 = await section2.save()
            section3 = await section3.save()
            sectionP2 = await sectionP2.save()
            await Page.findByIdAndUpdate(page._id, { $push: { sections: section1._id } })
            await Page.findByIdAndUpdate(page._id, { $push: { sections: section2._id } })
            await Page.findByIdAndUpdate(page._id, { $push: { sections: section3._id } })

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
                sections: [],
                siteId: siteContent._id
            })
            page404 = await page404.save()
            section404.pageId = page404._id
            section404 = await section404.save()
            await Page.findByIdAndUpdate(page404._id, { $push: { sections: section404._id } })
            siteContent = await SiteContent.findByIdAndUpdate(siteContent._id, { $set: { notFoundPage: page404._id, } }, { new: true })
            // await Page.findByIdAndUpdate(page2._id, { $push: { sections: sectionP2._id } })
            console.log('in the function', siteContent)
            resolve(siteContent)
        } catch (error) {
            reject(error)
        }
    })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
saveChangesInSiteContent = (site) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('site.url', site)
            site.url = site.url.toLowerCase()
            if (site.url.split('@').length > 1)
                reject('site url error')
            // const pages = pages;
            // const sections = req.body.sections;
            let updatedPages = []

            //check if url is already exist
            let s = SiteContent.find({ url: site.url })
            if (s.length > 2) {
                reject('url already exists.')
            }
            // console.log('draftt', site)
            let initSiteToSave = Object.assign({}, site)
            delete initSiteToSave.pages
            delete initSiteToSave.notFoundPage
            delete initSiteToSave.footer
            console.log('initSiteToSave', initSiteToSave);
            let draftSiteContent = await SiteContent.findByIdAndUpdate(site._id, initSiteToSave, { new: true })
            // console.log('draftSiteContent', draftSiteContent)
            for (const page of site.pages) {
                console.log('index of page', page.index);
                await pageController.saveChangesInPages(page)
            }
            let pagesArr = []
            for (const p of site.pages) {
                pagesArr[p.index] = p._id
            }
            site = await SiteContent.findByIdAndUpdate(site._id, { $set: { pages: pagesArr } }, { new: true })
            console.log(site.notFoundPage)
            let notFound = await Page.findOne({ _id: site.notFoundPage })
            await pageController.saveChangesInPages(notFound)
            // console.log('page before',draftSiteContent);
            if (site.footer)
                await Section.findByIdAndUpdate(site.footer._id, site.footer, { new: true })
            // console.log('draftSiteContent', draftSiteContent)

            resolve(draftSiteContent)
        } catch (error) {
            reject(error)
        }
    })
}

setSiteContentAsset = (siteAsset, siteId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('siteAsset', siteAsset);
            let siteToSet
            if (!siteId) {
                let site = new SiteContent()
                siteToSet = await site.save()
            }
            else {
                siteToSet = await SiteContent.findOne({ _id: siteId }).exec()
            }
            console.log('siteToSettt', siteToSet)
            for (const page of siteAsset.pages) {
                let p = await Page.findOne({ _id: page }).exec()
                await pageController.setPageAsset(p, null, siteToSet._id)
            }
            if (siteAsset.notFoundPage) {
                let p = await Page.findOne({ _id: siteAsset.notFoundPage }).exec()
                if (p)
                    await pageController.setPageAsset(p, null, siteToSet._id)
            }
            if (siteAsset.header)
                siteToSet.header = siteAsset.header
            if (siteAsset.footer) {
                let section = await Section.findOne({ _id: siteAsset.footer }).exec()
                let newSection = await sectionController.setSectionAsset(section, null)
                siteToSet.footer = newSection._id
            }
            siteToSet.screenshot = siteAsset.screenshot
            siteToSet.logo = siteAsset.logo
            siteToSet = await siteToSet.save()

            resolve(siteToSet)
        }
        catch (error) {
            reject(error)
        }

    })
}

deleteSiteContent = async (siteContentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('inside delete')
            const siteContent = await SiteContent.findByIdAndDelete(siteContentId)
            console.log('siteContent', siteContent)
            if (siteContent.pages)
                for (const p of siteContent.pages) {
                    page = await Page.findByIdAndDelete(p.toString())
                    for (const s of page.sections) {
                        const s1 = await Section.findByIdAndDelete(s.toString())
                    }
                }
            if (siteContent.notFoundPage)
                page = await Page.findByIdAndDelete(siteContent.notFoundPage.toString())
            for (const s of page.sections) {
                const s1 = await Section.findByIdAndDelete(s.toString())
            }
            console.log('ss1', siteContent)
            resolve(siteContent)
        }
        catch (e) {
            console.log('reject')
            reject(e)
        }
    })
}
duplicateSiteContent = async (sourceSiteContent, ifPublish, currentUser) => {
    return new Promise(async (resolve, reject) => {
        console.log('source', sourceSiteContent)
        try {
            const sitesAmount = currentUser.sites.length
            let newSiteContent
            if (ifPublish) {
                newSiteContent = new SiteContent({
                    header: sourceSiteContent.header,
                    name: sourceSiteContent.name,
                    url: sourceSiteContent.url.toLowerCase(),
                    logo: sourceSiteContent.logo,
                    generalSetting: sourceSiteContent.generalSetting,
                    screenshot: sourceSiteContent.screenshot,
                    globalWidgetsName: sourceSiteContent.globalWidgetsName
                })
            }
            else {
                newSiteContent = new SiteContent({
                    header: sourceSiteContent.header,
                    name: sourceSiteContent.name + 'copy' + sitesAmount,
                    url: sourceSiteContent.url.toLowerCase() + 'copy' + sitesAmount,
                    logo: sourceSiteContent.logo,
                    generalSetting: sourceSiteContent.generalSetting,
                    screenshot: sourceSiteContent.screenshot,
                    globalWidgetsName: sourceSiteContent.globalWidgetsName
                })
            }
            newSiteContent = await newSiteContent.save()
            console.log('newSiteContent', newSiteContent)
            let sourcePage, sourceSec
            for (const p of sourceSiteContent.pages) {
                sourcePage = await Page.findById(p)
                const pageSections = sourcePage.sections

                let sourcePage1 = new Page({
                    name: sourcePage.name,
                    url: sourcePage.url,
                    index: sourcePage.index,
                    enable: sourcePage.enable,
                    pageLayout: sourcePage.pageLayout,
                    siteId: sourcePage.siteId,
                    title: sourcePage.title,
                    sections: []
                })
                sourcePage1 = await sourcePage1.save()

                // sourcePage.set({ sections: [] })
                sourcePage1.siteId = newSiteContent._id
                for (const sec of pageSections) {
                    sourceSec = await Section.findById(sec)
                    sourceSec = new Section({
                        name: sourceSec.name,
                        item: sourceSec.item,
                        index: sourceSec.index,
                        pageId: sourcePage._id,
                        categoryId: sourceSec.categoryId
                    })
                    sourceSec = await sourceSec.save()
                    sourcePage1.sections.push(sourceSec._id)
                }
                // console.log('sp', sourcePage)
                sourcePage1 = await sourcePage1.save()
                console.log('sorcePage1', sourcePage1)
                // console.log('sps', sourcePage)
                newSiteContent.pages.push(sourcePage1._id)
            }
            let pageSections = []
            if (sourceSiteContent.notFoundPage) {
                sourcePage = await Page.findById(sourceSiteContent.notFoundPage)
                pageSections = sourcePage.sections
            }
            let sourcePage1 = new Page({
                name: sourcePage.name,
                url: sourcePage.url,
                enable: sourcePage.enable,
                pageLayout: sourcePage.pageLayout,
                siteId: sourcePage.siteId,
                title: sourcePage.title,
                sections: []
            })
            sourcePage1 = await sourcePage1.save()

            // sourcePage.set({ sections: [] })
            sourcePage1.siteId = newSiteContent._id
            for (const sec of pageSections) {
                sourceSec = await Section.findById(sec)
                sourceSec = new Section({
                    name: sourceSec.name,
                    item: sourceSec.item,
                    index: sourceSec.index,
                    pageId: sourcePage._id,
                    categoryId: sourceSec.categoryId
                })
                sourceSec = await sourceSec.save()
                sourcePage1.sections.push(sourceSec._id)
            }
            // console.log('sp', sourcePage)
            sourcePage1 = await sourcePage1.save()
            console.log('sorcePage1', sourcePage1)
            // console.log('sps', sourcePage)
            newSiteContent.notFoundPage = sourcePage1._id

            newSiteContent = await newSiteContent.save()
            resolve(newSiteContent)
        } catch (error) {
            reject(error)
        }
    })
}
createBlankSiteContent = async () => {
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

            let siteContent = new SiteContent({ name: 'blank', pages: [], logo: './assets/icons/bldr 2.png' })
            siteContent = await siteContent.save()
            let footerSection = new Section({
                name: 'footer',
                item: JSON.stringify(systemObjects.defaultFooterItem),
                siteId: SiteContent._id
            })
            footerSection = await footerSection.save()

            page.siteId = siteContent._id
            page = await page.save()
            page404.siteId = siteContent._id
            page404 = await page404.save()
            siteContent = await SiteContent.findByIdAndUpdate(siteContent._id, { $push: { pages: [page._id] }, $set: { notFoundPage: page404._id, footer: footerSection._id } }, { new: true })
            console.log('site with 404')
            section.pageId = page._id
            section404.pageId = page404._id
            section = await section.save()
            section404 = await section404.save()
            await Page.findByIdAndUpdate(page._id, { $push: { sections: section._id } })
            await Page.findByIdAndUpdate(page404._id, { $set: { notFoundPage: page404._id } })
            resolve(siteContent)
        } catch (error) {
            reject(error)
        }
    })
}

createPublishEmptySiteContent = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const item = JSON.stringify(systemObjects.initPublishItem)
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
                pageLayout: 'canvas',
                sections: []
            })
            let siteContent = new SiteContent({ name: 'blank', pages: [], logo: './assets/icons/bldr 2.png' })
            siteContent = await siteContent.save()
            page.siteId = siteContent._id
            page = await page.save()
            siteContent = await SiteContent.findByIdAndUpdate(siteContent._id, { $push: { pages: page._id } }, { new: true })
            section.pageId = page._id
            section = await section.save()
            await Page.findByIdAndUpdate(page._id, { $push: { sections: section._id } })
            resolve(siteContent)
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    setSiteContentAsset,
    saveChangesInSiteContent,
    deleteSiteContent,
    duplicateSiteContent,
    createBlankSiteContent,
    createTemplateSiteContentPage2,
    createPublishEmptySiteContent,
    getSite: async (req, res) => {
        try {
            console.log('entered get site')
            const siteId = req.body.siteId;
            const currentUser = await User.findOne({ username: req.params.userName });
            let s = await SiteContent.findOne({ _id: siteId }).populate([
                { path: 'pages', populate: { path: 'sections' } },
                { path: 'notFoundPage', populate: { path: 'sections' } },
                { path: 'footer' }])
            await User.findByIdAndUpdate(currentUser._id, { lastSite: s._id })
            return res.status(200).json({
                'site': s
            })
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    getLastSite: async (req, res) => {
        console.log('get last site', req.params.userName)
        const userId = req.params.uid
        try {
            const user = await User.findOne({ username: req.params.userName }).exec()
            console.log("user", user)
            let mySite = await SiteContent.findOne({ _id: user.lastSite }).populate([
                { path: 'pages', populate: { path: 'sections' } },
                { path: 'notFoundPage', populate: { path: 'sections' } },
                { path: 'footer' }])
            return res.status(200).json({
                'site': mySite
            })
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    saveChanges: async (req, res) => {
        const site = req.body.site;
        saveChangesInSiteContent(site).then(s => {
            return res.status(200).json({
                'message': 'site saved',
                'data': s
            })
        }).catch(error => {
            console.log('--------')
            console.log(error);
            res.status(500).json({
                message: 'site error',
                error
            })
        })
    },
    saveScreenShotChange: async (req, res) => {
        try {
            let siteContent = await SiteContent.findOne({ _id: req.body.site })
            siteContent.screenshot = req.body.screenshot
            siteContent = await siteContent.save()
            res.status(200).json({
                'screenshot': siteContent.screenshot
            })
        }
        catch (error) {
            console.log('*****')
            console.log(error);
            res.status(500).json({
                message: 'screenshot error',
                error
            })
        }
    }
}