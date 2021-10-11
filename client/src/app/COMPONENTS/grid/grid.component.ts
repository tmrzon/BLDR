

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ElementRef, HostListener } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';
import { Row } from 'src/app/CLASSES/row';
import { Item } from 'src/app/CLASSES/item';
import { Col } from 'src/app/CLASSES/col';
import { Action } from 'src/app/CLASSES/action';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { FormControl } from '@angular/forms';
import { QuestionService } from 'src/app/SERVICES/FORM/question.service';
import { QuestionControlService } from 'src/app/SERVICES/FORM/question-control.service';
import { AlertService } from 'src/app/SERVICES/alert.service';
import { PreviewService } from 'src/app/SERVICES/preview.service';
import { Section } from 'src/app/CLASSES/section';
import { ResizeEvent } from 'angular-resizable-element';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { ActionsHistoryService } from 'src/app/SERVICES/actions-history.service';
import { PreviewComponent } from '../preview/preview.component';


declare let $;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']//
})
export class GridComponent implements OnInit {
  @Input()
  selectDate: (date: NgbDateStruct) => void;
  @Output() showAlert: EventEmitter<any> = new EventEmitter<any>()
  model: NgbDateStruct;
  newUrl
  caretOffset
  img
  newUrlName
  moreOptionsX = '0px'
  moreOptionsY = '0px'
  option: number = 0;
  indexSlider: number = 0
  @Input() item: Item
  _startSeconds
  @Input() icon = "arrow";
  @ViewChild("el", { read: ElementRef }) el: ElementRef;
  faq: any = [
    { 'question': 'one', 'answer': 'Sentence 1' },
  ];
  public lottieConfig: Object;
  rows: Array<Row> = [];
  _colOfItem: Col;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "dots": true,
    "infinite": true
  };
  prevent = false;
  plus: boolean = false;
  showGridBorders = false;
  presses = '';
  contentPrev;
  showMenu = false;
  value: number = 0;
  flagSlide: boolean = false
  builderMode = true;
  @ViewChild('file') fileBrowser;
  itemToChangeImage: Item;
  get colOfItem(): Col {
    return this._colOfItem;
  }
  @Input() set colOfItem(value: Col) {
    this._colOfItem = value;
    this.cd.detectChanges();
  }
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(public ser: DbService, private cd: ChangeDetectorRef, public generalAction: GeneralActionsService,
    private http: HttpService, private calendar: NgbCalendar, private router: Router, public previewSer: PreviewService,
    public builderSer: BuilderService, public configSer: ConfiguratorService, public qs: QuestionService,
    public qcs: QuestionControlService, protected alertService: AlertService, public historySer: ActionsHistoryService) {
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    if (window.location.pathname.search('livePreview') != -1)
      this.ser.prefixUrlForHeader = '/' + this.http.userName + '/livePreview/'
    this.builderMode = this.ser.builderMode;
    this.rows = this.item.rows;
  }
  CheckIfMainGrid(obj) {
    if (obj)
      return Object.getOwnPropertyNames(obj).includes('pageId')
    return false
  }
  navigate(url, target, event) {
    event.preventDefault();
    if (!this.ser.builderMode) {
      var regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
      var test = regex.test(url)
      if (test)
        window.open(url, target);
      else {
        let helpUrl = window.location.pathname.split('/');
        this.newUrl = helpUrl[1]
        for (let i = 2; i < helpUrl.length; i++) {
          if (i != helpUrl.length - 1)
            this.newUrl += '/' + helpUrl[i]
          else {
            let page = url.split(' ')
            this.newUrlName = page[0]
            for (let i = 1; i < page.length; i++)
              this.newUrlName += page[i]
            this.newUrl = this.newUrl + '/' + this.newUrlName
          }
        }
        window.open(this.newUrl, target);
      }
    }
  }
  showColOptions(col, event) {
    event.stopPropagation()
    col.isColOptions = true
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
    if (widget == 'grid')
      this.img.src = "assets/icons/Group 21573.svg"
    event.dataTransfer.setDragImage(this.img, 0, 0)
  }
  onDragElement(event, itemToDrop: Item, col: Col, type) {
    if (!this.ser.builderMode)
      return
    this.ser.draggedItem = {
      element: event.target,
      item: itemToDrop,
      colToEmpty: col,
      type: type
    };
    this.ser.checkBorder = true;
    if (itemToDrop.tagName == 'grid') {
      itemToDrop.showGridBorders = true;
      event.dataTransfer.setDragImage(event.currentTarget.parentNode.parentNode, 0, 0)
    }
    event.stopPropagation();
    this.ser.moreOptions = false;
    this.ser.moreOptions2 = false
    this.ser.moreOptions3 = false
  }
  overGrid(event) {
    this.item.overGrid = true;
    event.stopPropagation()
  }
  toggleHelper(event) {
    event.target.classList.toggle("active");
    const panel = event.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  saveContentPrev() {

    if (!this.ser.lastItem) { }
    this.contentPrev = this.ser.lastItem.textContent
  }
  onReady(e): void {
    console.log(e, 'its ready')
  }
  getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    }
    return caretPos;
  }

  changeImage(event) {
    let action = new Action();
    action.name = 'change';
    action.theObject = this.itemToChangeImage;
    action.whatChange = 'src';
    action.previous = this.itemToChangeImage.attributes['src'];
    this.http.uploadImage(event.target.files[0]).subscribe(
      d => {
        this.itemToChangeImage.attributes['src'] = d.url;
        console.log('upload file secceeded', d)
        action.whatChange = 'src';
        action.current = d.url;
      },
      e => console.log(e)
    )
    event.target.value = '';
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
  }

  showStartBuildComponent(item: Item) {
    this.ser.indexToInsertItem = item.index + 1
    this.ser.showStartBuildComponent = true
  }
  showLocationToDrop(item: Item, event) {
    event.stopPropagation()
    debugger
    if (this.ser.lastItemUnderDrag)
      this.ser.lastItemUnderDrag.underDrag = false
    item.underDrag = true
    this.ser.indexToInsertItem = item.index + 1;
    this.ser.lastItemUnderDrag = item
  }
  hidePreviousLocationToDrop(item: Item) {
    item.underDrag = false
  }
  hideBorder(event, item) {
    event.stopPropagation()
    if (!this.ser.builderMode)
      return
    if (!this.ser.finishedDrag)
      return;
    if (event.currentTarget) {
      event.currentTarget.classList.remove('generalAction.showBorder')
      if (!event.currentTarget.classList.contains('edit'))
        event.currentTarget.classList.add('transparentBorder')
    }
  }
  onResizeEnd(event: ResizeEvent, colToResize: Col, gridElement): void {
    console.log('Element was resized', event);
    let part = gridElement.offsetWidth / 12
    let colSize = Math.round((Number(event.rectangle.right) - Number(event.rectangle.left)) / part)
    if (colSize < 1)
      colSize = 1
    else
      if (colSize > 12)
        colSize = 12
    let action = new Action();
    action.name = 'change';
    action.theObject = colToResize;
    action.whatChange = 'properties';
    action.description = 'change the width of Tile';
    action.previous = { 'class': colToResize.attributes['class'] };
    let clazz = 'col-'
    if (this.ser.statusScreen == 'desktop')
      clazz += 'lg-'
    else
      if (this.ser.statusScreen == 'tablet')
        clazz += 'md-'
    if (colToResize.attributes['class'].includes('col-')) {
      let index = colToResize.attributes['class'].lastIndexOf(clazz)
      if (index != -1) {
        let partialStr = colToResize.attributes['class'].slice(index)
        partialStr = partialStr.split(' ')[0]
        var str = colToResize.attributes['class'].replace(partialStr, '');
        colToResize.attributes['class'] = str;
      }
    }
    clazz += colSize
    colToResize.attributes['class'] += ' ' + clazz
    action.current = { 'class': colToResize.attributes['class'] };
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }

  checkIfColInsideGrid(col, grid) {
    for (let i = 0; i < grid.rows.length; i++)
      for (let j = 0; j < grid.rows[i].cols.length; j++) {
        if (col == grid.rows[i].cols[j])
          return true
        for (let k = 0; k < grid.rows[i].cols[j].items.length; k++)
          if (this.checkIfColInsideGrid(col, grid.rows[i].cols[j].items[k]))
            return true
      }
    return false
  }

  dropCol(containerCol: Col) {
    let action = new Action();
    action.name = 'drop';
    action.theObject = this.ser.draggedCol.col;
    action.previous = this.ser.draggedCol.col.parentRow;
    action.divStylePrev = this.ser.draggedCol.col.index;
    this.previewSer.deleteCol(this.ser.draggedCol.col)
    this.ser.draggedCol.col.parentRow = containerCol.parentRow;
    action.whatChange = 'Tile';
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }
  addSection(copy?) {
    let newSection = new Section(0, 'hhj',
      '', '');
    newSection.pageId = this.ser.currentPage._id;
    newSection.index = this.ser.currentPage.sections.length;
    this.ser.currentPage.sections.push(newSection);
    let action = new Action();
    action.name = 'add';
    action.whatChange = 'Section';
    action.theObject = newSection;
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    this.ser.lastItem = newSection;
    this.ser.whatLast = newSection.name;
    this.ser.elementSelected = true;
    if (copy)
      return (newSection)
  }
  onDropElement(ev, col: Col) {
    debugger
    if (!this.ser.builderMode)
      return
    ev.stopPropagation();
    ev.preventDefault();
    this.ser.lastItemUnderDrag.underDrag = false
    if (this.ser.draggedCol) {
      this.dropCol(col)
      this.ser.draggedCol = null
      return
    }
    let action = new Action();
    action.name = 'drop';
    if (this.builderSer.dragerElement) {
      action.theObject = this.builderSer.dragerElement;
      action.previous = this.builderSer.dragerElement.parentCol;
      action.divStylePrev = Object.assign({}, this.builderSer.dragerElement.index);
      action.whatChange = this.builderSer.dragerElement.description;
      this.ser.lastCol = col;
      if (!this.builderSer.droped)
        this.builderSer.createElement(this.builderSer.dragerElement, this.builderSer.imgDrag, true)
      this.builderSer.dragerElement = ''
      return
    }
    if (this.builderSer.dragerGrid) {
      this.ser.lastCol = col;
      if (!this.builderSer.dropedGrid)
        this.builderSer.createGrid(this.builderSer.dragerGrid)
      this.builderSer.dragerGrid = ''
      return
    }
    if (this.builderSer.dragerImg) {
      this.ser.lastCol = col;
      action.theObject = this.builderSer.dragerImg;
      action.previous = this.builderSer.dragerImg.parentCol;
      action.divStylePrev = this.builderSer.dragerImg.index;
      action.whatChange = this.builderSer.dragerImg.description;
      if (!this.builderSer.dropedImg)
        this.builderSer.insertImg(this.builderSer.dragerImg, 'createImg', true)
      this.builderSer.dragerImg = ''
      return
    }
    if (this.ser.draggedItem.item.tagName == 'grid') {
      if (this.checkIfColInsideGrid(col, this.ser.draggedItem.item)) {
        this.alertService.error('You cannot drop grid inside itself.', this.options)
        return
      }
    }
    let it = this.ser.draggedItem.item.toServerObject()
    let itm = Item.fromServerObject(it, col)
    itm.index = this.ser.indexToInsertItem
    itm.parentCol = col
    action.theObject = itm;
    action.previous = this.ser.draggedItem.colToEmpty;
    action.divStylePrev = itm.index;
    action.whatChange = itm.description;
    let itemToDelete = this.ser.draggedItem.colToEmpty.items.findIndex(i => i == this.ser.draggedItem.item)
    this.ser.draggedItem.colToEmpty.items.splice(itemToDelete, 1);
    this.ser.draggedItem.colToEmpty.items.forEach(i => {
      i.index = this.ser.draggedItem.colToEmpty.items.indexOf(i)
    });
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }
  dragCol(col, event) {
    event.stopPropagation()
    this.ser.draggedCol = {
      col
    }
  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  updateSetting(event) {
    this.flagSlide = true
    this.value = event.value;
  }
  dblClickImg(it, template?) {
    this.itemToChangeImage = it;
    clearTimeout(this.generalAction.timer);
    this.prevent = true;
    window.parent.postMessage(JSON.stringify({ function: 'openModal', params: [] }), '*')
  }
  mouseOut(event, attributes = []) {
    if (attributes.find(a => a.name == 'transform') != undefined) {
      event.target.style.transform = 'scale(1)';
    }
  }
  deleteItem(grid?) {
    let item;
    if (grid)
      item = grid;
    else
      item = this.ser.lastItem;
    let removeAction = new Action();
    removeAction.name = 'remove';
    removeAction.whatChange = item.tagName == 'grid' ? 'Grid' : item.description;
    removeAction.theObject = item;
    this.historySer.prevStack.push(removeAction);
    this.historySer.nextStack.clearStack();
    let col = item.parentCol;
    col.items.splice(col.items.indexOf(item), 1);
    col.items.forEach(i => {
      if (i.index != col.items.indexOf(i))
        i.index = col.items.indexOf(i);
    });
    this.ser.lastCol = col
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }
  duplicateSection(section) {
    let newSection = this.addSection('copy')
    let sec = section.item.toServerObject();
    newSection.item = Item.fromServerObject(sec, newSection)
  }
  copyItem() {
    let data = new Item();
    data = this.ser.lastItem.copyObject(this.ser.lastItem.parentCol);
    let action = new Action();
    data.index = this.ser.lastCol.items.length;
    data.parentCol = this.ser.lastCol;
    action.name = 'copy';
    action.theObject = data;
    action.whatChange = data.description;
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    this.ser.lastItem = data;
    this.ser.whatLast = data.tagName;
    this.ser.elementSelected = true;
    this.ser.stylesToConfig = data.styles;
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }
}

