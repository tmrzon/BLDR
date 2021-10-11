import { Row } from './row';
import { Col } from './col';
import { DbService } from 'src/app/SERVICES/db.service';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { QuestionService } from '../SERVICES/FORM/question.service';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';

export class Item {

  public ser: DbService;
  private _parentCol: Col = null;
  // public specialAttributesObj = {};
  public showGridBorders = false;
  public configs = []
  public apiHtml = ''
  public overGrid: boolean = false;
  public chooseElement: boolean = false;
  public lightBorder: boolean = false;
  public overElement: boolean = false;
  order = 1;
  public underDrag: boolean = false;
  constructor(public tagName: string = '',
    public attributes: any = {},
    public styles: any = {
      simpleStyles: Object.assign({}, DbService.generalSettings.simpleStyles),
      spanStyles: Object.assign({}, DbService.generalSettings.spanStyles),
      divStyles: Object.assign({}, DbService.generalSettings.divStyles),
      divStylesHeader: Object.assign({}, DbService.generalSettings.divStylesHeader),
      textStylesHeader: Object.assign({}, DbService.generalSettings.textStylesHeader),
      imgStylesHeader: Object.assign({}, DbService.generalSettings.imgStylesHeader),
      formInputsStyle: Object.assign({}, DbService.generalSettings.formInputsStyle)
    },
    public index: number = null,
    //grid
    public rows: Array<Row> = [],
    //element
    public children: Array<any> = [],
    public textContent: any = '',
    public description: string = '',
    public globalWidgetName: string = null,
    public singleProperties: Array<any> = [],
    // public divStyles: any = {},
    // public specialAttributes: Array<Attribute> = [],
    public _id: string = '') {
    if (this.tagName == 'grid' && !this.attributes['class'])
      this.attributes['class'] = 'container-fluid';
    this.children.forEach(c => {
      if (c.order > this.order) {
        this.order = c.order;
      }
    })
  }

  //property to _parentCol
  get parentCol(): Col {
    return this._parentCol;
  }
  set parentCol(value: Col) {

    if (this.index == null) {
      this.index = value.items.length;
      value.items.push(this)
      this._parentCol = value
    }
    else {
      value.items.forEach(item => {
        if (item.index >= this.index)
          item.index++;
      });
      if (value.items.length == 0)
        this.index = 0;
      value.items.splice(this.index, 0, this)
    }
    this._parentCol = value;
  }

  toServerObject() {
    let item = {
      tagName: this.tagName,
      attributes: Object.assign({}, this.attributes),
      styles: {
        simpleStyles: Object.assign({}, this.styles.simpleStyles),
        spanStyles: Object.assign({}, this.styles.spanStyles),
        divStyles: Object.assign({}, this.styles.divStyles),
        divStylesHeader: Object.assign({}, this.styles.divStylesHeader),
        textStylesHeader: Object.assign({}, this.styles.textStylesHeader),
        imgStylesHeader: Object.assign({}, this.styles.imgStylesHeader),
        formInputsStyle: Object.assign({}, this.styles.formInputsStyle)
      },
      index: this.index,
      //grid
      rows: [],
      //element
      children: [],
      textContent: this.textContent,
      description: this.description,
      globalWidgetName: this.globalWidgetName,
      singleProperties: this.singleProperties ? this.singleProperties.slice(0) : [],
      _parentCol: null,
    };
    this.children.forEach(c => {
      if (c.enable)
        item.children.push(c)
    })
    this.rows.forEach(r => {
      item.rows.push(r.toServerObject())
    })
    // for (let att in this.specialAttributesObj) {
    //   item.specialAttributesObj[att] = att
    // }

    return item;
  }

