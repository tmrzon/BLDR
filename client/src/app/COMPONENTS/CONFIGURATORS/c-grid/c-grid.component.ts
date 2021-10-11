import { Component, OnInit } from '@angular/core';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-c-grid',
  templateUrl: './c-grid.component.html',
  styleUrls: ['./c-grid.component.scss', '../../configurator/configurator.component.scss']
})
export class CGridComponent implements OnInit {
  kindOfBorder = 'solid ';
  kindOfBorderForm = 'solid ';
  constructor(public configuratorSer: ConfiguratorService, public ser: DbService, public builderSer: BuilderService, public generalActionsSer: GeneralActionsService) { }

  ngOnInit(): void {
  }
  changeStylesG(keys, value, actionType = 'style',specialAttribute='simple') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType,specialAttribute] }), '*')
  }
}
