const Viewer = require('../models/Viewer');
const Site = require('../models/Site');
const moment = require('moment');

// addViewer = async (req, res) => {
//     console.log('in addViewer');
//     try{
//         let newViewer = new Viewer(req.body);
//         newViewer.IPAddress = requestIp.getClientIp(req);
//         let geo = geoip.lookup(newViewer.IPAddress);
//         console.log('geo: ');
//         console.log(geo.country);
//         console.log(geo.city);
//         newViewer.location = geo.country;
//         newViewer.date = new Date();
//         newViewer.isFirstTime = await isFirstTime(newViewer.IPAddress,newViewer.pageId);
//         await newViewer.save();
//         res.status(200).send();
//     }
//     catch( err ){
//         console.log('error: ' + err);
//         res.status(400).json({error: err});
//     }
// }

generateDate = (date) => {
    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
}

// isFirstTime = async (ip, pageId)=>{
//     console.log('in inFirstTime function');
//     console.log('IPAddress: ' + ip + ' pageId: ' + pageId);
//     return new Promise(async (resolve, reject) => {
//         try{
//             if(pageId == null || pageId == undefined){
//                 console.log('in first if');
//                 reject ('pageId not exist');
//                 return;
//             }
//             let viewer = await Viewer.findOne({IPAddress:ip, pageId: pageId});
//             if(viewer  == null){
//                 console.log('in viewer == null');
//                 resolve (true);
//             }
//             else{
//                 console.log('in else');
//                 console.log(viewer);
//                 resolve (false);
//             }  
//         }
//         catch(error){
//             console.log('in error');
//             reject(error);
//         }
//     })
// }

