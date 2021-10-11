import { ElementRef, Injectable, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from '../CLASSES/action';
import { Item } from '../CLASSES/item';
import { Section } from '../CLASSES/section';
import { Site } from '../CLASSES/site';
import { DbService } from './db.service';
import { GeneralActionsService } from './general-actions.service';
import { HttpService } from './http-ser.service';
import { ActionsHistoryService } from './actions-history.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  @ViewChild('file') fileBrowser: ElementRef<any>;
  buttonOpenModal: ElementRef<any>;
  width;
  width1;
  type;
  animationName;
  animationDuration;
  animationcount;
  constructor(public ser: DbService, public http: HttpService, public router: Router,
    public generalSer: GeneralActionsService, public historySer: ActionsHistoryService) {
  }
  ngOnInit() {
    let item = this.ser.lastItem
    item.attributes['target'] = "_self"
  }
  setPropertiesOfGlobalWidget(name, value) {

    let temp = this.ser.lastItem;
    DbService.globalWidgets.forEach(x => {
      if (x.globalWidgetName == temp.globalWidgetName && x.singleProperties.find(s => s == name) == undefined) {
        this.ser.lastItem = x;
        this.changeStylesG(name, value);
      }
    })
    this.ser.lastItem = temp;
  }

  changeContent(content) {

    this.ser.lastItem.textContent = content;
    if (!this.ser.ifSingleWidget) {
      if (this.ser.ifMainGlobal) {
        this.ser.ifMainGlobal = false;
        let temp = this.ser.lastItem;
        DbService.globalWidgets.forEach(x => {
          if (x.globalWidgetName == temp.globalWidgetName && x.singleProperties.find(s => s == name) == undefined) {
            this.ser.lastItem = x;
            this.changeContent(content);
          }
        })
        this.ser.lastItem = temp;
        this.ser.ifMainGlobal = true;
      }
      else
        return
    }
    else {
      this.ser.lastItem.singleProperties.push('content');
    }
  }
  showOverAnimate(nameAnimate, animationDuration, animationiterationCount, isMouseHover) {
    if (isMouseHover) {
      this.ser.lastItem.styles['simpleStyles']['animation-name'] = nameAnimate
      this.ser.lastItem.styles['simpleStyles']['animation-duration'] = animationDuration
      this.ser.lastItem.styles['simpleStyles']['animation-iteration-count'] = animationiterationCount
    }
    else {
      this.ser.lastItem.styles['simpleStyles']['animation-name'] = this.animationName
    }
  }
  animateChanges(key, value) {
    this.animationName = value
  }
  changeStylesG(keys, value, actionType = 'style', specialAttribute = '') {
    debugger
    let item;
    if (this.ser.whatLast == 'col')
      item = this.ser.lastCol;
    else
      if (this.ser.lastItem)
        item = this.ser.lastItem;
      else
        item = this.ser.lastChooseGrid
    let action = new Action();
    action.name = 'change';
    action.theObject = item;
    action.whatChange = 'style';
    let i, itemToChange = item
    switch (actionType) {
      case 'style':
        if (this.ser.whatLast == 'col') {
          // action.previous = { [keys[0]]: item.styles[keys[0]][keys[1]] };
          item.styles[keys[0]] = value;
          // action.current = { [keys[0]]: item.styles[keys[0]][keys[1]] };

        } else {
          action.previous = { [keys[0]]: { [keys[1]]: item.styles[keys[0]][keys[1]] } };
          item.styles[keys[0]][keys[1]] = value;
          action.current = { [keys[0]]: { [keys[1]]: item.styles[keys[0]][keys[1]] } };
        } break
      case 'general':
        DbService.generalSettings[keys[0]][keys[1]] = value;
        break
      case 'attribute':
        if (specialAttribute == 'special') {
          this.setSpecialAttribute(item, keys, value, action)
        } else {
          action.previous = item.attributes[keys[0]]
          item.attributes[keys[0]] = value
          action.current = item.attributes[keys[0]]
        }
        break;

    }
    if (this.ser.whatLast == 'col') {
      window.parent.postMessage(JSON.stringify({ function: 'loadColToConfigurator', params: [this.ser.lastCol.toServerObject()] }), '*')
    }
    else {
      window.parent.postMessage(JSON.stringify({ function: 'loadItemToConfigurator', params: [this.ser.lastItem.tagName, this.ser.lastItem.toServerObject()] }), '*')
    }
    action.description = keys[0];
    if (item.children && item.globalWidgetName && keys[0] != 'content')
      if (!this.ser.ifSingleWidget) {
        if (this.ser.ifMainGlobal) {
          this.ser.ifMainGlobal = false;
          this.setPropertiesOfGlobalWidget(keys, value);
          this.ser.ifMainGlobal = true;
          let obj = item.toServerObject();
          this.ser.site.globalWidgetsName.find(g => g.name == item.globalWidgetName).object = obj;
          action.theObject.description = item.globalWidgetName;
          if (this.ser.lastItem.singleProperties.length) {
            let i = this.ser.lastItem.singleProperties.findIndex(keys[0]);
            i ? this.ser.lastItem.singleProperties.splice(i, 1) : '';
          }
        }
        else
          return
      }
      else {
        action.theObject.description = 'single';
        this.ser.lastItem.singleProperties.push(name);
      }
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*');
  }
  setSpecialAttribute(item, keys, value, action) {
    switch (keys) {
      case 'accordion':
        action.previous = item.attributes['accordion'];
        item.attributes['accordion'].push({ 'question': value[0], 'answer': value[1] })
        action.current = item.attributes['accordion'];
        break;
      case 'time':
        action.previous = item.attributes['time'];
        item.attributes['time'] = value[0]
        item.attributes['massage'] = value[1]
        item.attributes['date'] = !item.attributes['date']
        action.current = item.attributes['time'];
        break;
      case 'name':
        action.description = 'change the name of Section to ' + value;
        action.previous = item.parentCol.name
        item.parentCol.name = value[0]
        action.current = item.parentCol.name;
        break;
    }
  }

  setGeneralSettings(stylesType, key, value) {
    DbService.generalSettings[stylesType][key] = value;
  }
  changePropertiesPage(type, value) {
    switch (type) {
      case 'name':
        this.ser.CurrentPage.name = value;
        break;
      case 'permission': if (value) {
        this.ser.currentPage.permission = 'protected'
        this.ser.currentPage.enable = false
      }
      else {
        this.ser.currentPage.permission = 'public'
        this.ser.currentPage.enable = true
      }
        break;
      case 'password':
        this.ser.CurrentPage.password = value;
        break;
      case 'url':
        this.ser.CurrentPage.url = value;
        break;
      case 'title':
        this.ser.CurrentPage.title = value;
        break;
      case 'description':
        this.ser.CurrentPage.description = value;
        break;
      case 'enable':
        if (!this.ser.currentPage.enable) {
          this.ser.site.pages.forEach(s => {
            if (s._id == this.ser.currentPage._id) {
              this.ser.currentPage.enable = true;
              s.enable = true;
            }
          })

        }
        else {
          this.ser.site.pages.forEach(s => {
            if (s._id == this.ser.currentPage._id) {
              this.ser.currentPage.enable = false;
              s.enable = false;
            }
          })
        }
        break;
      case 'pageLayout':
        this.ser.currentPage.pageLayout = value;
        break;
    }
  }

  saveTemplate(type) {
    this.generalSer.screenShotSave(type);
  }

  setTemplate(siteToSet) {
    this.ser.sites.push(siteToSet)
    this.ser.site = Site.fromServerObject(siteToSet);
    this.ser.siteToConfig = this.ser.site;
  }

  chooseSection(sec) {
    let newSection = new Section(sec.index, sec.name,
      '', '');
    newSection.item = sec.item;
    newSection.pageId = this.ser.currentPage._id;
    this.ser.currentPage.sections.push(newSection);
    let action = new Action();
    newSection.index = this.ser.currentPage.sections.length;
    action.name = 'addSection';
    action.theObject = newSection;
    this.historySer.prevStack.push(action);
    // empty the nextStack
    this.historySer.nextStack.clearStack();
    this.ser.lastItem = newSection;
    this.ser.whatLast = newSection.name;
    this.ser.elementSelected = true;

  }

  showThePage(event) {
    if (event.currentTarget.checked) {
      if (!this.ser.currentPage.enable) {
        this.ser.site.pages.forEach(s => {
          if (s._id == this.ser.currentPage._id) {
            this.ser.currentPage.enable = true;
            s.enable = true;
          }
        })
      }
    }
    else {
      this.ser.site.pages.forEach(s => {
        if (s._id == this.ser.currentPage._id) {
          this.ser.currentPage.enable = false;
          s.enable = false;
        }
      })
    }
  }

  globalWidget(name) {

    this.ser.lastItem.globalWidgetName = name;
    this.ser.lastItem.description = name;
    let obj = this.ser.lastItem.toServerObject();
    this.ser.site.globalWidgetsName.push({ 'name': name, 'object': obj });
    DbService.globalWidgets.push(this.ser.lastItem);
  }

}