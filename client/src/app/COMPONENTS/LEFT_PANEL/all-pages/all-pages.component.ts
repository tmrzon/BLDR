import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-all-pages',
  templateUrl: './all-pages.component.html',
  styleUrls: ['./all-pages.component.scss']
})
export class AllPagesComponent implements OnInit {

  options;
  maxIndex = 0;
  constructor(public ser: DbService, public http: HttpService,
    public router: Router, public generalSer: GeneralActionsService) {

    this.options = {
      onUpdate: (event: any) => {
        let oldIndex = event.oldIndex;
        let newIndex = event.newIndex;
        this.generalSer.changeIndexes(newIndex, oldIndex);
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeIndexes', params: [newIndex, oldIndex] }), '*')
      }
    };
  }
  ngOnInit(): void {
    this.ser.site.pages.forEach(p => {
      if (p.index > this.maxIndex)

        this.maxIndex = p.index;
    });
    this.maxIndex++;
  }
  load(page) {
    this.ser.currentPage = this.ser.site.pages.find(x => x._id == page._id) ? this.ser.site.pages.find(x => x._id == page._id) : this.ser.site.notFoundPage
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changePage', params: [page._id] }), '*')
    this.ser.showAllPages = false;
  }
  config(page) {
    this.ser.currentPage = page;
    this.ser.configuratorFlag = 'editPage'
    this.load(page)
  }

  newPage()
  {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'newPage', params: [] }), '*')
  }

}
