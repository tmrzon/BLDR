import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-cw-link',
  templateUrl: './cw-link.component.html',
  styleUrls: ['./cw-link.component.scss', '../../configurator/configurator.component.scss']
})
export class CwLinkComponent implements OnInit {
  flagTextShadow: boolean = false
  flagBoxShadow: boolean = false
  typeAnimate = 'Lightning';
  kindOfBorder = 'solid ';
  kindOfBorderForm = 'solid ';
  style = { 'background-color': '#ffffff' }
  isLink: boolean = false
  lock: boolean = true
  contentPrev;

  constructor(public ser: DbService) { }

  ngOnInit(): void {
  }
  animateChanges(key,value){
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'animateChanges', params: [key, value] }), '*')
  }
  changeContent(content) {

    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeContent', params: [content] }), '*')
  }
  changeStylesG(keys, value, actionType = 'style') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }
  saveContentPrev() {

    this.contentPrev = this.ser.lastItem.textContent && this.ser.lastItem.textContent.value ? new FormControl(this.ser.lastItem.textContent.value) : new FormControl()
  }
  isEdit() {
    this.lock = !this.lock
  }
}
