import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-save-changes-modal',
  templateUrl: './save-changes-modal.component.html',
  styleUrls: ['./save-changes-modal.component.scss']
})
export class SaveChangesModalComponent implements OnInit {

  constructor(public ser: DbService, public http: HttpService,
    public generalSer: GeneralActionsService, public router: Router) { }

  ngOnInit(): void {
  }
  modalRef: BsModalRef;

  close() {
    this.generalSer.modalRef.hide();
  }
  showAllSites() {
    this.ser.site.pages = []
    this.router.navigate(['/' + this.http.userName + '/myProjects']);

  }
  save(modal?) {
    this.generalSer.modalRef.hide();
    this.ser.saveFlag = false;
    this.ser.publishFlag = true;
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({
      function: 'saveSite',
      params: [true]
    }), '*')

  }
}