getStatistics = async (req,res) =>{
    let statistics = {
        'year':{
            'viewers': {'amount': 0, 'increase': 0},
            'units': {'amount': 0, 'increase': 0},
            'pages_average': {'amount': 0, 'increase': 0},
            'staying_time_average': {'amount': 0, 'increase': 0},
            'abandonment_rate': {'amount': 0, 'increase': 0}
        },
        'month':{
            'viewers': {'amount': 0, 'increase': 0},
            'units': {'amount': 0, 'increase': 0},
            'pages_average': {'amount': 0, 'increase': 0},
            'staying_time_average': {'amount': 0, 'increase': 0},
            'abandonment_rate': {'amount': 0, 'increase': 0}
        },
        'week':{
            'viewers': {'amount': 0, 'increase': 0},
            'units': {'amount': 0, 'increase': 0},
            'pages_average': {'amount': 0, 'increase': 0},
            'staying_time_average': {'amount': 0, 'increase': 0},
            'abandonment_rate': {'amount': 0, 'increase': 0}
        },
        'day':{
            'viewers': {'amount': 0, 'increase': 0},
            'units': {'amount': 0, 'increase': 0},
            'pages_average': {'amount': 0, 'increase': 0},
            'staying_time_average': {'amount': 0, 'increase': 0},
            'abandonment_rate': {'amount': 0, 'increase': 0}
        },
        // 'day_views':0,
        // 'week_views':0,
        // 'month_views':0,
        // 'year_views':0,
        // 'day_users':0,
        // 'week_users':0,
        // 'month_users':0,
        // 'year_users':0,
        'locations': [/*{'location': '', 'amount':0}*/],
        'devices':[],
        'browsers':[],
        'operating_systems': [],
        'pages_average':0,
        'staying_time_average':0,
        'abandonment_rate':0,
        'year_views_arr': new Array(12),
        'active_viewers': 0
    
    };
    
    try{
        console.log('in getStatistics');
        let todayUsers = [];
        let lastDayUsers = [];        
        let lastDayViewers = 0;
        let thisWeekUsers = [];
        let lastWeekUsers = [];
        let lastWeekViewers = 0;
        let thisMonthUsers = [];
        let lastMonthUsers = [];
        let lastMonthViewers = 0;
        let thisYearUsers = [];
        let lastYearUsers = [];
        let lastYearViewers = 0;
        // let pagesSum = 0;
        let dayPagesSum = 0;
        let weekPagesSum = 0;
        let monthPagesSum = 0;
        let yearPagesSum = 0;
        let lastDayPagesSum = 0;
        let lastWeekPagesSum = 0;
        let lastMonthPagesSum = 0;
        let lastYearPagesSum = 0;
        let lastDayPagesAvg = 0;
        let lastWeekPagesAvg = 0;
        let lastMonthPagesAvg = 0;
        let lastYearPagesAvg = 0;
        let stayingTimeSum = 0;
        let dayStayingTimeSum = 0;
        let weekStayingTimeSum = 0;
        let monthStayingTimeSum = 0;
        let yearStayingTimeSum = 0;
        let lastDayStayingTimeSum = 0;
        let lastWeekStayingTimeSum = 0;
        let lastMonthStayingTimeSum = 0;
        let lastYearStayingTimeSum = 0;
        let lastDayStayingTimeAvg = 0;
        let lastWeekStayingTimeAvg = 0;
        let lastMonthStayingTimeAvg = 0;
        let lastYearStayingTimeAvg = 0;
        let onePagesViewers = 0;
        let site = await Site.findOne({draft:req.params.siteId});
        //console.log('site: ');
        //console.log(site);
        console.log('site id:' + site.publish);
        let viewers = await Viewer.find({site:site.publish});
        //console.log('viewers: ');
        //console.log(viewers);
        
        statistics.year_views_arr.fill(0);
        //console.log("year views rray = " + statistics.year_views)
        //console.log("first stayingTimeSum = " + stayingTimeSum);
        viewers.forEach(viewer=>{
            //console.log("second stayingTimeSum = " + stayingTimeSum);
            if(isActiveView(viewer)){
                statistics.active_viewers++;
            }
            if(isTodayView(viewer.date)){
                //console.log('statistics.day_views: ' + statistics.day_views);
                statistics.day_views++;
                statistics.day.viewers.amount++;
                //console.log('statistics.day_views: ' + statistics.day_views);
                updateUsersArr(todayUsers, viewer);
                statistics.week_views++;
                statistics.week.viewers.amount++;
                updateUsersArr(thisWeekUsers, viewer);
                statistics.week.viewers.amount++;
                statistics.month_views++;
                //console.log('statistics.month_views: ' + statistics.month_views);
                updateUsersArr(thisMonthUsers, viewer);
                //statistics.month_users = thisMonthUsers.length;
                statistics.year_views++;
                updateUsersArr(thisYearUsers, viewer);
                //statistics.year_users = thisYearUsers.length;
                dayPagesSum += viewer.pages.length;
                dayStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
            }
            else if(isThisWeekView(viewer.date)){
                statistics.week_views++;
                statistics.week.viewers.amount++;
                updateUsersArr(thisWeekUsers, viewer);
                //statistics.month_views++;
                statistics.month.viewers.amount++;
                //console.log('statistics.month_views: ' + statistics.month_views);
                updateUsersArr(thisMonthUsers, viewer);
                //statistics.month_users = thisMonthUsers.length;
                statistics.year_views++;
                statistics.year.viewers.amount++;
                updateUsersArr(thisYearUsers, viewer);
                //statistics.year_users = thisYearUsers.length;
                weekPagesSum += viewer.pages.length;
                weekStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
            }
            else if(isThisMonthView(viewer.date)){
                //console.log('statistics.month_views: ' + statistics.month_views);
                statistics.month_views++;
                statistics.month.viewers.amount++;
                //console.log('statistics.month_views: ' + statistics.month_views);
                updateUsersArr(thisMonthUsers, viewer);
                //statistics.month_users = thisMonthUsers.length;
                statistics.year_views++;
                statistics.year.viewers.amount++;
                updateUsersArr(thisYearUsers, viewer);
                monthPagesSum += viewer.pages.length;
                monthStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
                //statistics.year_users = thisYearUsers.length;
            }
            else if(isThisYearView(viewer.date)){
                statistics.year_views++;
                statistics.year.viewers.amount++;
                updateUsersArr(thisYearUsers, viewer);
                yearPagesSum += viewer.pages.length;
                yearStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
                //statistics.year_users = thisYearUsers.length;
            }
            if(isLastDayView(viewer.date)){
                lastDayViewers++;
                updateUsersArr(lastDayUsers, viewer);
                lastDayPagesSum += viewer.pages.length;
                lastDayStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
            }
            if(isLastWeekView(viewer.date)){
                lastWeekViewers++;
                updateUsersArr(lastWeekUsers, viewer);
                lastWeekPagesSum += viewer.pages.length;
                lastWeekStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
            }
            if(isLastMonthView(viewer.date)){
                lastMonthViewers++;
                updateUsersArr(lastMonthUsers, viewer);
                lastMonthPagesSum += viewer.pages.length;
                lastMonthStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
            }
            if(isLastYearView(viewer.date)){
                lastYearViewers++;
                updateUsersArr(lastYearUsers, viewer);
                lastYearPagesSum += viewer.pages.length;
                lastYearStayingTimeSum += viewer.leavingDate.getTime() - viewer.date.getTime();
            }
            updateLocations(viewer, statistics);
            updateDevices(viewer, statistics);
            updateBrowsers(viewer, statistics);
            updateOS(viewer, statistics);
            updateYearViewsArray(viewer, statistics);
           // pagesSum += viewer.pages.length;
            if(viewer.pages.length == 1){
                onePagesViewers++;
            }
           // let stayingTime = viewer.leavingDate.getTime() - viewer.date.getTime();
            //console.log("stayingTime = ", stayingTime);
            //console.log("stayingTimeSum = ", stayingTimeSum);
       //     stayingTimeSum += stayingTime;
            //console.log("stayingTimeSum = ", stayingTimeSum);
            
        });
        statistics.day_users = todayUsers.length;//to delete
        statistics.day.units.amount = todayUsers.length;
        statistics.week_users = thisWeekUsers.length;
        statistics.week.units.amount = todayUsers.length;
        statistics.month_users = thisMonthUsers.length;
        statistics.month.units.amount = thisMonthUsers.length;
        statistics.year_users = thisYearUsers.length;
        statistics.year.units.amount = thisYearUsers.length;
    
        //statistics.pages_average = (pagesSum / viewers.length).toFixed(2);
        if(dayPagesSum > 0)
            statistics.day.pages_average.amount = (dayPagesSum / statistics.day.viewers.amount).toFixed(2);
        if(weekPagesSum > 0)
            statistics.week.pages_average.amount = (weekPagesSum / statistics.week.viewers.amount).toFixed(2);
        if(monthPagesSum > 0)
            statistics.month.pages_average.amount = (monthPagesSum / statistics.month.viewers.amount).toFixed(2);
        if(yearPagesSum > 0)
            statistics.year.pages_average.amount = (yearPagesSum / statistics.year.viewers.amount).toFixed(2);
        if(lastDayPagesSum > 0)
            lastDayPagesAvg = (lastDayPagesSum / lastDayViewers).toFixed(2);
        if(lastWeekPagesSum > 0)
            lastWeekPagesAvg = (lastWeekPagesSum / lastWeekViewers).toFixed(2);
        if(lastMonthPagesSum > 0)
            lastMonthPagesAvg = (lastMonthPagesSum / lastMonthViewers).toFixed(2);
        if(lastYearPagesSum > 0)
            lastYearPagesAvg = (lastYearPagesSum / lastYearViewers).toFixed(2);

 //       statistics.staying_time_average = (stayingTimeSum / viewers.length / 1000 / 60 / 60).toFixed(2);
        if(dayStayingTimeSum > 0)
            statistics.day.staying_time_average.amount = (dayStayingTimeSum / statistics.day.viewers.amount / 1000 / 60 / 60).toFixed(2);
        if(weekStayingTimeSum > 0)
            statistics.week.staying_time_average.amount = (weekStayingTimeSum / statistics.week.viewers.amount / 1000 / 60 / 60).toFixed(2);
        if(monthStayingTimeSum > 0)
            statistics.month.staying_time_average.amount = (monthStayingTimeSum / statistics.month.viewers.amount / 1000 / 60 / 60).toFixed(2);
        if(yearStayingTimeSum > 0)
            statistics.year.staying_time_average.amount = (yearStayingTimeSum / statistics.year.viewers.amount / 1000 / 60 / 60).toFixed(2);
        if(lastDayPagesSum > 0)
            lastDayPagesAvg = (lastDayPagesSum / lastDayViewers).toFixed(2);
        if(lastWeekPagesSum > 0)
            lastWeekPagesAvg = (lastWeekPagesSum / lastWeekViewers).toFixed(2);
        if(lastMonthPagesSum > 0)
            lastMonthPagesAvg = (lastMonthPagesSum / lastMonthViewers).toFixed(2);
        if(lastYearPagesSum > 0)
            lastYearPagesAvg = (lastYearPagesSum / lastYearViewers).toFixed(2);

        console.log('lastMonthUsers', lastMonthUsers);
        updateIncreaseInfo(1, lastDayViewers, lastDayUsers.length, lastDayPagesAvg, lastDayStayingTimeAvg, statistics);
        updateIncreaseInfo(2, lastWeekViewers, lastWeekUsers.length, lastWeekPagesAvg, lastDayStayingTimeAvg, statistics);
        updateIncreaseInfo(3, lastMonthViewers, lastMonthUsers.length, lastMonthPagesAvg, lastDayStayingTimeAvg, statistics);
        updateIncreaseInfo(4, lastYearViewers, lastYearUsers.length, lastYearPagesAvg, lastDayStayingTimeAvg, statistics);
        //console.log('onePagesViewers = ' + onePagesViewers);
        statistics.abandonment_rate = ((onePagesViewers/viewers.length)*100).toFixed(2);

        console.log('statistics: ');
        console.log(statistics);

        res.status(200).json({data: statistics});

    }  
    catch(error){
        console.log(error);
        res.status(400).json({error: error});
    }

}
isActiveView = (viewer) => {
    if(viewer.leavingDate){
        return false
    }
    else
        return true;
}

