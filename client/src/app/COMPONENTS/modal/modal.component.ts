import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DbService } from 'src/app/SERVICES/db.service';
import { FrameService } from 'src/app/SERVICES/frame.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() type
  @Input() body
  @Input() submit
  modalRef: BsModalRef;

  constructor(public ser: DbService, public http: HttpService, public generalActionsSer: GeneralActionsService) {
   }

  ngOnInit(): void {

  }
  ngAfterViewInit() {

  }
  close() {
    this.generalActionsSer.modalRef.hide();
  }
}
