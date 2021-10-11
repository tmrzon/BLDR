import { Component, OnInit } from '@angular/core';
import { ActionsHistoryService } from 'src/app/SERVICES/actions-history.service';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-actions-history',
  templateUrl: './actions-history.component.html',
  styleUrls: ['./actions-history.component.scss']
})
export class ActionsHistoryComponent implements OnInit {
  constructor(public ser: DbService,public historySer:ActionsHistoryService) {
  }

  ngOnInit(): void {
  }

  temp(action) {
    action.style['color'] == 'white' ? this.actionRecovery('undo', action) : this.actionRecovery('redo', action)
  }

  actionRecovery(recovery, action?) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'actionRecovery', params: [recovery, action.toServerObject()] }), '*')
  }
}
