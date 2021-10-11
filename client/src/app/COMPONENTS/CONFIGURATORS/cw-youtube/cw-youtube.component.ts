import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-cw-youtube',
  templateUrl: './cw-youtube.component.html',
  styleUrls: ['./cw-youtube.component.scss', '../../configurator/configurator.component.scss']
})
export class CwYoutubeComponent implements OnInit {
  kindOfBorder = 'solid ';
  kindOfBorderForm = 'solid ';
  style = { 'background-color': '#ffffff' }
  isLink: boolean = false
  lock: boolean = true
  contentPrev;
  constructor(public ser: DbService) { }

  ngOnInit(): void {
  }

  changeContent(content) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeContent', params: [content] }), '*')
  }

  saveContentPrev() {

    this.contentPrev = this.ser.lastItem.textContent && this.ser.lastItem.textContent.value ? new FormControl(this.ser.lastItem.textContent.value) : new FormControl()
  }
  changeStylesG(keys, value, actionType = 'style') {
    if (keys == 'youTubeControls' || keys == 'youtubeAutoPlay') {
      if (value == true)
        value = 1
      else
        value = 0
      // if (value2 == true)
      //   value2 = 1
      // else
      //   value2 = 0
    }
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }
  isEdit() {

    this.lock = !this.lock
  }
}
