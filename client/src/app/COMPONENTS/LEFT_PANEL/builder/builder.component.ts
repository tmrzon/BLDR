import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';
import { Item } from 'src/app/CLASSES/item';
import { GridTemplate } from 'src/app/CLASSES/grid-template';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { Section } from 'src/app/CLASSES/section';
import { Router } from '@angular/router';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
// import { type } from 'os';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { ModalImageComponent } from '../../modal-image/modal-image.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  providers: [NgbPopoverConfig],
  animations:GeneralActionsService.ngIfAnimations
})
export class BuilderComponent implements OnInit {
  img;
  flagImg: number = 0;
  flagUpload: boolean = false;
  modalRef: BsModalRef;
  grids = true;
  f = true;
  script = '<div><button id="d" style="color:red">d</button><script>console.log("Script added successfully");alert("hello")document.getElementById("d").style.color="red";document.getElementById("d").onclick=(event)=>{alert("hello")}</script></div>'
  gridsTypes: Array<GridTemplate> = [];
  @Output() openAllPages: EventEmitter<any> = new EventEmitter();
  @ViewChild('d') d
  @ViewChild('file') fileBrowser: ElementRef<any>;
  @ViewChild('scroller1') scroller: ElementRef;
  @ViewChild('images') images;
  show='widget'
  side=false
  lastWidgetCategory=''
  WidgetCategory
  searchText;
  myCategories = ['My global widgets','Typography', 'Media', 'Layout', 'Forms', 'More']
  searchText2;
  constructor(private sanitizer: DomSanitizer, public builderSer: BuilderService, private modalService: BsModalService, public ser: DbService, public http: HttpService, config: NgbPopoverConfig,
    public router: Router, private cd: ChangeDetectorRef, private san: DomSanitizer, public modalImg: ModalImageComponent, public generalActionsSer: GeneralActionsService) {
    this.gridsTypes = DbService.gridTypes;
    config.placement = 'left';
    config.triggers = 'hover';
  }
  ngOnInit() {

  }
  getLayers() {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'getElementsForLayers' }), '*')
  }
  dragElement(value, value2?) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'dragElement', params: [value, value2] }), '*')
  }
  dragimg(value, event) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'dragImg', params: [value, event] }), '*')
  }
  sideAnimate(type){
    if( this.lastWidgetCategory=='')
    {
      this.lastWidgetCategory=type
      this.WidgetCategory=type
    }
    else{
      this.lastWidgetCategory=this.WidgetCategory
      this.WidgetCategory=type
    }
  }
  statusBuilder(status, event) {
    event.stopPropagation()
    if (this.ser.builderStatus == status) {
      this.ser.builderStatus = ''
    }
    else {
      this.ser.builderStatus = status
    }
    if (status == 'widget') {
      this.grids = true
    }
  }

  insertImg(img, type) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'insertImg', params: [img, type] }), '*')
    let data = new Item();
    data.attributes['src'] = img;
  }
  showDragerElement(event, widget) {

    this.img = document.createElement('img')
    if (widget == 'h1')
      this.img.src = "assets/icons/1.svg"
    if (widget == 'p')
      this.img.src = "assets/icons/2.svg"
    if (widget == 'video')
      this.img.src = "assets/icons/4.svg"
    if (widget == 'img')
      this.img.src = "assets/icons/3.svg"
    if (widget == 'carousel')
      this.img.src = "assets/icons/Group 19573.svg"
    if (widget == 'counter')
      this.img.src = "assets/icons/Group 19571.svg"
    if (widget == 'button')
      this.img.src = "assets/icons/Group 21494.svg"
    if (widget == 'a')
      this.img.src = "assets/icons/Group 21492.svg"
    if (widget == 'lottie')
      this.img.src = "assets/icons/5.svg"
    if (widget == 'spacer')
      this.img.src = "assets/icons/6.svg"
    if (widget == 'hr')
      this.img.src = "assets/icons/7.svg"
    if (widget == 'html')
      this.img.src = "assets/icons/8.svg"
    if (widget == 'iframe')
      this.img.src = "assets/icons/Group 19535.svg"
    if (widget == 'accotdion')
      this.img.src = "assets/icons/Group 19535.svg"
    if (widget == 'slider')
      this.img.src = "assets/icons/Group 19535.svg"
    if (widget == 'form')
      this.img.src = "assets/icons/55.svg"
    if (widget == 'input')
      this.img.src = "assets/icons/Group 21582.svg"
    if (widget == 'textarea')
      this.img.src = "assets/icons/tag.svg"
    if (widget == 'dropdown')
      this.img.src = "assets/icons/sticky.svg"
    if (widget == 'checkbox')
      this.img.src = "assets/icons/Group 21584.svg"
    if (widget == 'radio')
      this.img.src = "assets/icons/Group 21583.svg"
    if (widget == 'One')
      this.img.src = "assets/icons/1al1.svg"
    if (widget == 'TwoRowOneCol')
      this.img.src = "assets/icons/Group 21579.svg"
    if (widget == 'OneRowTwoCol')
      this.img.src = "assets/icons/Group 21580.svg"
    if (widget == 'ThreeRowOneCol')
      this.img.src = "assets/icons/Group 21578.svg"
    if (widget == 'OneRowThreeCol')
      this.img.src = "assets/icons/Group 21577.svg"
    if (widget == 'TwoRowTwoCol')
      this.img.src = "assets/icons/Group 21575.svg"
    if (widget == 'FourRowOneCol')
      this.img.src = "assets/icons/Group 21576.svg"
    if (widget == 'OneRowFourCol')
      this.img.src = "assets/icons/Group 21574.svg"
    if (widget == 'ThreeRowThreeCol')
      this.img.src = "assets/icons/Group 21573.svg"
    if (widget == 'ThreeRowFourCol')
      this.img.src = "assets/icons/Group 21572.svg"
    event.dataTransfer.setDragImage(this.img, 0, 0)
  }
  createElement(tagName) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'createElement', params: [tagName] }), '*')
  }
  addQuestion(type) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'addQuestion', params: [type] }), '*')
  }
  chooseNoImg(noImg, event) {
    if (noImg == 0) {
      event.currentTarget.parentNode.children[2].click()
      noImg = this.builderSer.flagNumberImg
      this.flagUpload = true;
    }
    this.builderSer.flagNumberImg = noImg;
    if (noImg)
      this.ser.flagToButton = true;
  }
  setFlagImg() {
    this.builderSer.flagNumberImg = 3
  }
  dragGridToCreate(gridType) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'dragGrid', params: [gridType] }), '*')
  }
  createGrid(gridType) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'createGrid', params: [gridType] }), '*')
  }
  allPages() {
    this.ser.allPagesMode = true;
    this.ser.showAllPages = true;
    this.openAllPages.emit(true);
  }

  chooseSectionCategory(category) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify(
      { function: 'createSection' }
    ), '*')
    this.ser.lastCategory = category;
    this.http.getSectionsByCategoryId(category._id).subscribe(data => {
      this.ser.sectionsListByCategory = [];
      data.result.forEach(s => {
        this.ser.sectionsListByCategory.push(Section.fromServerObject(s));
      });
    }, err => { })
  }

}