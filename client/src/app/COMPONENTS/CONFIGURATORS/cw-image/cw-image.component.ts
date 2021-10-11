import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-cw-image',
  templateUrl: './cw-image.component.html',
  styleUrls: ['./cw-image.component.scss', '../../configurator/configurator.component.scss']
})
export class CwImageComponent implements OnInit {
  flagBoxShadow: boolean = false
  kindOfBorder = 'solid ';
  kindOfBorderForm = 'solid ';
  typeAnimate = 'Lightning';
  style = { 'background-color': '#ffffff' }
  isLink: boolean = false
  lock: boolean = true
  @ViewChild('input[type="range"') range

  constructor(public configuratorSer: ConfiguratorService, public ser: DbService, public builderSer: BuilderService, public generalActionsSer: GeneralActionsService) { }

  ngOnInit(): void {
  }
  changeStylesG(keys, value, actionType = 'style') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }
  animateChanges(key,value){
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'animateChanges', params: [key, value] }), '*')
  }
  isEdit() {
    this.lock = !this.lock
  }

}
