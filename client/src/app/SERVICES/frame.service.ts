import { HostListener, Injectable } from '@angular/core';
import { Page } from '../CLASSES/page';
import { DbService } from './db.service';
import { HttpService } from './http-ser.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Stack } from '../CLASSES/stack';
import { GeneralActionsService } from './general-actions.service';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  modalRef: BsModalRef;

  constructor(public ser:DbService,private http: HttpService, public generalActionsSer: GeneralActionsService) { }

  deletePage() {
    this.ser.deletePageLoader = false
    this.http.deletePage(this.ser.currentPage._id).subscribe(data => {
      this.ser.deletePageLoader = true
      this.generalActionsSer.removePageOfSite(data.result);
      this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'removePage', params: [data.result] }), '*')
      this.generalActionsSer.close()
    }, err => {
      return
    });
  }

  saveAsDraft(allSites?) {
    this.ser.saveFlag = false;
    this.ser.publishFlag = true;
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({
      function: 'saveSite',
      params: [allSites]
    }), '*')
  }

  @HostListener('document:click')
  closeBuilder() {
    window.blur()
    if (this.ser.builderStatus != '')
      this.ser.builderStatus = ''
  }
}
