import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/SERVICES/db.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import * as copy from 'copy-to-clipboard';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { FrameService } from 'src/app/SERVICES/frame.service';

@Component({
  selector: 'app-c-page',
  templateUrl: './c-page.component.html',
  styleUrls: ['./c-page.component.scss', '../../configurator/configurator.component.scss']
})
export class CPageComponent implements OnInit {
  modalBody;
  constructor(public ser: DbService, public router: Router, public http: HttpService, public generalActionsSer: GeneralActionsService, public configSer: ConfiguratorService, public frameSer: FrameService) {
  }

  ngOnInit(): void {
  }

  cretaeModalBody() {
    this.modalBody = `<p style="font-weight: bold;text-align: center;">Sure you want to delete <strong
style="color: chocolate;">`+ this.ser.currentPage.name + `</strong> ?</p>`

  }


  duplicatePage() {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'duplicatePage' }), '*')
  }

  protectPage(event) {
    event.preventDefault()
    if (event.target.checked) {
      this.ser.currentPage.permission = 'protected'
      this.ser.currentPage.enable = false
    }
    else {
      this.ser.currentPage.permission = 'public'
      this.ser.currentPage.enable = true
    }
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changePropertiesPage', params: ['permission', event.target.checked] }))
  }
  changePropertiesPage(type, value, event?) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changePropertiesPage', params: [type, value] }))
  }

  showGrid() {
    this.setsquareSize(12)
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'showGridLine', params: [this.ser.showGridLine] }), '*')
  }
  setsquareSize(size) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'setsquareSize', params: [size] }), '*')
  }
  copyLink(event) {

    copy(event.currentTarget.parentElement.childNodes[0].textContent);
  }


}