  copyObject(parentCol) {
    let style = {
      simpleStyles: {},
      divStyles: {},
      spanStyles: {},
      divStylesHeader: {},
      imgStylesHeader: {},
      textStylesHeader: {},
      formInputsStyle: {}
    }
    style.simpleStyles = Object.assign({}, this.styles.simpleStyles);
    style.divStyles = Object.assign({}, this.styles.divStyles);
    style.spanStyles = Object.assign({}, this.styles.spanStyles);
    style.divStylesHeader = Object.assign({}, this.styles.divStylesHeader);
    style.textStylesHeader = Object.assign({}, this.styles.textStylesHeader);
    style.imgStylesHeader = Object.assign({}, this.styles.imgStylesHeader);
    style.formInputsStyle = Object.assign({}, this.styles.formInputsStyle);

    let attributesCopy = Object.assign({}, this.attributes);
    let itemCopied = new Item(this.tagName, attributesCopy, style, this.index, [], [], this.textContent, this.description);
    this.rows.forEach(r => {
      itemCopied.rows.push(r.copyObject(r.parentItem));
    });
    if (this.children.length)
      this.children.forEach(child => {
        itemCopied.children.push(child.copyObject(child.parentCol));
      });
    itemCopied._parentCol = parentCol;
    return itemCopied;
  }
  static fromServerObject(item, parentCol): Item {
    let styles
    if (item.styles) {
      styles = {
        simpleStyles: Object.assign({}, item.styles.simpleStyles),
        spanStyles: Object.assign({}, item.styles.spanStyles),
        divStyles: Object.assign({}, item.styles.divStyles),
        divStylesHeader: Object.assign({}, item.styles.divStylesHeader),
        textStylesHeader: Object.assign({}, item.styles.textStylesHeader),
        imgStylesHeader: Object.assign({}, item.styles.imgStylesHeader),
        formInputsStyle: Object.assign({}, item.styles.formInputsStyle)
      };
    }
    let attributes = Object.assign({}, item.attributes);
    if (item.tagName == 'a' && item.textContent && !item.textContent.value) { }
    let newItem = new Item(item.tagName, attributes, styles, item.index, [], item.children,
      item.textContent && typeof item.textContent == 'object' ? item.textContent.value ? item.textContent.value : '' : item.textContent ? item.textContent : '', item.description, item.globalWidgetName, item.singleProperties ? item.singleProperties.slice(0) : []);
    item.rows.forEach(row => {
      newItem.rows.push(Row.fromServerObject(row, newItem))
    });
    newItem._parentCol = parentCol;
    if (newItem.globalWidgetName && DbService.loadSiteStatus) {
      DbService.globalWidgets.push(newItem);
    }

    return newItem;
  }
  createHtml(apiHtml: string, configs) {
    // this.textContent = this.apiHtml = apiHtml
    this.configs = configs
    for (const config of configs) {
      // this.textContent = this.textContent.replace('$' + config.name + '$', config.value)
    }
  }

  /*************functions for form item*****************/
  getQuestions() {
    return of(this.children.sort((a, b) => a.order - b.order));
  }

  addTextBoxQuestion() {

    this.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newInput',
      'controlType': QuestionService.eControlTypes.Textbox,
      'label': 'New Input',
      'type': 'text',
      'required': false,
      'enable': true
      // }
    });

  }

  addDropdownQuestion() {

    this.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newDropdown',
      'controlType': QuestionService.eControlTypes.Dropdown,
      'label': 'new Dropdown',
      'options': [
        { 'key': 'option1', 'value': 'Option 1' },
        { 'key': 'option2', 'value': 'Option 2' },
        { 'key': 'option3', 'value': 'Option 3' }
      ],
      'enable': true
      // }
    });

  }

  addTextareaQuestion() {
    this.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newTextarea',
      'controlType': QuestionService.eControlTypes.Textarea,
      'label': 'New Textarea',
      'required': false,
      'enable': true
      // }
    });

  }

  addCheckboxQuestion() {
    this.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newCheckbox',
      'controlType': QuestionService.eControlTypes.Checkbox,
      'label': 'New Checkbox',
      'required': false,
      'enable': true
      // }
    });

  }

  addRadioQuestion() {
    this.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newRadio',
      'controlType': QuestionService.eControlTypes.Textbox,
      'label': 'New Radio',
      'required': false,
      'enable': true
      // }
    });

  }

  removeQuestion(question) {
    let index = this.children.findIndex(q => q.order == question.order);
    this.children.splice(index, 1);
  }

}
