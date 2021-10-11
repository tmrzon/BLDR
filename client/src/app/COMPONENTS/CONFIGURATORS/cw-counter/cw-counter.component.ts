import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-cw-counter',
  templateUrl: './cw-counter.component.html',
  styleUrls: ['./cw-counter.component.scss', '../../configurator/configurator.component.scss']
})
export class CwCounterComponent implements OnInit {

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
  // changeStyles(name, value, value2?, value3?, event?) {
  //   if (value3 == 'range') {
  //     let half = ((value2 - event.target.min) / (event.target.max - event.target.min)) * 100
  //     event.target.style.background = 'linear-gradient(to right, #fbcd4f 0%, #fbcd4f ' + half + '%, #fff ' + half + '%, white 100%)'
  //   }
  //   this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStyles', params: [name, value, value2, value3, event] }), '*')
  // }
  changeContent(content) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeContent', params: [content] }), '*')
  }
  saveContentPrev() {
    this.contentPrev = this.ser.lastItem.textContent && this.ser.lastItem.textContent.value ? new FormControl(this.ser.lastItem.textContent.value) : new FormControl()
  }
  animateChanges(key,value){
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'animateChanges', params: [key, value] }), '*')
  }
  changeStylesG(keys, value, actionType = 'style',specialAttribute='simple') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType,specialAttribute] }), '*')
  }

  isEdit() {
    this.lock = !this.lock
  }

}
