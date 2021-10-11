import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Site } from 'src/app/CLASSES/site';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-create-site-modal',
  templateUrl: './create-site-modal.component.html',
  styleUrls: ['./create-site-modal.component.scss']
})
export class CreateSiteModalComponent implements OnInit {

  closeResult = ''
  siteType = ''
  flagStatus: number = 1;
  constructor(private modalServiceBotstrap: NgbModal, public modalService: BsModalService, public generalSer: GeneralActionsService, public ser: DbService, public router: Router, public http: HttpService) { }

  ngOnInit(): void {
  }

  open(content) {
    this.ser.siteNameExist = false
    this.modalServiceBotstrap.open(content, { ariaLabelledBy: 'modal-basic-title', size: "dialog-centered" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
