import { ElementRef, Injectable, Input } from '@angular/core';
import { Row } from '../CLASSES/row';
import { Col } from '../CLASSES/col';
import { Item } from '../CLASSES/item';
import { GridTemplate } from '../CLASSES/grid-template'
import { Page } from 'src/app/CLASSES/page';
import { Site } from 'src/app/CLASSES/site';
import { Section } from 'src/app/CLASSES/section';
import { CategorySection } from '../CLASSES/category-section'
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  flagToButton: boolean = true;
  builderStatus = ''
  imageCarusel;
  fontColorGeneral = ['#40D9ED', '#3598F4', '#B620E0', '#FD808B', '#F13B7F', '#8dd117'];
  backGroundGeneral = ['#40D9ED', '#3598F4', '#B620E0', '#FD808B', '#F13B7F', '#8dd117'];
  borderColors = ['#40D9ED', '#3598F4', '#B620E0', '#FD808B', '#F13B7F', '#8dd117'];
  imgToChange = 'createImg'
  ifConfigurator: boolean = false;
  @Input() type: string = "number"
  mainSection: boolean = false
  sites = [];
  newSite: boolean = false
  mysites: boolean = false;
  configuratorFlag = ''
  siteNameExist = false
  lastCol: Col = new Col();
  draggedCol
  lastOuterCol: Col = new Col()
  lastChooseGrid: Item;
  lastItem: Item | any;
  moreOptions = false;
  moreOptions2 = false;
  moreOptions3 = false;
  moreOptions4 = false
  draggedItem;
  whatLast: string = null;
  edit: boolean = false;
  elementSelected = false;
  stylesToConfig = {};
  stylesToCopy = {
    divStyles: {},
    spanStyles: {},
    simpleStyles: {},
    formInputsStyle: {}
  };
  site: Site = new Site();
  siteToConfig: Site;
  statusScreen: String = 'desktop';
  builderMode;
  configuratorDragRight = 0;
  configuratorDragTop = 60;
  configuratorDragMaxHeight;
  allPagesMode = false;
  static globalWidgets: Array<Item> = [];
  static loadSiteStatus = false;
  ifSingleWidget = false;
  ifMainGlobal = true;
  newProject: boolean = false
  closeBuilder = false;
  flagChooseSite: boolean = false
  lastChooseVeiwSite: Site;
  content1Styles2 = {
    'width': '0%',
    'padding-left': '0%',
    'position': 'fixed',
    'left': '0'
  };
  lastPageIndex: number = 0;
  deletePageLoader = true
  duplicatePageLoader = true
  showAllPages: boolean = false;
  smallDevice;
  showGridLine = false;
  indexToInsertItem = 0;
  checkBorder = true;
  finishedDrag = true;
  iframeUrl: SafeResourceUrl
  siteToDelete;
  sectionsListByCategory: Array<Section> = [];
  iframeForContent: ElementRef;
  publishFlag: boolean = false;
  saveFlag: boolean = true;
  viewerId;
  siteLoader = true;
  saveSiteLoader = false
  saveLoader = false
  imgLoader = true;
  newSiteLoader = true;
  appLoader = true
  pageLoader = true
  ifAllProjects: boolean = false;
  prefixUrlForHeader = ''
  sitePublished = false
  serverSite;
  elementCreatedForFocus = false
  chooseCol = false
  CurrentPage: Page = new Page();
  showStartBuildComponent = false
  showIcon = false
  caret = null
  isNewUser: boolean = true
  lastItemUnderDrag: Item = null
  constructor() {
  }
  set currentPage(value) {

    this.CurrentPage = value;
    this.lastOuterCol = this.lastCol = this.currentPage.sections[0].item.rows[0].cols[0]
    this.lastCol.chooseCol = true
    this.lastCol.parentRow.parentItem.chooseElement = true
  }
  get currentPage() {
    return this.CurrentPage;
  }

  configurator(value) {
    if (this.configuratorFlag == 'history' && value == 'history') {
      this.configuratorFlag = '';
    }
    else {
      this.configuratorFlag = value;
    }
  }

  CheckIfMainGrid(obj) {
    if (obj)
      return this.mainSection = Object.getOwnPropertyNames(obj).includes('pageId')
    return true
  }

  createDefaultFooterTemplate() {
    let footer = new Section(0, '', '', '');
    footer.item.styles.simpleStyles['background-color'] = '#E8EAEC'
    footer.item.rows[0].cols[0].styles = {
      'min-height': '0px',
    }
    let grid0 = DbService.createGrid(null, 1, 5);
    Object.assign(grid0.rows[0].cols[0].styles, {
      'padding': '1%'
    })
    let h1 = new Item('h1')
    Object.assign(h1.styles.simpleStyles, {
      'text-align': 'left',
      'font': 'Arial',
      'letter-spacing': '0px',
      'color': 'black',
      'opacity': '1'
    })
    h1.textContent = 'Get in Touch!';
    h1.parentCol = grid0.rows[0].cols[0];
    let h29 = new Item('h1')
    Object.assign(h29.styles.simpleStyles, {
      'color': 'black',
      'opacity': '1',
      'overflow': 'hidden',
      'border': 'none',
      'text-align': 'left',
      'font': 'normal normal normal 18px/21px Roboto',
      'letter-spacing': '-0.5px',
      'font-size': '15px',
    })
    h29.textContent = 'hello@email.com'
    let h39 = new Item('h1')
    Object.assign(h39.styles.simpleStyles, {
      'color': 'black',
      'text-align': 'left',
      'font': 'normal normal normal 18px/21px Roboto',
      'letter-spacing': '-0.5px',
      'opacity': '1',
      'overflow': 'hidden',
      'border': 'none',
      'font-size': '15px',
    })
    h39.textContent = '+399 399 233 166'
    let h4 = new Item('h1')
    Object.assign(h4.styles.simpleStyles, {
      'color': 'black',
      'text-align': 'left',
      'top': '0px',
      'font': 'normal normal normal 18px/21px Roboto',
      'letter-spacing': '-0.5px',
      'opacity': '1',
      'overflow': 'hidden',
      'border': 'none',
      'font-size': '15px',
    })
    h4.textContent = 'Main Street 32b, NYC'
    h29.parentCol = grid0.rows[0].cols[1];
    h39.parentCol = grid0.rows[0].cols[2];
    h4.parentCol = grid0.rows[0].cols[3];
    Object.assign(grid0.rows[0].cols[0].styles, {
      'min-height': '15vh',
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'center'
    })
    Object.assign(grid0.rows[0].cols[1].styles, {
      'min-height': '15vh',
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'center'
    })
    Object.assign(grid0.rows[0].cols[2].styles, {
      'min-height': '15vh',
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'center'
    })
    Object.assign(grid0.rows[0].cols[3].styles, {
      'min-height': '15vh',
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'center'
    })
    Object.assign(grid0.rows[0].cols[4].styles, {
      'display': 'flex',
      'justify-content': 'center',
      'min-height': '15vh',
      'align-items': 'center'
    })
    grid0.rows[0].cols[4].attributes['class'] = 'col-12 col-md-6 col-lg-2 p-1'
    grid0.rows[0].cols[0].attributes['class'] = 'col-12 col-md-6 col-lg-3 p-1'
    grid0.rows[0].cols[1].attributes['class'] = 'col-12 col-md-6 col-lg-2 p-1'
    grid0.rows[0].cols[2].attributes['class'] = 'col-12 col-md-6 col-lg-2 p-1'
    grid0.rows[0].cols[3].attributes['class'] = 'col-12 col-md-6 col-lg-3 p-1'
    let icon = new Item('img')
    icon.attributes['src'] = 'assets/icons/Vkb.svg'
    icon.parentCol = grid0.rows[0].cols[4];
    let icon1 = new Item('img')
    icon1.attributes['src'] = 'assets/icons/Pinterestb.svg'
    icon1.parentCol = grid0.rows[0].cols[4];
    let icon2 = new Item('img')
    icon2.attributes['src'] = 'assets/icons/Instagramb.svg'
    icon2.parentCol = grid0.rows[0].cols[4];
    let icon3 = new Item('img')
    icon3.attributes['src'] = 'assets/icons/Twitterb.svg'
    icon3.parentCol = grid0.rows[0].cols[4];
    let icon4 = new Item('img')
    icon4.attributes['src'] = 'assets/icons/Facebookb.svg'
    icon4.parentCol = grid0.rows[0].cols[4];
    grid0.parentCol = footer.item.rows[0].cols[0];
    return footer.item.toServerObject()
  }

  parseObjectfromServerObjecton(obj, parent) {
    let item, col, row, attribute;
    if (obj.rows != undefined) {
      item = new Item(obj['tagName'], {}, Object.assign(obj.styles), obj.index, [], [], obj.textContent);
      obj.attributes.forEach(att => {
        item.attributes[att.name] = this.parseObjectfromServerObjecton(att, null);
      });
      obj.rows.forEach(row => {
        item.rows.push(this.parseObjectfromServerObjecton(row, item))
      });
      if (obj.children.length != 0) {
        console.log(item.children)
        obj.children.foreach(child => {
          item.children.push(this.parseObjectfromServerObjecton(child, item));
        });
      }
      obj.attributesDiv.forEach(att => {
        item.attributesDiv[att.name] = this.parseObjectfromServerObjecton(att, null);
      });
      obj.specialAttributes.forEach(att => {
        item.specialAttributes[att.name] = this.parseObjectfromServerObjecton(att, null);
      });
      item._parentCol = parent;
      return item;
    }
    else
      if (obj.cols != undefined) {
        row = new Row([], [], obj.index);
        obj.attributes.forEach(att => {
          row.attributes[att.name] = this.parseObjectfromServerObjecton(att, null);
        });
        obj.cols.forEach(col => {
          row.cols.push(this.parseObjectfromServerObjecton(col, row));
        });
        row._parentItem = parent;
        return row;
      }
  }
  static gridTypes: Array<GridTemplate> = [
    new GridTemplate('One', 1, 1, 1, 'assets/icons/1al1.svg'),
    new GridTemplate('TwoRowOneCol', 2, 2, 1, 'assets/icons/Group 21579.svg'),
    new GridTemplate('OneRowTwoCol', 2, 1, 2, 'assets/icons/Group 21580.svg'),
    new GridTemplate('ThreeRowOneCol', 3, 3, 1, 'assets/icons/Group 21578.svg'),
    new GridTemplate('OneRowThreeCol', 3, 1, 3, 'assets/icons/Group 21577.svg'),
    new GridTemplate('TwoRowTwoCol', 4, 2, 2, 'assets/icons/Group 21575.svg'),
    new GridTemplate('FourRowOneCol', 4, 4, 1, 'assets/icons/Group 21576.svg'),
    new GridTemplate('OneRowFourCol', 4, 1, 4, 'assets/icons/Group 21574.svg'),
    new GridTemplate('ThreeRowThreeCol', 9, 3, 3, 'assets/icons/Group 21573.svg'),
    new GridTemplate('ThreeRowFourCol', 12, 3, 4, 'assets/icons/Group 21572.svg'),
  ];
  static createGrid(gridType, rows?, cols?) {
    let data = new Item('grid');
    data.tagName = 'grid';
    data.description = 'Grid';
    data.attributes['class'] = 'container-fluid'
    if (gridType) {
      let name = gridType.gridType.toString();
      this.gridTypes.forEach(g => {
        if (g.name == name) {
          rows = g.row;
          cols = g.col;
        }
      });
    }
    if (rows && cols) {
      for (let r = 1; r <= rows; r++) {
        let gridRow = new Row();
        for (let c = 1; c <= cols; c++) {
          let gridCol = new Col();
          gridCol.styles = {
            'background-color': 'rgba(0, 0, 0, 0)',
            'min-height': '150px',
            'height': 'fit-content'
          }
          gridCol.attributes['class'] = 'col p-1'
          gridCol.parentRow = gridRow;
        }
        gridRow.parentItem = data;
      }
    }
    return data;
  }

  static generalSettings = {
    'simpleStyles': {
      'color': 'black',
      'background-color': 'rgb(0,0,0,0)',
      'text-align': 'center',
      'width': '100%'
    },
    'divStyles': {
      'justify-content': 'center'
    },
    'spanStyles': {
      'width': '100%',
      'display': 'flex'
    },
    'divStylesHeader': {
      'color': 'black',
      'background-color': '#f0f0f0',
    },
    'textStylesHeader': {
      'color': 'black',
      'background-color': '#f0f0f0',
    },
    'imgStylesHeader': {
    },
    'formInputsStyle': {
    }
  }
  get generalSetting() {
    return DbService.generalSettings;
  }
  sectionsImages = {
    '5fd75bb03894557d33bd0e86': { 'img': 'assets/sections/1.png' },
    '5fd75bb03894557d33bd0e87': { 'img': 'assets/sections/2.png' },
    '5fd75bb13894557d33bd0e88': { 'img': 'assets/sections/3.png' },
    '5fd75bb13894557d33bd0e89': { 'img': 'assets/sections/4.png' },
    '5fd75bb13894557d33bd0e8a': { 'img': 'assets/sections/5.png' },
    '5fd75bb13894557d33bd0e8b': { 'img': 'assets/sections/6.png' },
    '5fd75bb13894557d33bd0e8c': { 'img': 'assets/sections/7.png' },
    '5fd75bb13894557d33bd0e8d': { 'img': 'assets/sections/8.png' },
    '5fd75bb13894557d33bd0e8e': { 'img': 'assets/sections/9.png' },
    '5fd75bb13894557d33bd0e8f': { 'img': 'assets/sections/10.png' },
    '5fd75bb13894557d33bd0e90': { 'img': 'assets/sections/11.png' },
    '5fd75bb13894557d33bd0e91': { 'img': 'assets/sections/12.png' },
    '5fd75bb13894557d33bd0e92': { 'img': 'assets/sections/13.png' },
    '5fd75bb13894557d33bd0e93': { 'img': 'assets/sections/14.png' },
    '5fd75bb13894557d33bd0e94': { 'img': 'assets/sections/15.png' },
    '5fd75bb23894557d33bd0e95': { 'img': 'assets/sections/16.png' },
    '5fd75bb23894557d33bd0e96': { 'img': 'assets/sections/17.png' },
    '5fd75bb23894557d33bd0e97': { 'img': 'assets/sections/18.png' },
    '5fd75bb23894557d33bd0e98': { 'img': 'assets/sections/19.png' },
    '5fd75bb23894557d33bd0e99': { 'img': 'assets/sections/20.png' },
    '5fd75bb23894557d33bd0e9a': { 'img': 'assets/sections/21.png' },
    '5fd75bb23894557d33bd0e9b': { 'img': 'assets/sections/22.png' },
    '5fd75bb23894557d33bd0e9c': { 'img': 'assets/sections/23.png' },
    '5fd75bb23894557d33bd0e9d': { 'img': 'assets/sections/24.png' },
    '5fd75bb23894557d33bd0e9e': { 'img': 'assets/sections/25.png' },
    '5fd75bb23894557d33bd0e9f': { 'img': 'assets/sections/26.png' },
    '5fd75bb23894557d33bd0ea0': { 'img': 'assets/sections/27.png' }
  };
  lastCategory: CategorySection;
}
