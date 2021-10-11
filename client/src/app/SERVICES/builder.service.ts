import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Action } from '../CLASSES/action';
import { Item } from '../CLASSES/item';
import { DbService } from './db.service';
import { HttpService } from './http-ser.service';
import { FilesHttpService } from './files-http.service';
import * as fileSaver from 'file-saver';
import { QuestionService } from 'src/app/SERVICES/FORM/question.service';
import { Form } from 'src/app/CLASSES/FORM/form';
import { GeneralActionsService } from './general-actions.service';
import { PreviewService } from './preview.service';
import { ActionsHistoryService } from './actions-history.service';
import { Page } from '../CLASSES/page';
import { ConfiguratorService } from './configurator.service';
@Injectable({
  providedIn: 'root'
})
export class BuilderService {
  droped: boolean = false
  dropedImg: boolean = false
  dropedGrid = false
  dragerImg;
  currentImg;
  flagImg: number = 2
  source = [
    { img: 'assets/img/Rectangle 22163.png' },
    { img: 'assets/img/Rectangle 22164.png' },
    { img: 'assets/img/Rectangle 22166.png' },
    { img: 'assets/img/Rectangle 22165.png' },
    { img: 'assets/img/Rectangle 22167.jpg' },
    { img: 'assets/img/Rectangle 22168.png' },
    { img: 'assets/img/Rectangle 22163.png' },
    { img: 'assets/img/Rectangle 22164.png' },
    { img: 'assets/img/Rectangle 22166.png' },
  ];
  source2 = [
    { img: 'assets/img/Rectangle 22167.jpg', id: '1', idFile: 0, size: '1.6 Kb', type: 'jpg', imgName: 'Rectangle 22167' },
    { img: 'assets/img/Rectangle 22168.png', id: '2', idFile: 0, size: '1.8 Kb', type: 'png', imgName: 'Rectangle 22168' },
    { img: 'assets/img/Rectangle 22163.png', id: '3', idFile: 0, size: '1.4 Kb', type: 'png', imgName: 'Rectangle 22163' },
    { img: 'assets/img/Rectangle 22164.png', id: '4', idFile: 0, size: '2.0 Kb', type: 'png', imgName: 'Rectangle 22164' },
    { img: 'assets/img/Rectangle 22166.png', id: '5', idFile: 0, size: '1.6 Kb', type: 'png', imgName: 'Rectangle 22166' },
    { img: 'assets/img/Rectangle 22165.png', id: '6', idFile: 0, size: '1.7 Kb', type: 'png', imgName: 'Rectangle 22165' },
    { img: 'assets/img/Rectangle 22181.png', id: '7', idFile: 0, size: '1.4 Kb', type: 'png', imgName: 'Rectangle 22181' },
  ];
  source1 = [
    { img: 'assets/img/upload.png', id: '0' },
    { img: 'assets/img/Rectangle 22167.jpg', id: '1', idFile: 0, size: '1.6 Kb', type: 'jpg', imgName: 'Rectangle 22167' },
  ];
  copySource = [
    { img: 'assets/img/upload.png', id: '0' },
  ];
  imgSource = [];
  imgId: number = 8;
  imgId3: number = 1;
  flagNumberImg: number = 0;
  type;
  dragerElement;
  dragerGrid;
  imgDrag;
  source3 = [];
  new_number: number = 0;
  sizeImg: string = "";
  name: string = "";
  constructor(public ser: DbService, public configSer: ConfiguratorService, public http: HttpService, config: NgbPopoverConfig, public previewSer: PreviewService,
    public router: Router, private san: DomSanitizer, private fileSer: FilesHttpService, public qs: QuestionService,
    public generalSer: GeneralActionsService, public historySer: ActionsHistoryService) { }
  getAllFiles() {
    this.source1 = []
    this.source1 = Object.assign([], this.copySource);
    this.fileSer.getFiles().subscribe(data => {
      this.imgSource = data;
      for (let i = 0; i < this.imgSource.length; i++) {
        this.type = this.imgSource[i].name.split(".")[1]
        this.new_number = this.imgSource[i].size.toFixed(7);
        this.sizeImg = this.new_number.toString() + " " + "Kb";
        this.name = this.imgSource[i].name.split(".")[0];
        this.source1.push({ 'img': this.imgSource[i].url, 'id': this.imgId.toString(), 'idFile': this.imgSource[i]._id, 'size': this.sizeImg, 'type': this.type, 'imgName': this.name })
        if (i == 0)
          [
            this.flagNumberImg = this.imgId
          ]
        this.imgId++;
      }
      if (this.imgSource.length > 0)
        this.currentImg = this.source1[1]
    }, err => { })
  }
  recovereFiles(file) {
    this.fileSer.recovereFiles(file.idFile).subscribe(data => {
      let fileToRecover = this.source3.find(f => f.idFile == file.idFile)
      this.source3.splice(this.source3.indexOf(fileToRecover), 1);
      this.source1.push({ 'img': file.img, 'id': this.imgId.toString(), 'idFile': file.idFile, 'size': file.size, 'type': file.type, 'imgName': file.imgName })
      this.imgId++;
      if (this.source3.length == 0) {
        this.showDeletedFiles(4)
      }
      else {
        this.flagNumberImg = this.source3[0].id
      }
      this.imgId3--
    }, err => {
      if (err.status == 413)
        alert('The File too large');
    })

  }
  uploadFile(file) {
    this.ser.imgLoader = false
    const myFile = new FormData();
    myFile.append("files", file, file.name);
    this.fileSer.uploadFile(myFile, true).subscribe(data => {
      let url = data.data.url;
      this.ser.imgLoader = true
      this.type = data.data.name.split(".")[1]
      this.new_number = data.data.size.toFixed(7);
      this.sizeImg = this.new_number.toString() + " " + "Kb";
      this.name = data.data.name.split(".")[0];
      this.source1.push({ 'img': url, 'id': this.imgId.toString(), 'idFile': data.data.fileId, 'size': this.sizeImg, 'type': this.type, 'imgName': this.name })
      this.flagNumberImg = this.imgId
      this.imgId++;
    }, err => {

      if (err.status == 413)
        alert('The File too large');
    })
  }

