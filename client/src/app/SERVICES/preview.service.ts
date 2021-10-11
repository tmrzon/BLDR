import { Injectable, TemplateRef } from '@angular/core';
import { Col } from '../CLASSES/col';
import { Item } from '../CLASSES/item';
import { DbService } from './db.service';
import { HttpService } from './http-ser.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeneralActionsService } from './general-actions.service';
import { Page } from '../CLASSES/page';
import { Site } from '../CLASSES/site';
import { Action } from '../CLASSES/action';
import { ActionsHistoryService } from './actions-history.service';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(public ser: DbService, private http: HttpService, private httpService: HttpClient,
    public generalSer: GeneralActionsService, public historySer: ActionsHistoryService) { }

  ngOnInit() { }

  chooseElement(event, selectedItem: Item) {
    debugger
    if (!this.ser.builderMode)
      return
    if (event && event.target.classList.contains('demoQuill'))
      return
    this.ser.ifSingleWidget = false;
    let main = this.ser.CheckIfMainGrid(selectedItem.parentCol)
    window.parent.postMessage(JSON.stringify({ function: 'closeBuilder' }), '*')
    window.parent.postMessage(JSON.stringify({ function: 'loadItemToConfigurator', params: [selectedItem.tagName, selectedItem.toServerObject(), main] }), '*')
    this.ser.whatLast = selectedItem.tagName;
    selectedItem.chooseElement = true
    if (selectedItem.tagName == 'header') {
      this.ser.lastItem = selectedItem
      return
    }
    if (selectedItem.tagName != 'grid') {
      selectedItem.parentCol.chooseCol = true
      selectedItem.parentCol.isColOptions = false
      selectedItem.parentCol.parentRow.parentItem.chooseElement = true//parent grid
    }
    if (this.ser.lastItem && this.ser.lastItem != selectedItem) {
      this.ser.lastItem.chooseElement = false
      this.ser.lastItem.lightBorder = false
    }
    this.ser.lastItem = selectedItem
    if (this.ser.lastCol && this.ser.lastCol != selectedItem.parentCol) {
      this.ser.lastCol.chooseCol = false
      this.ser.lastCol.isColOptions = false
    }
    if (Object.getOwnPropertyNames(selectedItem.parentCol).includes('pageId')) {
      this.ser.lastCol = selectedItem.rows[0].cols[0];
    }
    else {
      this.ser.lastCol = selectedItem.parentCol;

    }
    if (this.ser.lastChooseGrid && (Object.getOwnPropertyNames(selectedItem.parentCol).includes('pageId') || this.ser.lastChooseGrid != selectedItem.parentCol.parentRow.parentItem)) {
      this.ser.lastChooseGrid.chooseElement = false
    }
    if (selectedItem.tagName == 'grid') {
      this.ser.lastChooseGrid = selectedItem
      selectedItem.chooseElement = true
      this.ser.lastItem = null
    }
    else
      this.ser.lastChooseGrid = selectedItem.parentCol.parentRow.parentItem

    if (event) {
      event.stopPropagation();
      this.generalSer.changeBorderByBackground(event, selectedItem);
    }
    this.ser.moreOptions3 = this.ser.moreOptions2 = this.ser.moreOptions = this.ser.moreOptions4 = false
  }

  chooseCol(event, selectedCol: Col, isGrid?) {
    if (!this.ser.builderMode)
      return
    window.blur()
    if (window.getSelection)
      window.getSelection().removeAllRanges()

    if (Object.getOwnPropertyNames(selectedCol.parentRow.parentItem.parentCol).includes('pageId')) {
      this.chooseElement(event, selectedCol.parentRow.parentItem)
      return
    }
    window.parent.postMessage(JSON.stringify({ function: 'closeBuilder' }), '*')
    if (!isGrid) {
      window.parent.postMessage(JSON.stringify({ function: 'loadColToConfigurator', params: [selectedCol.toServerObject()] }), '*')
    }

    this.ser.whatLast = 'col';
    selectedCol.chooseCol = true
    selectedCol.isColOptions = false
    selectedCol.parentRow.parentItem.chooseElement = true//parent grid
    if (this.ser.lastItem) {
      this.ser.lastItem.chooseElement = false
      this.ser.lastItem.lightBorder = false
    }
    if (this.ser.lastCol && this.ser.lastCol != selectedCol) {
      this.ser.lastCol.chooseCol = false
      this.ser.lastCol.isColOptions = false
    }
    this.ser.lastCol = selectedCol

    if (this.ser.lastChooseGrid && this.ser.lastChooseGrid != selectedCol.parentRow.parentItem) {
      this.ser.lastChooseGrid.chooseElement = false
    }
    this.ser.lastChooseGrid = selectedCol.parentRow.parentItem
    if (event)
      event.stopPropagation();
  }

  editGrid(grid, event?) {
    if (event)
      event.stopPropagation()
    window.parent.postMessage(JSON.stringify({ function: 'loadItemToConfigurator', params: [grid.tagName, grid.toServerObject()] }), '*')
  }

  deleteItem(event, grid?) {
    event.stopPropagation()
    let item;
    if (grid)
      item = grid;
    else
      item = this.ser.lastItem;
    //save remove action
    let removeAction = new Action();
    removeAction.name = 'remove';
    removeAction.whatChange = item.tagName == 'grid' ? 'Grid' : item.description;
    removeAction.theObject = item;
    this.historySer.prevStack.push(removeAction);
    //empty the nextStack
    this.historySer.nextStack.clearStack();
    let col = item.parentCol;
    // let index=col.items.findIndex(item)
    col.items.splice(col.items.indexOf(item), 1);
    col.items.forEach(i => {
      if (i.index != col.items.indexOf(i))
        i.index = col.items.indexOf(i);
    });
    this.ser.lastCol = col
    let i = DbService.globalWidgets.indexOf(item);
    DbService.globalWidgets.splice(i, 1);
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }

  copyCol() {
    let data = new Col();
    data = Col.fromServerObject(this.ser.lastCol.toServerObject(), null)
    let action = new Action();
    data.index = this.ser.lastCol.parentRow.cols.length;
    data.parentRow = this.ser.lastCol.parentRow;
    action.name = 'copy';
    action.theObject = data;
    action.whatChange = 'Tile'
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    this.ser.lastCol = data;
    this.ser.whatLast = 'col';
    this.ser.elementSelected = true;
    this.ser.stylesToConfig = data.styles;
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }

  deleteCol(colToDelete?) {
    let col
    if (!colToDelete)
      col = this.ser.lastCol;
    else
      col = colToDelete;
    let removeAction = new Action();
    removeAction.name = 'remove';
    removeAction.whatChange = 'Tile';
    if (!col.parentRow.parentItem.parentCol) {
      return
    }
    if (col.parentRow.cols.length == 1) {
      if (col.parentRow.parentItem.rows.length == 1) {
        removeAction.whatChange = 'Grid';
        removeAction.theObject = col.parentRow.parentItem;
        let outerCol = col.parentRow.parentItem.parentCol;
        outerCol.items.splice(outerCol.items.indexOf(col.parentRow.parentItem), 1);
        outerCol.items.forEach(i => {
          if (i.index != outerCol.items.indexOf(i))
            i.index = outerCol.items.indexOf(i);
        });
      }
      else {
        removeAction.theObject = col.parentRow;
        let grid = col.parentRow.parentItem;
        grid.rows.splice(grid.rows.indexOf(col.parentRow), 1);
        grid.rows.forEach(i => {
          if (i.index != grid.rows.indexOf(i))
            i.index = grid.rows.indexOf(i);
        });
      }
    }
    else {
      removeAction.theObject = col;
      let row = col.parentRow;
      row.cols.splice(row.cols.indexOf(col), 1);
      row.cols.forEach(i => {
        if (i.index != row.cols.indexOf(i))
          i.index = row.cols.indexOf(i);
      });
    }
    if (!colToDelete) {
      this.historySer.prevStack.push(removeAction);
      this.historySer.nextStack.clearStack();
      window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
    }
  }

  newPage() {
    this.ser.pageLoader = false;
    this.http.postPage(this.ser.site._id).subscribe(data => {
      this.ser.pageLoader = true;
      let newPage = Page.fromServerObject(data.result);
      this.ser.lastPageIndex = newPage.index;
      this.ser.site.pages.push(newPage);
      this.ser.currentPage = newPage;
      window.parent.postMessage(JSON.stringify({ function: 'addPageToSite', params: [data.result] }), '*')
    })
  }

  duplicatePage() {
    this.ser.duplicatePageLoader = false
    this.http.duplicatePage(this.ser.currentPage).subscribe(d => {
      this.ser.duplicatePageLoader = true
      this.generalSer.addPageToSite(d.result);
      window.parent.postMessage(JSON.stringify({ function: 'addPageToSite', params: [d.result] }), '*')
    }, e => {
      console.log(e)
    })
  }

  saveChangesInSite(ifPublish, allSites?) {
    this.ser.saveLoader = true
    let site = this.ser.site.toServerObject();
    site.publishHeader = document.getElementsByTagName('header')[0].outerHTML;

    if (document.getElementsByTagName('footer')[0]) {
      site.publishFooter = document.getElementsByTagName('footer')[0].outerHTML;
    }
    if (!ifPublish) {
      this.http.editSite(site).subscribe(d => {
        if (allSites) {
          window.parent.postMessage(JSON.stringify({ function: 'loadMyProjects', params: [] }), '*')
        }
        this.ser.saveSiteLoader = false
        this.ser.saveLoader = false
        console.log(d)
      }, err => {
        ; console.log(err)
      })
    }
    else {
      this.http.publishSite(site).subscribe(d => {
        console.log(d)
        this.ser.site = Site.fromServerObject(site)
        this.ser.sitePublished = true
      }, err => { console.log(err) })
    }
  }

  saveSite(allSites) {
    this.ser.saveSiteLoader = false
    this.ser.saveLoader = false
    this.saveChangesInSite(false, allSites)
    this.generalSer.screenShotSave(null);
  }

  publishSite() {
    this.ser.saveLoader = false
    this.saveChangesInSite(false)
    this.generalSer.screenShotSave(null);
  }

  emptyPages() {
    this.ser.site.pages = [];
  }

}
