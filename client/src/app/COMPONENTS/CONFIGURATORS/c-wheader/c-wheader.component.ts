import { Component, OnInit } from '@angular/core';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-c-wheader',
  templateUrl: './c-wheader.component.html',
  styleUrls: ['./c-wheader.component.scss', '../../configurator/configurator.component.scss']
})
export class CWHeaderComponent implements OnInit {
  kindOfBorder = 'solid ';
  constructor(public ser: DbService, public generalActionsSer: GeneralActionsService, public configuratorSer: ConfiguratorService) { }

  ngOnInit(): void {
  }
  changeStyles(name, value, value2?, value3?, event?) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStyles', params: [name, value, value2, value3, event] }), '*')
  }
  changeStylesG(keys, value, actionType = 'style') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }
}
