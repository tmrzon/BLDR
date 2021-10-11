import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-cw-accordion',
  templateUrl: './cw-accordion.component.html',
  styleUrls: ['./cw-accordion.component.scss', '../../configurator/configurator.component.scss']
})
export class CwAccordionComponent implements OnInit {

  flagTextShadow: boolean = false
  flagBoxShadow: boolean = false
  typeAnimate = 'Lightning';
  kindOfBorder = 'solid ';
  kindOfBorderForm = 'solid ';
  style = { 'background-color': '#ffffff' }
  isLink: boolean = false
  lock: boolean = true
  contentPrev;
  showMoreQ: boolean = false

  constructor(public ser: DbService) { }

  ngOnInit(): void {
  }

  changeContent(content) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeContent', params: [content] }), '*')
  }

  saveContentPrev() {
    this.contentPrev = this.ser.lastItem.textContent && this.ser.lastItem.textContent.value ? new FormControl(this.ser.lastItem.textContent.value) : new FormControl()
  }
  changeStylesG(keys, value, actionType = 'style',specialAttribute='simple') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType,specialAttribute] }), '*')
  }
  deleteItem(qes) {
    let index = this.ser.lastItem.attributes['accordion'].indexOf(qes)
    this.ser.lastItem.attributes['accordion'].splice(index, 1);
    // this.ser.lastChooseItem.attributes['items'] = ConfiguratorComponent.imageObject;
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'deleteQuestion', params: [index] }), '*')
  }
  animate(type) {
    switch (type) {
      case 'fadeIn': this.typeAnimate = 'fadeIn'
        break;
      case 'Wave': this.typeAnimate = 'wave'
        break;
      case 'None': this.typeAnimate = 'None'
        break;
      case 'Lightning': this.typeAnimate = 'lightning'
        break;
      case 'Electricy': this.typeAnimate = 'electricity'
        break;
      case 'color': this.typeAnimate = 'colors'
        break;

    }
  }

  isEdit() {
    this.lock = !this.lock
  }

}