  deleteFile(file) {
    if (file.id >= 8) {
      this.fileSer.deleteFile(file.idFile).subscribe(data => {

        let index = this.source1.indexOf(this.source1.find(f => f.id == file.id))
        this.source1.splice(index, 1)
        this.imgId--
        this.flagNumberImg = this.imgId - 1
        for (let i = 0; i < this.source1.length; i++) {
          var b = parseInt(this.source1[i].id)
          if (b == this.flagNumberImg)
            this.currentImg = this.source1[i]
        }

      }, err => {
        if (err.status == 413)
          alert('The File too large');
      })
    }
    else {
      alert("Img from BLDR gallery")
    }
  }
  showDeletedFiles(catefotyImg?) {
    this.fileSer.showDeletedFiles().subscribe(data => {
      this.source3 = []
      let imgSource = data
      if (imgSource.files.length != 0) {
        this.flagImg = 4;
      }
      else
        this.flagImg = 5;
      if (this.flagImg == 4) {
        for (let i = 0; i < imgSource.files.length; i++) {
          if (i == 0)
            this.flagNumberImg = this.imgId3
          let url = imgSource.files[i].url;
          this.type = imgSource.files[i].name.split(".")[1]
          this.new_number = imgSource.files[i].size.toFixed(7);
          this.sizeImg = this.new_number.toString() + " " + "Kb";
          this.name = imgSource.files[i].name.split(".")[0];
          this.source3.push({ 'img': url, 'id': this.imgId3.toString(), 'idFile': imgSource.files[i]._id, 'size': this.sizeImg, 'type': this.type, 'imgName': this.name })
          this.imgId3++;
        }
        this.currentImg = this.source3[0]
      }
    }, err => {
      if (err.status == 413)
        alert('The File too large');
    })
  }
  download(url, imgName, type) {
    this.fileSer.downloadFile(url).subscribe(response => {
      let blob: any = new Blob([response], { type: 'images/jpg; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, imgName + '.' + type);
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
  dragImg(element, event) {
    this.dragerImg = element
    this.dragerElement = ''
    this.dragerGrid = ''
    this.dropedImg = false

  }
  dragElement(element, img?) {
    this.ser.showIcon = false
    this.ser.showStartBuildComponent = false
    this.dragerElement = element
    this.dragerImg = ''
    this.dragerGrid = ''
    this.droped = false
  }
  dragGrid(gridType) {
    this.dragerGrid = gridType
    this.dragerElement = ''
    this.dragerImg = ''
    this.droped = false
    this.dropedGrid = false
  }

  savedMultiFilesDB(file) {
    this.fileSer.savedMultiFilesDB(file).subscribe(data => {
      this.type = data.filesData[0].name.split(".")[1]
      this.new_number = data.filesData[0].size.toFixed(7);
      this.sizeImg = this.new_number.toString() + " " + "Kb";
      this.name = data.filesData[0].name.split(".")[0];
      this.source1.push({ 'img': data.filesData[0].url, 'id': this.imgId.toString(), 'idFile': file._id, 'size': this.sizeImg, 'type': this.type, 'imgName': this.name })
      this.flagNumberImg = this.imgId
      this.imgId++;

    }, err => {
      if (err.status == 413)
        alert('The File too large');

    })
  }

  insertImg(img, type, bool?) {
    switch (type) {
      case 'createImg':
        this.dropedImg = bool
        let data = new Item();
        data.tagName = 'img';
        data.attributes['src'] = img;
        let action = new Action();
        data.index = this.ser.lastCol.items.length;
        data.parentCol = this.ser.lastCol;
        action.name = 'add';
        action.theObject = data;
        this.historySer.prevStack.push(action);
        this.historySer.nextStack.clearStack();
        this.ser.lastItem = data;
        this.ser.whatLast = data.tagName;
        this.ser.elementSelected = true;
        this.ser.stylesToConfig = data.styles;
        break
      case 'changeImg':
        this.configSer.changeStylesG(['src'], img, 'attribute')
        break;
      case 'changeLogo':
        this.ser.sites.find(x => x._id == this.ser.lastChooseVeiwSite._id).logo = img
        break;
      case 'carousel':
        this.ser.lastItem.attributes['items'].push({ 'thumbImage': img, 'image': img })
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'addImage', params: [img] }), '*')
        break;
      case 'changeCarousel':
        this.ser.lastItem.attributes['items'][this.ser.imageCarusel].thumbImage = img;
        this.ser.lastItem.attributes['items'][this.ser.imageCarusel].image = img;
        let action2 = new Action();
        let data2 = new Item();
        data2.tagName = 'carousel';
        data2.index = this.ser.lastCol.items.length;
        data2.parentCol = this.ser.lastCol;
        action2.name = 'change';
        action2.theObject = data2;
        this.historySer.prevStack.push(action2);
        this.historySer.nextStack.clearStack();
        this.ser.lastItem = data2;
        this.ser.whatLast = data2.tagName;
        this.ser.elementSelected = true;
        this.ser.stylesToConfig = data2.styles;
        break;
    }
  }
  changeImg(img) {
    this.configSer.changeStylesG(['src'], img, 'attribute')

    // let action = new Action();
    // action.name = 'change';
    // action.whatChange = 'properties';
    // action.description = 'change src of Img to ' + img;
    // action.theObject = this.ser.lastItem;
    // action.previous = { 'src': this.ser.lastItem.attributes['src'] };
    // this.ser.lastItem.attributes['src'] = img
    // action.current = { 'src': img };
    // this.historySer.prevStack.push(action);
    // this.historySer.nextStack.clearStack();
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
  }
  addQuestionControl(type) {
    switch (type) {
      case 'input': {
        this.ser.lastItem.addTextBoxQuestion();
        break;
      }
      case 'textarea': {
        this.ser.lastItem.addTextareaQuestion();
        break;
      }
      case 'checkbox': {
        this.ser.lastItem.addCheckboxQuestion();
        break;
      }
      case 'radio': {
        this.ser.lastItem.addRadioQuestion();
        break;
      }
      case 'dropdown': {
        this.ser.lastItem.addDropdownQuestion();
        break;
      }
    }
  }



  createElement(tagName, img?, bool?) {
    this.ser.showIcon = false
    this.ser.showStartBuildComponent = false
    let itemOfForm;
    this.ser.elementCreatedForFocus = true
    this.droped = bool
    if (img) {
      let data = new Item();
      data.tagName = 'img';
      data.attributes['src'] = img;
      let action = new Action();
      data.index = this.ser.lastCol.items.length;
      data.parentCol = this.ser.lastCol;
      action.name = 'add';
      action.theObject = data;
      if (bool) {
        this.historySer.prevStack.push(action);
        this.historySer.nextStack.clearStack();
      }
    }
    else {

      let data = new Item(tagName = tagName);
      data.index = this.ser.indexToInsertItem
      this.ser.indexToInsertItem++
      let global = this.ser.site.globalWidgetsName.find(g => g.name == tagName);
      switch (tagName) {
        case 'h1':
          {
            data.description = 'Tittle';
            data.textContent = 'New Title'
            data.attributes['target'] = '_self'
            break;
          }
        case 'a':
          {
            data.description = 'A';
            data.textContent = 'new Link'
            data.attributes['target'] = '_self'
            break;
          }
        case 'iframe':
          {
            data.description = 'Iframe';
            data.attributes['specSrc'] = "https://youtu.be/embed/Cu3R5it4cQs"
            break;
          }
        case 'p':
          {
            data.textContent = 'new Paragraph'
            data.description = 'Paragraph';
            data.attributes['target'] = '_self'
            break;
          }
        case 'form':
          {
            let form = new Form();
            data = form.form;
            itemOfForm = form.form;
            data.description = 'Form';
            break;
          }
        case 'button':
          {
            data.description = 'Button';
            data.textContent = 'new Button';
            data.attributes['target'] = '_self'
            data.attributes['href'] = '';
            data.styles.simpleStyles = {
              'width': '17%',
              'border': 'none',
              'background-color': 'grey',
              'min-height': '80px',
              'justify-content': 'center',
              'margin-left': 'auto',
              'margin-right': 'auto'

            }

            break;
          }
        case 'img':
          {
            data.description = 'Image';
            data.attributes['src'] = 'assets/img/img.png';
            data.attributes['target'] = '_self'
            break;
          }
        case 'lottie':
          {
            data.description = 'lottie';
            data.attributes['lottieUrl'] = 'C:\Users\אתרא\Downloads';
            data.attributes['speed'] = "1"
            data.attributes['target'] = '_self'

            break;
          }
        case 'video':
          {
            data.description = 'Video';
            data.attributes['srcVideo'] = 'VIDEO_ID';
            https://youtu.be/
            break;
          }
        case 'html':
          {
            data.description = 'Html';
            data.textContent = '<button>hhh</button>'
            break;
          }
        case 'hr':
          {
            data.description = 'Divider';
            break;
          }
        case 'spacer':
          {
            data.description = 'Spacer';
            data.styles['simpleStyles']['height'] = '50px'
            break;
          }
        case 'carousel':
          {
            data.description = 'Carousel';
            let imageObject = [];
            let images = [944, 990, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
            imageObject.push({ 'thumbImage': images[0], 'image': images[0] });
            imageObject.push({ 'thumbImage': images[1], 'image': images[1] });
            imageObject.push({ 'thumbImage': images[2], 'image': images[2] });
            data.attributes['arrows'] = true
            data.attributes['indicators'] = true
            data.attributes['hover'] = true
            data.attributes['focus'] = true
            data.attributes['items'] = imageObject;
            break;
          }
        case 'counter':
          {
            data.textContent = 'Counter';
            data.description = 'Counter';
            data.attributes['time'] = new Date()
            data.attributes['massage'] = "The Time Out!!"
            data.attributes['stringTime'] = '00' + "d " + '00' + "h "
              + '00' + "m " + '00' + "s ";
            break;
          }
        case 'slider':
          {
            data.description = 'Slider';
            data.textContent = 'slider';
            data.attributes['value'] = 0;
            data.attributes['minValue'] = 0;
            data.attributes['maxValue'] = 100;
            break;
          }

        case 'accordion':
          {
            data.textContent = 'accordion';
            data.description = 'Accordion';
            data.attributes['accordion'] = []
            data.attributes['accordion'].push({ 'question': 'Question', 'answer': 'Answer' })
            break;
          }
        case 'map':
          {
            data.textContent = 'map';
            data.description = 'Map';
            data.attributes['address'] = "enter yor question"
            break;
          }
        case 'apiHtml':
          {
            let html = '<img src="$imgSrc$" style="$imgStyles$">'
            let configs = [{
              name: 'imgSrc',
              value: 'assets/img/chairs.jpg',
              type: 'file'
            }, {
              name: 'imgStyles',
              value: 'width:50px;height:100px',
              type: 'style'
            }]
            data.createHtml(html, configs)
            break;
          }
        default:

          if (global) {
            data = Item.fromServerObject(global.object, null);
            data.description = global.name;
            data.index = null;
          }
          break;
      }
      let action = new Action();
      data.parentCol = this.ser.lastCol;
      if (global)
        DbService.globalWidgets.push(data);
      action.name = 'add';
      action.theObject = data;
      if (data.globalWidgetName)
        action.whatChange = tagName;
      else
        action.whatChange = data.description;
      if (tagName == 'form')
        this.previewSer.chooseElement(null, itemOfForm);
      else
        this.previewSer.chooseElement(null, data)
      this.historySer.prevStack.push(action);
      this.historySer.nextStack.clearStack();
      window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
    }
  }
  hideOrShowGrids() {
    this.ser.edit = !this.ser.edit
  }
  createGrid(gridType) {
    let data = DbService.createGrid(gridType);
    let action = new Action();
    action.name = 'add';
    action.theObject = data;
    action.whatChange = 'Grid';
    data.index = this.ser.indexToInsertItem
    this.ser.indexToInsertItem++
    data.parentCol = this.ser.lastCol;
    this.previewSer.chooseCol(null, data.rows[0].cols[0], true)
    this.previewSer.editGrid(data);
    this.historySer.prevStack.push(action);
    this.historySer.nextStack.clearStack();
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.historySer.prevStack.toServerObject(), this.historySer.nextStack.toServerObject()] }), '*')
    this.ser.whatLast = 'col';
    this.ser.stylesToConfig = data.rows[0].cols[0].styles;
  }

  sendElementsForLayers() {
    let layers = this.ser.site.pages.map(i => { return i.page.toServerObject() })
    window.parent.postMessage(JSON.stringify({ function: 'refreshLayers', params: [layers] }), '*')

  }
  undo() {
    this.historySer.undo();
  }
  redo() {
    this.historySer.redo();
  }

  setTemplatInPage(asset) {
    this.http.setAsset(asset._id, this.ser.currentPage._id).subscribe(d => {

      let i = this.ser.site.pages.indexOf(this.ser.currentPage);
      this.ser.site.pages[i] = this.ser.currentPage = Page.fromServerObject(d.data);
      window.parent.postMessage(JSON.stringify({ function: 'changePage', params: [d.data] }), '*')
    }, e => { })
  }

}

