import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['../../../configurator/configurator.component.scss', './animations.component.scss']
})
export class AnimationsComponent implements OnInit {
  nameAnimate = 'Lightning';
  animationIterationCount = 'infinite'
  animate = 'fadeIn'
  animationDuration = '1s'
  @Output() changeStyles = new EventEmitter<any>();
  constructor(public ser: DbService, public configSer: ConfiguratorService) { }

  ngOnInit(): void {
  }
  showOverAnimate(nameAnimate, animationDuration, animationiterationCount, isMouseHover) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'showOverAnimate', params: [nameAnimate, animationDuration, animationiterationCount, isMouseHover] }), '*')
  }
  animateChanges(key, value) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'animateChanges', params: [key, value] }), '*')
  }
}
