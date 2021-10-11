import { Component, OnInit, Query } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-cw-text',
  templateUrl: './cw-text.component.html',
  styleUrls: ['./cw-text.component.scss', '../../configurator/configurator.component.scss']
})
export class CwTextComponent implements OnInit {
  flagTextShadow: boolean = false
  flagBoxShadow: boolean = false
  typeAnimate = 'Lightning';
  kindOfBorder = 'solid ';
  kindOfBorderForm = 'solid ';
  style = { 'background-color': '#ffffff' }
  isLink: boolean = false
  contentPrev;

  constructor(public ser: DbService) { }

  ngOnInit(): void {
  }
  animateChanges(key, value) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'animateChanges', params: [key, value] }), '*')
  }
  changeStylesG(keys, value, actionType = 'style') {
    debugger
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }
  changeContent(content) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeContent', params: [content] }), '*')
  }

  saveContentPrev() {

    this.contentPrev = this.ser.lastItem.textContent
  }
}
