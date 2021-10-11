
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as copy from 'copy-to-clipboard';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-c-site',
  templateUrl: './c-site.component.html',
  styleUrls: ['./c-site.component.scss', '../../configurator/configurator.component.scss']
})
export class CSiteComponent implements OnInit {

  constructor(public ser: DbService, public router: Router, public http: HttpService, public generalActionsSer: GeneralActionsService, public configuratorSer: ConfiguratorService) { }

  ngOnInit(): void {
  }
  copyLink(event) {

    copy(event.currentTarget.parentElement.childNodes[0].textContent);
  }
  changeStyles(name, value, value2?, value3?, event?, blur?) {
    if (value == 'link') {
      if (this.ser.lastItem.tagName == 'a') {
        this.ser.lastItem.tagName = 'h1'
        this.ser.whatLast = 'h1'
      }
      else {
        this.ser.lastItem.tagName = 'a'
        this.ser.whatLast = 'a'
      }

    }

    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStyles', params: [name, value, value2, value3, event, blur] }), '*')
  }

  getGeneralSetting() {
    return DbService.generalSettings;

  }

  navigateToStatistics() {
    this.router.navigate(['/' + this.http.userName + '/statistics']);
  }

  changePropertiesSite(type, value, status?) {

    switch (type) {
      case 'name':
        if (status == 'this') {
          this.ser.site.name = value
        }
        else {
          this.ser.lastChooseVeiwSite.name = value;
        }
        break;
      case 'url':
        if (status == 'this') {
          this.ser.site.url = value;
        } else {
          this.ser.lastChooseVeiwSite.url = value;
        }
        break;
      case 'logo':
        if (status == 'this') {
          this.ser.site.logo = value;
        } else {
          this.ser.lastChooseVeiwSite.logo = value;
        }
        break;
    }
  }

  saveTemplate(type) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'saveTemplate', params: [type] }), '*')
  }

  deleteAsset(type) {
    this.http.deleteAllAssetsToUser(type).subscribe(d => {

    }, err => { })
  }
  changeStylesG(keys, value, actionType = 'general') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }
}
