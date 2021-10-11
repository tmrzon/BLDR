import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-global-widget',
  templateUrl: './global-widget.component.html',
  styleUrls: ['./global-widget.component.scss', '../../configurator/configurator.component.scss']
})
export class GlobalWidgetComponent implements OnInit {


  isGlobal = false;
  nameGlobalExists = false;
  globalName: any;

  constructor(public ser: DbService,) { }

  ngOnInit(): void {
    this.nameGlobalExists = false;
  }

  chekGlobalWidgetName(name) {
    this.globalName = name
    this.nameGlobalExists = this.ser.site.globalWidgetsName.find(g => g.name == name) ? true : false;
  }

  saveAsGlobalWidget(event) {

    let name = this.globalName
    if (this.nameGlobalExists || !name || name == '')
      return
    this.globalName = '';
    this.ser.lastItem.globalWidgetName = name;
    this.ser.lastItem.description = name;
    let obj = this.ser.lastItem.toServerObject();
    this.ser.site.globalWidgetsName.push({ 'name': name, 'object': obj });
    DbService.globalWidgets.push(this.ser.lastItem);
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'globalWidget', params: [name] }), '*')

  }

  single() {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'single' }), '*')
  }

  unlinkGlobal() {
    this.ser.lastItem.globalWidgetName = null;
    this.ser.lastItem.singleProperties = [];
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'removeFromGlobalWidgets' }), '*')
  }

}