isTodayView = (date) => {
    let currentDate = new Date();
    return generateDate(new Date(date)) == generateDate(currentDate);
}

isLastDayView = (date) => {
    let currentDate = new Date();
    let lastDay = moment().subtract(1, 'day');
    console.log('type of moment date: ' + typeof(lastDay));
    return generateDate(new Date(date)) == generateDate(new Date(lastDay));
}

isThisWeekView = (date) => {
    let dateBeforeWeek = moment().subtract(1, 'week');
    return new Date(date) >= new Date(dateBeforeWeek);
}

isLastWeekView = (date) => {
    let dateBeforeWeek = moment().subtract(1, 'week');
    let dateBefore2Weeks = moment().subtract(2, 'week');
    return (new Date(date) >= new Date(dateBefore2Weeks) && new Date(date) < new Date(dateBeforeWeek));
}

isThisMonthView = (date) => {
    let dateBeforeMonth = moment().subtract(1, 'month');
    return new Date(date) >= new Date(dateBeforeMonth);
}

isLastMonthView = (date) => {
    let dateBeforeMonth = moment().subtract(1, 'month');
    let dateBefore2Months = moment().subtract(2, 'month');
    return (new Date(date) >= new Date(dateBefore2Months) && new Date(date) < new Date(dateBeforeMonth));
}

