import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Col } from 'src/app/CLASSES/col';
import { Item } from 'src/app/CLASSES/item';
import { Page } from 'src/app/CLASSES/page';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { PreviewService } from 'src/app/SERVICES/preview.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbPopoverConfig]
})
export class HeaderComponent implements OnInit {
  ifHoverHeader = false;
  constructor(public ser: DbService, public router: Router, private http: HttpService,
    public generalAction: GeneralActionsService, config: NgbPopoverConfig, public previewSer: PreviewService) {
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    if (window.location.pathname.search('livePreview') != -1)
      this.ser.prefixUrlForHeader = '/' + this.http.userName + '/livePreview/'
  }
  changeName(page, value) {
    window.parent.postMessage(JSON.stringify({ function: 'changePageName', params: [page._id, value] }), '*')
  }

  config(page, event) {

    event.stopPropagation()
    this.ser.currentPage = page;
    window.parent.postMessage(JSON.stringify({ function: 'changePage', params: [page._id] }), '*')
    this.ser.showAllPages = false;
  }
  navigateLink(s, event) {
    event.stopPropagation()
    event.preventDefault()
    if (this.ser.builderMode)
      return
    this.router.navigate([this.ser.prefixUrlForHeader + s.page.url])
  }

  newPage(event) {
    event.stopPropagation()
    this.previewSer.newPage();
  }

}
