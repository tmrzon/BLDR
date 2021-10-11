
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DbService } from './db.service';
import { Page } from 'src/app/CLASSES/page';
import { Section } from 'src/app/CLASSES/section';
import { Viewer } from '../CLASSES/viewer';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders();
  jwt = '';// = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyWDRIU0ExZXRzYXdiQkluWVhneGNGOVo1TzYzIiwiZW1haWwiOiJpdGF5QGxlYWRlci5jb2RlcyIsImlhdCI6MTYwMDg0NTQyM30.m4iak4qvO9QS6iLnKUh5S8zjOawjUwxrqSOgc26dV7g';
  uId: string;
  userName: string;
  FirstTimeEntered = true;
  URL_FOR_VIEWERS = ''
  isNotBegining = false
  isLocal = window.location.hostname == "localhost"
  user;
  env = environment
  //  export const contentHeaders = new Headers(); contentHeaders.append('Accept', 'application/json'); contentHeaders.append('Content-Type', 'application/json'); ‏
  constructor(private _sanitizer: DomSanitizer, public serHttp: HttpClient, public ser: DbService, private router: Router) {
    if (window.location.hostname == 'bldr.codes' || window.location.hostname == 'localhost') {
      let self = this;
      let jwtFromCookie = document.cookie.includes(this.env.JWT) ?
        document.cookie.split(";").filter(function (s) {
          return s.includes(self.env.JWT);
        })[0].split("=").pop() : window.location.href = window.location.pathname.split('/')[2] ?
          this.env.LOGIN_URL + `?routes=${window.location.pathname.split('/')[2]}` :
          this.env.LOGIN_URL;

      this.jwt = jwtFromCookie ? jwtFromCookie : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJJclJCaTlyamFXYndLQVZKQkZ6UmZNSUN0NXEyIiwiZW1haWwiOiJ5aTQxNDk0MTFAZ21haWwuY29tIiwiaWF0IjoxNjEzMjUwOTEwfQ.vLfr9LDavL2FrsoStrLePfziGx7yuCPzano_uX5KulY';
      this.headers = this.headers.append('Authorization', this.jwt);
      this.userName = window.location.pathname.split('/')[1]
    }
    if (window.location.hostname != 'localhost')
      this.URL_FOR_VIEWERS = 'https://' + window.location.hostname.split('.')[0] + '.bldr.codes/apiForPublish/'
    else
      this.URL_FOR_VIEWERS = 'https://bldr.codes/apiForPublish/'
  }
  getSites(): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/getSites?isLocal=' + this.isLocal, {}, { headers: this.headers });
  }

  duplicateSite(site): Observable<any> {
    let siteContent
    try {
      siteContent = site.toServerObject();
    }
    catch {
      siteContent = site;
    }
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/duplicateSite?isLocal=' + this.isLocal, { 'site': siteContent }, { headers: this.headers });
  }

  deleteSite(site): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/deleteSite?isLocal=' + this.isLocal, { 'siteId': site._id }, { headers: this.headers });
  }
  postPage(siteId): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/newPage?isLocal=' + this.isLocal, { siteId }, { headers: this.headers });
  }
  editPage(page: Page): Observable<any> {
    let p = page.toServerObject();
    let myPage = {
      _id: page._id,
      name: p.name,
      url: p.url,
      sections: [],
      siteId: p.siteId
    };
    p.sections.forEach(s => {
      myPage.sections.push(s);
    });
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/editPage?isLocal=' + this.isLocal, { 'page': myPage }, { headers: this.headers });
  }
  deletePage(id): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/deletePage?isLocal=' + this.isLocal, { 'pageId': id }, { headers: this.headers });
  }
  duplicatePage(page: Page): Observable<any> {
    let p = page.toServerObject()
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/duplicatePage?isLocal=' + this.isLocal, { 'page': p }, { headers: this.headers });
  }
  editIndexOfPage(page): Observable<any> {
    let p = page.toServerObject();
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/editPageIndex?isLocal=' + this.isLocal, { 'page': p }, { headers: this.headers });
  }

  getPageById(id) {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/getPage?isLocal=' + this.isLocal, id, { headers: this.headers });
  }

  getSiteById(id): Observable<any> {
    console.log('jwt', this.jwt)
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/getSite?isLocal=' + this.isLocal, { 'siteId': id }, { headers: this.headers });
  }
  getSiteByUrl(url): Observable<any> {

    let viewerDetails = this.getViewerDetails();
    return this.serHttp.post<any>(this.URL_FOR_VIEWERS + 'getSiteByUrl?isLocal=' + this.isLocal, { 'siteUrl': url, 'viewerDetails': viewerDetails });
  }
  getViewerDetails() {
    let viewerDetails = new Viewer();
    viewerDetails.browser = this.determineBrowser();
    viewerDetails.OS = window.clientInformation.platform;
    viewerDetails.device = this.determineDevice();
    return viewerDetails;
  }

  addPageToViewer() {
    return this.serHttp.get<any>(this.URL_FOR_VIEWERS + 'addPageToViewer/?isLocal=' + this.isLocal + this.ser.viewerId + '/' + this.ser.currentPage._id);
  }

  updateViewerLeavingDate(event) {
    localStorage.setItem('left5', 'inside function');
    navigator.sendBeacon(this.URL_FOR_VIEWERS + 'updateViewerLeavingDate/?isLocal=' + this.isLocal + this.ser.viewerId, JSON.stringify(event));
  }

  determineBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      return 'Opera';
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return 'Chrome';
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
      return 'Safari';
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return 'Firefox';
    }
    else {
      return 'unknown';
    }
  }

  determineDevice() {
    let ua = window.navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  }

  postSite(siteType): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/newSite?isLocal=' + this.isLocal, { siteType }, { headers: this.headers });
  }
  editSite(site): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/saveSite?isLocal=' + this.isLocal, { 'site': site }, { headers: this.headers });
  }
  publishSite(site): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/publishSite?isLocal=' + this.isLocal, { 'site': site }, { headers: this.headers });
  }
  postSection(section: Section): Observable<any> {
    let mySection = section.toServerObject();
    console.log(mySection);
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/newSection?isLocal=' + this.isLocal, mySection, { headers: this.headers });
  }
  getSectionById(id): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/getSection?isLocal=' + this.isLocal, { 'sectionId': id }, { headers: this.headers });
  }
  getSectionsByCategoryId(id): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/getSectionsByCategoryId?isLocal=' + this.isLocal, { 'categoryId': id }, { headers: this.headers });
  }
  editSection(section: Section): Observable<any> {
    let s = section.toServerObject();
    let mySection = {
      _id: section._id,
      name: s.name,
      item: s.item,
      pageId: s.pageId,
      index: s.index
    };
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + '/editSection?isLocal=' + this.isLocal, { 'section': mySection }, { headers: this.headers });
  }
  uploadImage(img): Observable<any> {//to check problems
    var myFile = new FormData();
    myFile.append("file", img, img.name);
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/upload?isLocal=" + this.isLocal, myFile, { headers: this.headers });
  }
  getCategories(): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/getCategories?isLocal=" + this.isLocal, {}, { headers: this.headers });
  }
  postCategory(): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/newSectionCategory?isLocal=" + this.isLocal, { 'name': 'Home' }, { headers: this.headers });
  }
  getLastSite(): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/getLastSite?isLocal=" + this.isLocal, {}, { headers: this.headers });
  }
  getUserDetails(): Observable<any> {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/getUserDetails?isLocal=" + this.isLocal, {}, { headers: this.headers });
  }
  loadAllPages(serverSite, isToLoadIframe?) {

    this.ser.currentPage = this.ser.site.pages[0]
    if (this.isNotBegining) {//after all projects

      this.isNotBegining = false
      sessionStorage.setItem('siteAfterAllProjects', JSON.stringify(serverSite))
      this.router.navigate(['/' + this.userName + '/editProject'])
    }
    else {//when first entrance is to editProject

      sessionStorage.setItem('siteAfterAllProjects', JSON.stringify(serverSite))
      this.ser.iframeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('/' + this.userName + '/preview')
    }
    this.ser.configuratorFlag = 'editPage'
  }
  getStatistics(): Observable<any> {
    return this.serHttp.get<any>(this.env.BASE_URL + 'api/' + this.userName + "/" + this.ser.site._id + "/getStatistics?isLocal=" + this.isLocal, { headers: this.headers });
  }
  newForm(form) {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/newForm?isLocal=" + this.isLocal, { form }, { headers: this.headers });
  }
  fetchAcounts(): Observable<any> {
    return this.serHttp.get<any>(this.env.ACCOUNTS_URL + this.userName, { headers: this.headers })
  }
  createContact(message, newContact): Observable<any> {
    let body = {
      "conversation": {
        "subject": "created new contact",
        "source": "BLDR Temporary",
        "Readed": true
      },
      "wave": { "body": message, "from": "CRM@mail.leader.codes" },
      "emailInfo": {
        "from": "CRM@mail.leader.codes",
        "to": this.userName + "@mail.leader.codes",
        "subject": "you create sucsses a new contact",
        "text": message
      },
      "contact": newContact,
      "withConversation": true,
      "source": { "type": "Manual" }
    };
    return this.serHttp.post<any>(this.env.LEADER_URL + this.userName + "/createContact?isLocal=" + this.isLocal, body, { headers: this.headers })
  }
  createMessageInLeaderBox(message): Observable<any> {
    return this.serHttp.post<any>(this.env.LEADER_URL + this.userName + "/createSystemWave?isLocal=" + this.isLocal, message, { headers: this.headers })
  }

  newAsset(type, screenShot): Observable<any> {
    let obj;
    switch (type) {
      case 'site':
        obj = this.ser.site.toServerObject();
        break;
      case 'page':
        obj = this.ser.currentPage.toServerObject()
        break;
    }
    let asset = {
      "assetType": type,
      "object": obj,
      "screenShot": screenShot
    }

    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/newAsset?isLocal=" + this.isLocal, asset, { headers: this.headers })
  }

  setAsset(assetId, objectToSet?): Observable<any> {
    let body = {
      "assetId": assetId,
      "objectToSet": objectToSet,
      "siteId": this.ser.site._id
    }

    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/setAsset?isLocal=" + this.isLocal, body, { headers: this.headers })
  }

  getAllAssetsByType(type) {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + 'bldrSystem' + "/getAllAssetByType?isLocal=" + this.isLocal, { type: type }, { headers: this.headers })
  }

  deleteAllAssetsToUser(type) {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/deleteAllAssetsToUser?isLocal=" + this.isLocal, { type: type }, { headers: this.headers })
  }

  saveScreenShotChange(screenshot) {
    return this.serHttp.post<any>(this.env.BASE_URL + 'api/' + this.userName + "/saveScreenShotChange?isLocal=" + this.isLocal, { site: this.ser.site._id, screenshot: screenshot }, { headers: this.headers })

  }
}