import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Site } from 'src/app/CLASSES/site';
import { DbService } from 'src/app/SERVICES/db.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-all-sites',
  templateUrl: './all-sites.component.html',
  styleUrls: ['./all-sites.component.scss']
})
export class AllSitesComponent implements OnInit {
  modalBody
  timer: any = 0;
  delay = 200;
  prevent = false;
  flagOverItem: number = 0;
  overNewSite: boolean = false;
  searchText;
  lastSite;
  constructor(public http: HttpService, public ser: DbService,
    public modalService: BsModalService, public generalActionsSer: GeneralActionsService) {
  }
  public ngOnDestroy() {
    this.ser.mysites = false
    if (this.ser.lastChooseVeiwSite)
      this.ser.lastChooseVeiwSite.chooseSite = false
    if (this.lastSite) {
      this.lastSite.chooseSite = false
      this.lastSite.overSite = false
    }
  }
  ngOnInit(): void {
    this.ser.ifAllProjects = true;
    this.ser.site = new Site()
    this.ser.mysites = true
    if (this.ser.sites.length == 0)
      this.http.getSites().subscribe(d => {
        debugger
        this.ser.siteLoader = false
        d.sites.forEach(s => {
          if (s != null)
            this.ser.sites.push(s)
        });
      }, e => { console.log(e) })
  }
  duplicateSite() {
    this.http.duplicateSite(this.ser.lastChooseVeiwSite).subscribe(d => {
      this.ser.sites.push(d.siteContent)
    }, e => { })
  }
  removeSite(deleteSite) {
    this.modalBody = ` <p style="font-weight: bold;text-align: center;">Sure you want to move ` + this.ser.lastChooseVeiwSite.name + ` to Trash?</p>
    <p style="text-align: center;">Once you delete, your site becomes unpublished </p><p style="text-align: center;">and can’t be edited.</p>`
    this.ser.siteToDelete = this.ser.lastChooseVeiwSite;
    this.generalActionsSer.openModal(deleteSite, true)
  }
  chooseSite(site) {

    clearTimeout(this.timer);
    this.prevent = true;
    this.ser.ifAllProjects = false;
    this.ser.configuratorFlag = ''
    this.http.getSiteById(site._id).subscribe(d => {

      this.ser.site = Site.fromServerObject(d.site);
      this.ser.siteToConfig = this.ser.site;
      this.http.isNotBegining = true
      this.http.loadAllPages(d.site);
    }, e => { })
  }
  changeBackground(value, event, value2?) {
    event.stopPropagation()
    this.timer = setTimeout(function (allSitesComp) {
      if (!allSitesComp.prevent) {
        if (value == 1) {
          value2.overSite = true
        }
        if (value == 2) {
          if (!value2.chooseSite) {
            value2.overSite = false
          }
        }
        if (value == 0) {

          allSitesComp.ser.configuratorFlag = 'editSite'
          allSitesComp.ser.mysites = false
          allSitesComp.ser.flagChooseSite = true
          if (allSitesComp.lastSite && (allSitesComp.lastSite._id != value2._id)) {
            allSitesComp.lastSite.chooseSite = false
            allSitesComp.lastSite.overSite = false
          }
          allSitesComp.lastSite = value2
          value2.chooseSite = true
          allSitesComp.ser.lastChooseVeiwSite = value2
        }
      }
      allSitesComp.prevent = false;
    }, this.delay, this);
  }
  ClickedOutside() {
    this.ser.configuratorFlag = ''
    this.ser.mysites = true
    this.ser.flagChooseSite = false
    if (this.lastSite) {
      this.lastSite.chooseSite = false
      this.lastSite.overSite = false
    }
  }
  configSite(site) {
    this.timer = setTimeout(function (allSitesComp) {
      if (!allSitesComp.prevent) {
        allSitesComp.ser.siteToConfig = site;
      }
      allSitesComp.prevent = false;
    }, this.delay, this);
  }
}
