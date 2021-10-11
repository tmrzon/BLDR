import { Component, OnInit } from '@angular/core';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-c-col',
  templateUrl: './c-col.component.html',
  styleUrls: ['./c-col.component.scss', '../../configurator/configurator.component.scss']
})
export class CColComponent implements OnInit {
  kindOfBorder = 'solid ';
  kindOfBorderForm = 'solid ';
  constructor(public configuratorSer: ConfiguratorService, public ser: DbService, public builderSer: BuilderService, public generalActionsSer: GeneralActionsService) { }

  ngOnInit(): void {
  }
  changeStylesG(keys, value, actionType = 'style') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }

}
