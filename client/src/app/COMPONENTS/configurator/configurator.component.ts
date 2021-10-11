
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { CategorySection } from 'src/app/CLASSES/category-section';
import { Router } from '@angular/router';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { QuestionService } from 'src/app/SERVICES/FORM/question.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {
  nameGlobalExists = false;
  category: CategorySection;
  maxIndex=0;
  fly:boolean=false
  drag:boolean=false
  @ViewChild('file') fileBrowser: ElementRef<any>;
  @ViewChild('buttonOpenModal') buttonOpenModal: ElementRef<any>;
  globalName: any;
  constructor(public ser: DbService, public http: HttpService, public cd: ChangeDetectorRef, public configSer: ConfiguratorService,
    public router: Router, public generalActionsSer: GeneralActionsService, public builderSer: BuilderService, public qs: QuestionService) {


  }
  ngOnInit(): void {
    this.configSer.buttonOpenModal = this.buttonOpenModal
    this.ser.site.pages.forEach(p => {
      if (p.index > this.maxIndex)
        this.maxIndex = p.index;
    });
    this.maxIndex++;
    let item;
    if (this.ser.whatLast == 'col')
      item = this.ser.lastCol;
    else
      item = this.ser.lastCol;
    this.nameGlobalExists = false;
  }
  dragConfigurator(event,back?) {
    if(back){
      this.fly=true
      setTimeout(() => {
        this.ser.configuratorDragRight = 0;
      this.ser.configuratorDragTop = 60;
      this.drag=false
      }, 500);
      return
    }
    this.fly=false
    this.drag=true
    let screenWidthPx = this.generalActionsSer.vwTOpx(100);
    let screenHeightPx = this.generalActionsSer.vhTOpx(100);
    let tempRight = this.ser.configuratorDragRight
    this.ser.configuratorDragRight = screenWidthPx - (event.clientX);
    this.ser.configuratorDragTop = (event.clientY < 60) ? event.clientY + 60 : event.clientY;
    this.ser.configuratorDragMaxHeight = this.generalActionsSer.pxTOvh((event.clientY < 60) ? (screenHeightPx - event.clientY - 60) : (screenHeightPx - event.clientY));
    if (tempRight != 0 && this.generalActionsSer.pxTOvw(this.ser.configuratorDragRight) < 13) {
      this.ser.configuratorDragRight = 0;
      this.ser.configuratorDragTop = 60;
      this.drag=false
    } else
      this.ser.configuratorDragRight = this.generalActionsSer.pxTOvw(this.ser.configuratorDragRight)
  }
  dragConfiguratorImg(event) {
    event.dataTransfer.setDragImage(event.currentTarget.parentNode.parentNode, event.clientX - event.currentTarget.getClientRects()[0].x, event.clientY - event.currentTarget.getClientRects()[0].y)
  }

  downloadSite() {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'downloadSite' }), '*')
  }
  saveTemplate(type) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'saveTemplate', params: [type] }), '*')
  }
 
  chekGlobalWidgetName(name) {
    this.globalName = name
    this.nameGlobalExists = this.ser.site.globalWidgetsName.find(g => g.name == name) ? true : false;
  }




  unlinkGlobal() {
    this.ser.lastItem.globalWidgetName = null;
    this.ser.lastItem.singleProperties = [];
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'removeFromGlobalWidgets' }), '*')
  }
}