isThisYearView = (date) => {
    let dateBeforeYear = moment().subtract(1, 'year');
    return new Date(date) >= new Date(dateBeforeYear);
}

isLastYearView = (date) => {
    let dateBeforeYear = moment().subtract(1, 'year');
    let dateBefore2Years = moment().subtract(2, 'year');
    return (new Date(date) >= new Date(dateBefore2Years) && new Date(date) < new Date(dateBeforeYear));
}

updateIncreaseInfo = (time, lastViewers, lastUsers, lastPagesAvg, lastStayingTimeAvg, statistics) => {
    switch(time){
        case 1: // day
            if(lastViewers > statistics.day.viewers.amount)
                statistics.day.viewers.increase = -1;
            else if(lastViewers < statistics.day.viewers.amount)
                statistics.day.viewers.increase = 1;
            if(lastUsers > statistics.day.units.amount)
                statistics.day.units.increase = -1;
            else if(lastUsers < statistics.day.units.amount)
                statistics.day.units.increase = 1;
            if(lastPagesAvg > statistics.day.pages_average.amount)
                statistics.day.pages_average.increase = -1;
            else if(lastPagesAvg < statistics.day.pages_average.amount)
                statistics.day.pages_average.increase = 1;
            if(lastStayingTimeAvg > statistics.day.staying_time_average.amount)
                statistics.day.staying_time_average.increase = -1;
            else if(lastStayingTimeAvg < statistics.day.staying_time_average.amount)
                statistics.day.staying_time_average.increase = 1;
            break;
        case 2:  //week
            if(lastViewers > statistics.week.viewers.amount)
                statistics.week.viewers.increase = -1;
            else if(lastViewers < statistics.week.viewers.amount)
                statistics.week.viewers.increase = 1;
            if(lastUsers > statistics.week.units.amount)
                statistics.week.units.increase = -1;
            else if(lastUsers < statistics.week.units.amount)
                statistics.week.units.increase = 1;
            if(lastPagesAvg > statistics.week.pages_average.amount)
                statistics.week.pages_average.increase = -1;
            else if(lastPagesAvg < statistics.week.pages_average.amount)
                statistics.week.pages_average.increase = 1;
            if(lastStayingTimeAvg > statistics.week.staying_time_average.amount)
                statistics.week.staying_time_average.increase = -1;
            else if(lastStayingTimeAvg < statistics.week.staying_time_average.amount)
                statistics.week.staying_time_average.increase = 1;
             break;
        case 3:  //month
            if(lastViewers > statistics.month.viewers.amount)
                statistics.month.viewers.increase = -1;
            else if(lastViewers < statistics.month.viewers.amount)
                statistics.month.viewers.increase = 1;
            if(lastUsers > statistics.month.units.amount)
                statistics.month.units.increase = -1;
            else if(lastUsers < statistics.month.units.amount)
                statistics.month.units.increase = 1;
            if(lastPagesAvg > statistics.month.pages_average.amount)
                statistics.month.pages_average.increase = -1;
            else if(lastPagesAvg < statistics.month.pages_average.amount)
                statistics.month.pages_average.increase = 1;
            if(lastStayingTimeAvg > statistics.month.staying_time_average.amount)
                statistics.month.staying_time_average.increase = -1;
            else if(lastStayingTimeAvg < statistics.month.staying_time_average.amount)
                statistics.month.staying_time_average.increase = 1;
             break;
        case 4:  //year
            if(lastViewers > statistics.year.viewers.amount)
                statistics.year.viewers.increase = -1;
            else if(lastViewers < statistics.year.viewers.amount)
                statistics.year.viewers.increase = 1;
            if(lastUsers > statistics.year.units.amount)
                statistics.year.units.increase = -1;
            else if(lastUsers < statistics.year.units.amount)
                statistics.year.units.increase = 1;
            if(lastPagesAvg > statistics.year.pages_average.amount)
                statistics.year.pages_average.increase = -1;
            else if(lastPagesAvg < statistics.year.pages_average.amount)
                statistics.year.pages_average.increase = 1;
            if(lastStayingTimeAvg > statistics.year.staying_time_average.amount)
                statistics.year.staying_time_average.increase = -1;
            else if(lastStayingTimeAvg < statistics.year.staying_time_average.amount)
                statistics.year.staying_time_average.increase = 1;
            break;
    }
}

