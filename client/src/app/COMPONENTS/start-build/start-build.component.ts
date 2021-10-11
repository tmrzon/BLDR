import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { GridTemplate } from 'src/app/CLASSES/grid-template';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-start-build',
  templateUrl: './start-build.component.html',
  styleUrls: ['./start-build.component.scss']
})
export class StartBuildComponent implements OnInit {
  grids: number = 0;
  gridsTypes: Array<GridTemplate> = [];
  gridsTypes2: Array<GridTemplate> = [];
  assets = [];
  constructor(public ser: DbService, public builderSer: BuilderService, public http: HttpService) {
    for (let i = 0; i < 5; i++) {
      this.gridsTypes.push(DbService.gridTypes[i]);
    }
    for (let i = 5; i < 10; i++) {
      this.gridsTypes2.push(DbService.gridTypes[i]);
    }
  }

  ngOnInit(): void {
  }
  dragElement(value, value2?) {
    this.builderSer.dragElement(value)
  }
  dragimg(value, event) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'dragImg', params: [value, event] }), '*')
  }
  dragGridToCreate(gridType) {
    window.parent.postMessage(JSON.stringify({ function: 'dragGrid', params: [gridType] }), '*')
  }
  createGrid(gridType) {
    window.parent.postMessage(JSON.stringify({ function: 'createGrid', params: [gridType] }), '*')
  }

  getAssets() {
    this.http.getAllAssetsByType('page').subscribe(d => {

      this.assets = d.result;
    }, err => { })
  }
  statusBuilder(event, value) {
    event.stopPropagation()
    window.parent.postMessage(JSON.stringify({ function: 'openBuilderMenu', params: [value] }), '*')
  }
  close() {
    this.ser.showStartBuildComponent = false
  }

}
