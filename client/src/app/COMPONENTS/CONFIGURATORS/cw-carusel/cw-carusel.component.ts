import { Component, OnInit } from '@angular/core';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-cw-carusel',
  templateUrl: './cw-carusel.component.html',
  styleUrls: ['./cw-carusel.component.scss', '../../configurator/configurator.component.scss']
})
export class CwCaruselComponent implements OnInit {
  kindOfBorderForm = 'solid ';
  flagTextShadow: boolean = false
  flagBoxShadow: boolean = false
  kindOfBorder = 'solid ';

  constructor(public configuratorSer: ConfiguratorService, public ser: DbService, public builderSer: BuilderService, public generalActionsSer: GeneralActionsService) {
  }

  ngOnInit(): void {
  }

  changeStylesG(keys, value, actionType = 'style') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }
  changeImageCarusel(img) {
    this.ser.imageCarusel = img
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'imageCarusel', params: [img] }), '*')
  }
  deleteImage(value1) {
    let index = this.ser.lastItem.attributes['items'].indexOf(value1)
    this.ser.lastItem.attributes['items'].splice(index, 1);
    // this.ser.lastChooseItem.attributes['items'] = ConfiguratorComponent.imageObject;
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'deleteImageCarusel', params: [index] }), '*')
  }

}