updateUsersArr = (users, viewer) => {
    console.log('in updateUsersArr');
    let exist = users.find(user => (user.IPAddress == viewer.IPAddress));
    if(!exist){
        users.push(viewer);
        console.log('users: ');
        console.log(users);
    }
}

updateLocations = (viewer, statistics) => {
    let index = statistics.locations.findIndex(location => (location.title == viewer.location));
    if(index < 0){
        let newLocation = {'title': viewer.location, 'amount': 1};
        statistics.locations.push(newLocation);
    }
    else{
        statistics.locations[index].amount++;
    }
}

updateDevices = (viewer, statistics) => {
    let index = statistics.devices.findIndex(device => (device.title == viewer.device));
    if(index < 0){
        let newDevice = {'title': viewer.device, 'amount': 1};
        statistics.devices.push(newDevice);
    }
    else{
        statistics.devices[index].amount++;
    }
}

updateBrowsers = (viewer, statistics) => {
    let index = statistics.browsers.findIndex(browser => (browser.title == viewer.browser));
    if(index < 0){
        let newBrowser = {'title': viewer.browser, 'amount': 1};
        statistics.browsers.push(newBrowser);
    }
    else{
        statistics.browsers[index].amount++;
    }
}

updateOS = (viewer, statistics) => {
    console.log('in updateOS');
    let index = statistics.operating_systems.findIndex(os => (os.title == viewer.OS));
    if(index < 0){
        console.log('in first time os');
        let newOS = {'title': viewer.OS, 'amount': 1};
        statistics.operating_systems.push(newOS);
    }
    else{
        console.log('in os exist and get increment');
        statistics.operating_systems[index].amount++;
    }
}

updateYearViewsArray = (viewer, statistics) =>{
    let currentMonth = new Date().getMonth();
    let viewerMonth = viewer.date.getMonth();
    statistics.year_views_arr[currentMonth-viewerMonth]++; 
}

addPageToViewer = async (req, res) => {
    console.log('in addPageToViewer');
    try{
        console.log('viewerId: ' + req.params.viewerId);
        console.log('pageId:' + req.params.pageId);
        await Viewer.findByIdAndUpdate({_id:req.params.viewerId}, {$push: {pages:req.params.pageId}});
      //  let viewer = await Viewer.findById(req.body.viewerId);
        // console.log(viewer);
        // viewer.pages.push(req.params.pageId);
        // await viewer.save();
        res.status(200).json({message: "page added successfully"});
    }
    catch(err){
        console.log("error: " + err);
        res.status(400).json({error: err});
    }
}

updateViewerLeavingDate = async(req, res) =>{
    console.log('in updateViewerLeavingDate');
    console.log(req.body);
    try{
        let now = new Date();
        await Viewer.findByIdAndUpdate(req.params.viewerId, {leavingDate: now});
        res.status(200).json({message: 'LeavingDate updated successfuly'});
    }
    catch(err){
        console.log('error = '+ err);
        res.status(400).json({error: err});
    }


}

module.exports = {
//    addViewer,
    getStatistics,
    addPageToViewer,
    updateViewerLeavingDate,
//    getStatisticsToSocket
};