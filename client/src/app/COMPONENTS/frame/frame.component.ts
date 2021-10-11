import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild, HostListener, TemplateRef } from '@angular/core';
import { Item } from 'src/app/CLASSES/item';
import { DbService } from 'src/app/SERVICES/db.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/CLASSES/page';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Site } from 'src/app/CLASSES/site';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { FrameService } from 'src/app/SERVICES/frame.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import * as copy from 'copy-to-clipboard';
import { ActionsHistoryService } from 'src/app/SERVICES/actions-history.service';
declare let $;
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
  providers: []
})
export class FrameComponent implements OnInit {
  modalBody = ` <p style="font-weight: bold;text-align: center;">Sure you want to move to Trash?</p>
  <p style="text-align: center;">Once you delete, your site becomes unpublished </p><p style="text-align: center;">and can’t be edited.</p>`
  title = 'leaderSiteBuilder';
  itemToConfigurator: Item;
  @ViewChild('saveChanges') modalSaveChanges;
  updateFlag: boolean = false;
  thumbtack1 = false;
  thumbtack = true;
  fram_sidebarLeft = true;
  ifClass_fram_none = true;
  accounts: boolean = false
  iframeUrl: SafeResourceUrl
  @Output() publishOutput: EventEmitter<boolean> = new EventEmitter();
  selectedScreen: string = 'desktop';
  mobileIcons = false;
  stop: boolean = true
  publishPopover = false
  @ViewChild('template1') template: TemplateRef<any>
  viewPortPopover = false
  bottomPopover = false
  overLink: boolean = false;
  userName = ''

  constructor(private cd: ChangeDetectorRef, public configSer: ConfiguratorService, public ser: DbService, public http: HttpService, public builderSer: BuilderService,
    public router: Router, public activatedRoute: ActivatedRoute, private el: ElementRef, public historySer: ActionsHistoryService,
    private _sanitizer: DomSanitizer, public generalSer: GeneralActionsService, public frameSer: FrameService) {
    this.userName = window.location.pathname.split('/')[1]
    this.el = el;
    let frameComp = this
    window.addEventListener('popstate', function (event) {
      if (window.location.pathname.search('editProject') != -1) {

        frameComp.http.getLastSite().subscribe(d => {
          frameComp.ser.site = Site.fromServerObject(d.site);
          frameComp.ser.siteToConfig = frameComp.ser.site;
          frameComp.http.isNotBegining = true
          frameComp.http.loadAllPages(d.site);
        }, e => { })
      }
    })
  }

  @HostListener('window:message', ['$event'])
  recieveMessageFromIframe(event) {
    try {
      const data = JSON.parse(event.data);
      switch (data.function) {
        case 'loadItemToConfigurator': this.generalSer.loadItemToConfigurator(data.params[0], data.params[1], data.params[2]); break;
        case 'changeImageCarusel':
          this.ser.lastItem.attributes['items'][data.params[1]].thumbImage = data.params[0];
          this.ser.lastItem.attributes['items'][data.params[1]].image = data.params[0];
          break;
        case 'loadColToConfigurator': this.generalSer.loadColToConfigurator(data.params[0]); break;
        case 'loadPrevNextStack': this.historySer.loadPrevNextStack(data.params[0], data.params[1]); break;
        case 'dragGrid': this.builderSer.dragGrid(data.params[0]); break;
        case 'createGrid': this.builderSer.createGrid(data.params[0]); break;
        case 'openBuilderMenu': this.ser.builderStatus = data.params[0]; break;
        case 'addPageToSite': this.generalSer.addPageToSite(data.params[0]); break;
        case 'changePage':

          if (data.params[0].sections) {
            let i = this.ser.site.pages.indexOf(this.ser.currentPage);
            this.ser.site.pages[i] = this.ser.currentPage = Page.fromServerObject(data.params[0]);
          }
          else {
            this.ser.currentPage = this.ser.site.pages.find(x => x._id == data.params[0]);
          }
          this.ser.configuratorFlag = 'editPage';
          break;
        case 'showGridLine': this.ser.showGridLine = data.params[0]; break;
        case 'changePageName':
          this.ser.CurrentPage.name = data.params[1];
          this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changePropertiesPage', params: ['name', data.params[1]] }))
          break;
        case 'openModal':
          this.ser.imgToChange = 'changeImg'
          this.generalSer.openModal(this.template)
          break;
        case 'refreshLayers': this.ser.site.pages = data.params[0].map(i => { return Page.fromServerObject(i) }); break;
        case 'loadMyProjects': this.generalSer.loadMyProjects(); break;
        case 'closeBuilder': this.frameSer.closeBuilder(); break;
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  copyLink() {
    copy('https://' + this.ser.site.url + '.bldr.codes');
  }

  openBottomPopover(popType) {
    if (popType == 'viewPort') {
      if (this.viewPortPopover)
        this.bottomPopover = false
      else
        this.bottomPopover = true
      this.viewPortPopover = !this.viewPortPopover
      this.publishPopover = false
    }
    else {
      if (this.publishPopover)
        this.bottomPopover = false
      else
        this.bottomPopover = true
      this.publishPopover = !this.publishPopover
      this.viewPortPopover = false
    }
  }

  ngAfterViewInit() {
    if (this.ser.serverSite) {
      this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'loadSite', params: [this.ser.serverSite] }), '*')
      this.ser.serverSite = null
    }
  }

  ngOnInit() {
    this.iframeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('/' + this.http.userName + '/preview')
  }

  showGrid() {
    this.setsquareSize(12)
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'showGridLine', params: [this.ser.showGridLine] }), '*')
  }

  setsquareSize(size) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'setsquareSize', params: [size] }), '*')

  }

  livePreview() {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(
      JSON.stringify({ function: 'livePreview' }), '*'
    )
  }
  changeName(siteName) {
    this.ser.site.url = siteName;
  }

  previewScreen(screen, changeMobileIcons) {
    if (changeMobileIcons)
      this.mobileIcons = !this.mobileIcons;
    this.ser.statusScreen = screen;
    this.selectedScreen = screen;
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'previewScreen', params: [screen] }), '*')

  }

  publish() {
    this.ser.publishFlag = false;
    this.updateFlag = true;
    let siteToSend = this.ser.site.toServerObject()
    siteToSend.pages = []
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({
      function: 'publishSite',
      params: [siteToSend]
    }), '*')
  }

  showSection() {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'createAboutSection' }), '*')

  }

  setPage(num) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(
      JSON.stringify({ function: 'setPage', params: [num] }), '*')
  }

  downloadSite() {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(
      JSON.stringify({ function: 'downloadSite' }), '*')
  }
}