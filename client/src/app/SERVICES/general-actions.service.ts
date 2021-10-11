import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Action } from '../CLASSES/action';
import { Col } from '../CLASSES/col';
import { Item } from '../CLASSES/item';
import { Page } from '../CLASSES/page';
import { Section } from '../CLASSES/section';
import { Site } from '../CLASSES/site';
import { Stack } from '../CLASSES/stack';
import { DbService } from './db.service';
import { HttpService } from './http-ser.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { json } from 'express';
import { Router } from '@angular/router';
import { FilesHttpService } from './files-http.service';
declare let html2canvas: any;
import * as fileSaver from 'file-saver';
import { ConfiguratorService } from './configurator.service';
import { QuestionService } from './FORM/question.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GeneralActionsService {

  timer: any = 0;
  delay = 200;
  typeAsset;
  idAsset;
  page;
  modalRef: BsModalRef;
  static ngIfAnimations = [
    trigger(
      'slideLeftToRight',
      [
        transition(
          ':enter', [
          style({ transform: 'translateX(0)', opacity: 0 }),
          animate('250ms', style({ transform: 'translateX(0)', 'opacity': 1 }))
        ]
        ),
        transition(
          ':leave', [
          style({ transform: 'translateX(0)', 'opacity': 1 }),
          animate('250ms', style({ transform: 'translateX(0)', 'opacity': 0 }))
        ]
        )],

    )
    , trigger(
      'slideTopToBottom',
      [
        transition(
          ':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('200ms', style({ transform: 'translateY(100%)', 'opacity': 1 }))
        ]
        ),
        transition(
          ':leave', [
          style({ transform: 'translateY(100%)', 'opacity': 1 }),
          animate('200ms', style({ transform: 'translateY(-100%)', 'opacity': 0 }))
        ]
        )],
    ),
    trigger(
      'slideBottomToTop',
      [
        transition(
          ':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('300ms', style({ transform: 'translateY(0)', 'opacity': 1 }))
        ]
        ),
        transition(
          ':leave', [
          style({ transform: 'translateY(0)', 'opacity': 1 }),
          animate('300ms', style({ transform: 'translateY(-100%)', 'opacity': 0 }))
        ]
        )],
    ),


  ]
  constructor(private filesSer: FilesHttpService, private ser: DbService, private http: HttpService, private router: Router,
    private modalService: BsModalService, private httpService: HttpClient, public qs: QuestionService, public serHttp: HttpClient) { }

  //download site to JSON file
  //1
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  //2- dont use
  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  //3
  fakeValidateUserData() {
    let mySite = this.ser.site.toServerObject();
    return of({
      site: mySite,
    });
  }

  //4
  dynamicDownloadJson() {
    this.fakeValidateUserData().subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: this.ser.site.name + '.json',
        text: JSON.stringify(res)
      });
    });

  }

  uploadSite(files) {
    let path = '';
    var reader = new FileReader();
    reader.onload = (event: any) => {
      path = event.target.result;
      this.httpService.get(path).subscribe(
        data => {
          this.http.duplicateSite(data['site']).subscribe(d => {
            this.ser.site = Site.fromServerObject(d.siteContent);
            this.loadSite(d.siteContent);
            this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'loadSite', params: [d.siteContent] }), '*');
          }, e => { })
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
    }
    reader.readAsDataURL(files[0]);
  }

  livePreview() {
    localStorage.clear()
    localStorage.setItem('site', JSON.stringify(this.ser.site.toServerObject()))
    window.open('/' + this.http.userName + '/livePreview' + '/' + this.ser.currentPage.url)
  }

  changeBorderByBackground(event, selectedItem) {
    let tinycolor = require("tinycolor2");
    for (let i = 0; event.path[i].localName != 'app-preview'; i++) {
      if (event.path[i].attributes.style) {
        let style = event.path[i].attributes.style.value.split(';');
        style.forEach(s => {
          let background = s.replace(' ', '').split(':');
          if (background[0] == 'background-color' || background[0] == 'background-image' || background[0] == 'background') {
            if (tinycolor(background[1]).isDark() && tinycolor(background[1]).toName() != 'transparent') {
              selectedItem.lightBorder = true;
              return;
            }
          }
        });
      }
    }
  }

  addPageToSite(page) {
    let p = Page.fromServerObject(page)
    this.ser.site.pages.push(p);
    this.ser.currentPage = p;
    this.ser.lastPageIndex = p.index;
  }

  loadSite(site) {
    if (!site.pages)
      site.pages = []
    DbService.loadSiteStatus = true;
    this.ser.site = Site.fromServerObject(site);
    DbService.loadSiteStatus = false;
    if (this.ser.builderMode) {
      this.ser.currentPage = this.ser.site.pages[0];
      this.ser.lastOuterCol = this.ser.lastCol = this.ser.currentPage.sections[0].item.rows[0].cols[0];
      this.ser.lastCol.chooseCol = true
      this.ser.lastCol.parentRow.parentItem.chooseElement = true
    }
  }

  createNewSite(siteType, modal?) {
    this.ser.newSiteLoader = false
    this.ser.isNewUser = false
    this.http.postSite(siteType).subscribe(d => {
      this.ser.newSiteLoader = true
      console.log('site created', d)
      this.ser.sites.push(d.site)
      this.ser.ifAllProjects = false;
      this.ser.newProject = false;
      this.ser.site = Site.fromServerObject(d.site);
      this.ser.siteToConfig = this.ser.site;
      this.http.isNotBegining = true
      this.http.loadAllPages(d.site);
    }, e => {

      if (e.status == 409)
        this.ser.siteNameExist = true
      this.ser.newSiteLoader = true
      console.log('site error', e)
    })

  }

  loadMyProjects() {
    this.router.navigate(['/' + this.http.userName + '/myProjects']);
  }

  screenShotSave(type) {
    let capturedImage;
    let self = this;
    let screenShot;
    html2canvas(document.querySelector("body")).then(canvas => {
      capturedImage = canvas.toDataURL();
      canvas.toBlob(function (response) {
        let blob: any = new Blob([response], { type: 'images/jpg; charset=utf-8' });
        let file = new File([blob], 'screenshot' + self.ser.site.name + '.jpg', {
          type: "image/jpg"
        });
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let data = new FormData();
          data.append('files', file);
          self.filesSer.uploadFile(data, false).subscribe(f => {
            screenShot = f.data.url;
            switch (type) {
              case 'site':
                self.http.saveScreenShotChange(screenShot).subscribe(sc => {
                  self.ser.site.screenshot = sc.screenshot;
                  self.http.newAsset('site', screenShot).subscribe(d => {
                  }, e => {
                  });
                }, err => { })
                break;
              case 'page':
                self.http.newAsset('page', screenShot).subscribe(d => {
                }, e => {
                });
                break;
              default:
                self.http.saveScreenShotChange(screenShot).subscribe(sc => {
                  self.ser.site.screenshot = sc.screenshot;
                }, err => { })
                break;
            }
          }, e => { })
        }
      });
    });
    return screenShot;
  }

  loadColToConfigurator(selectedCol) {
    this.ser.configuratorFlag = 'editCol'
    this.ser.lastCol = Col.fromServerObject(selectedCol, selectedCol.parentRow);
    this.ser.whatLast = 'col';
    this.ser.stylesToConfig = selectedCol.styles;
  }

  loadItemToConfigurator(tagName, item, main?) {
    this.ser.ifSingleWidget = false;
    if (main == true)
      this.ser.mainSection = true
    else
      this.ser.mainSection = false
    this.ser.lastItem = Item.fromServerObject(item, item.parentCol);

    this.ser.whatLast = tagName;
    if (tagName == 'header')
      this.ser.configurator('header')
    else
      if (tagName == 'form') {
        this.ser.configurator('editingForm')
      }
      else {
        this.ser.configurator('editingElement')
      }
  }

  bubbleSortOfIndex() {
    let temp;
    let swaped;
    let lengthOfArr = this.ser.site.pages.length;
    do {
      swaped = false;
      lengthOfArr--;
      for (let i = 0; i < lengthOfArr; i++)
        if (this.ser.site.pages[i].index > this.ser.site.pages[i + 1].index) {
          temp = this.ser.site.pages[i];
          this.ser.site.pages[i] = this.ser.site.pages[i + 1];
          this.ser.site.pages[i + 1] = temp;
          swaped = true;
        }
    }
    while (swaped)
  }

  changeIndexes(newIndex, oldIndex) {

    if (this.ser.site.pages.length == 1)
      return;
    let page = this.ser.site.pages.find(p => p.index == oldIndex);
    if (oldIndex > newIndex) {
      this.ser.site.pages.forEach(p => {
        if (p.index >= newIndex && p.index < oldIndex) {
          console.log("p", p)
          p.index++
        }
      })
    }
    if (oldIndex < newIndex) {
      this.ser.site.pages.forEach(p => {
        if (p.index <= newIndex && p.index > oldIndex) {
          console.log("p", p)
          p.index--

        }
      })
    }
    page.index = newIndex;
    this.bubbleSortOfIndex();
  }

  bubbleSortOfIndexImage() {
    let temp;
    let swaped;
    let lengthOfArr = this.ser.lastItem.attributes['items'].length;
    do {
      swaped = false;
      lengthOfArr--;
      for (let i = 0; i < lengthOfArr; i++)
        if (this.ser.lastItem.attributes['items'][i].index > this.ser.lastItem.attributes['items'][i + 1].index) {
          temp = this.ser.lastItem.attributes['items'][i];
          this.ser.lastItem.attributes['items'][i] = this.ser.lastItem.attributes['items'][i + 1];
          this.ser.lastItem.attributes['items'][i + 1] = temp;
          swaped = true;
        }
    }
    while (swaped)
  }

  changeIndexesImages(newIndex, oldIndex) {
    if (this.ser.lastItem.attributes['items'].length == 1)
      return;
    let page = this.ser.lastItem.attributes['items'].find(p => p.index == oldIndex);
    if (oldIndex > newIndex) {
      this.ser.lastItem.attributes['items'].forEach(p => {
        if (p.index >= newIndex && p.index < oldIndex) {
          console.log("p", p)
          p.index++
        }
      })
    }
    if (oldIndex < newIndex) {
      this.ser.lastItem.attributes['items'].forEach(p => {
        if (p.index <= newIndex && p.index > oldIndex) {
          console.log("p", p)
          p.index--

        }
      })
    }
    page.index = newIndex;
    this.bubbleSortOfIndexImage();
  }

  deleteSite() {
    this.http.deleteSite(this.ser.siteToDelete).subscribe(data => {
      let i = this.ser.sites.findIndex(s => s._id == data.result);
      this.ser.sites.splice(i, 1);
      if (window.location.pathname.search('myProjects') == -1)
        this.router.navigate(['/' + this.http.userName + '/myProjects'])
    }, e => { });
  }

  changeInputInForm(question, checked) {
    this.ser.lastItem.children.find(c => c.order == question.order).enable = checked
  }

  copyItemStyle(item) {
    this.ser.stylesToCopy.divStyles = Object.assign({}, item.styles.divStyles)
    this.ser.stylesToCopy.spanStyles = Object.assign({}, item.styles.spanStyles)
    this.ser.stylesToCopy.simpleStyles = Object.assign({}, item.styles.simpleStyles)
    if (item.tagName == 'form') {
      this.ser.stylesToCopy.formInputsStyle = Object.assign({}, item.styles.formInputsStyle)
    }
  }

  pasteItemStyle(item) {
    item.styles.divStyles = Object.assign({}, this.ser.stylesToCopy.divStyles)
    item.styles.spanStyles = Object.assign({}, this.ser.stylesToCopy.spanStyles)
    item.styles.simpleStyles = Object.assign({}, this.ser.stylesToCopy.simpleStyles)
    if (item.tagName == 'form') {
      item.styles.formInputsStyle = Object.assign({}, this.ser.stylesToCopy.formInputsStyle)
    }
  }

  openModal(template: TemplateRef<any>, VerticallyCentered?) {
    if (!VerticallyCentered)
      this.modalRef = this.modalService.show(template, { class: 'modal-xl modal-dialog-centered' })
    else
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  close() {
    this.modalRef.hide();
  }

  pxTOvw(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    var result = (100 * value) / x;
    return result;
  }

  vwTOpx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    var result = (x * value) / 100;
    return result;
  }

  vhTOpx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    var result = (y * value) / 100;
    return result;
  }

  pxTOvh(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    var result = (100 * value) / y;
    return result;
  }

  createContactToServer(email) {
    let newContact = Object.assign({ email });

    const keys = Object.keys(newContact);
    const nessary = ["conversations", "active", "starred", "waves", "email"]

    let message = `<h5>The details of your new contact:</h5>
<table border="1" ><tr> <td><b>email:</b></td><td><a href='${"https://contacts.dev.leader.codes/"}${this.http.userName}?c=${newContact["email"]}'>${newContact['email']}</a></td></tr>`;
    keys.forEach((key) => {
      if (newContact[key] && !nessary.some(nessary => nessary == key))
        message += `<tr> <td><b>${key}:<b/></td><td>${newContact[key]}</td></tr>`;
    })
    message += `</table>`;
    this.http.createContact(message, newContact).subscribe(d => {
    }, e => { });
  }

  changeFormInput(question, value) {
    this.ser.lastItem.children.find(c => c.order == question.order).key = value
    this.ser.lastItem.children.find(c => c.order == question.order).label = value
  }

  createMessage(form) {
    let formData = Object.assign({});
    formData = Object.assign(formData, form.value);
    let formContent = '';
    for (let k in formData) {
      formContent += '<p>' + k + ':' + formData[k] + '</p>';
    }
    let message = {
      "subject": "A new form entered on your site !!",
      "body": formContent,
      "to": this.http.userName + "@mails.codes",
      "from": "bldr@noreply.leader.codes",
      "source": "BLDR",
      "files": null
    }
    this.http.createMessageInLeaderBox(message).subscribe(d => {
    }, e => { })
  }

  removeFromGlobalWidgets() {
    this.ser.lastItem.globalWidgetName = null;
    this.ser.lastItem.singleProperties = [];
    let i = DbService.globalWidgets.indexOf(this.ser.lastItem);
    DbService.globalWidgets.splice(i, 1);
  }

  sortIndexesByPages() {
    for (let j = 0; j < this.ser.site.pages.length - 1; j++) {
      this.ser.site.pages[j].index = j
    }
  }

  removePageOfSite(page) {
    this.sortIndexesByPages();
    let i = this.ser.currentPage.index;
    this.ser.site.pages.splice(i, 1);
    this.sortIndexesByPages();
    if (this.ser.site.pages.length == 0)
      this.ser.site.pages.push(Page.fromServerObject(page))
    this.ser.currentPage = this.ser.site.pages[this.ser.site.pages.length - 1]
  }
}
