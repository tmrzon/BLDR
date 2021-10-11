import { Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridTemplate } from 'src/app/CLASSES/grid-template';
import { Item } from 'src/app/CLASSES/item';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { CompressFileService } from 'src/app/SERVICES/compress-file.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {
  type;
  idImg: number = 8;
  modalRef: BsModalRef;
  searchText;
  script = '<div><button id="d" style="color:red">d</button><script>console.log("Script added successfully");alert("hello")document.getElementById("d").style.color="red";document.getElementById("d").onclick=(event)=>{alert("hello")}</script></div>'
  @Output() openAllPages: EventEmitter<any> = new EventEmitter();
  @ViewChild('file') fileBrowser: ElementRef<any>;
  @ViewChild('scroller1') scroller: ElementRef;
  @ViewChild('images') images;
  flagImg: number = 2;
  flagUpload: boolean = false;
  compressFile;
  constructor(private modalService: BsModalService, public compress: CompressFileService, public ser: DbService, public generalActionsSer: GeneralActionsService, public builderSer: BuilderService) {
    this.chooseCategoryImg(2);
    builderSer.getAllFiles();
  }
  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' })
  }
  insertImg(img) {

    this.type = this.ser.imgToChange
    switch (this.type) {
      case 'createImg':
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'insertImg', params: [img, this.type] }), '*')
        let data = new Item();
        data.attributes['src'] = img;
        break
      case 'backgroundImage':
        this.ser.lastCol.styles['background'] = 'url("' + img + '")'
        this.ser.lastCol.styles['backgroundImage'] = img
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'backgroundImage', params: [img, this.type] }), '*')
        break;
      case 'backgroundImageGrid':
        this.ser.lastItem.attributes['src'] = img
        // this.ser.lastItem.styles['simpleStyles']['background'] = 'url("' + img + '")'
        // this.ser.lastItem.styles['simpleStyles']['backgroundImage'] = img
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'backgroundImageGrid', params: [img, this.type] }), '*')
        break;
      case 'changeImg':
        this.ser.lastItem.attributes['src'] = img
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeImg', params: [img, this.type] }), '*')
        break
      case 'changeLogo':
        this.ser.sites.find(x => x._id == this.ser.lastChooseVeiwSite._id).logo = img
        break;
      case 'changeLogoSite':
        this.ser.site.logo = img
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeLogoSite', params: [img] }), '*')
        break;
      case 'changeFavicon':
        this.ser.site.favicon = img
        break;
      case 'carousel':
        this.ser.lastItem.attributes['items'].push({ 'thumbImage': img, 'image': img })
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'addImage', params: [img] }), '*')
        break;
      case 'changeCarousel':
        this.ser.lastItem.attributes['items'][this.ser.imageCarusel].thumbImage = img;
        this.ser.lastItem.attributes['items'][this.ser.imageCarusel].image = img;
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeImageCarusel', params: [img, this.ser.imageCarusel] }), '*')
        break;
    }
  }
  chooseCategoryImg(categoryImg) {
    if (categoryImg == 4) {
      this.flagImg = categoryImg;
      this.builderSer.showDeletedFiles();
    }
    else {
      if (categoryImg == 3) {
        this.builderSer.flagNumberImg = 1
        this.builderSer.currentImg = this.builderSer.source2[0]
      }
      else {
        this.setFlag()
        this.builderSer.currentImg = this.builderSer.source1[1]
      }
      this.flagImg = categoryImg;
      this.builderSer.flagImg = 0
    }
  }
  uploadImg(files, event) {
    let image
    if (files) {
      image = new File([files.img], files.imgName);
    }
    else {
      image = event.target.files[0]
    }
    this.ser.imgLoader = false
    event.target.value = '';
    this.compress.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {
        this.compressFile = compressedImage
        console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
        this.builderSer.uploadFile(compressedImage)
      })
  }
  setFlag() {
    this.builderSer.flagNumberImg = this.builderSer.imgId - 1
  }
  dragOverHandler(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
    console.log('File(s) in drop zone');
  }
  dropOver(event) {
    event.preventDefault()
    event.currentTarget.style.border = 'black 4px dotted'
    event.currentTarget.style.marginTop = '3%'
    event.currentTarget.style.marginleft = '6%';
    event.currentTarget.style.width = '90%';
    event.currentTarget.style.height = '390px';
    event.currentTarget.style.backgroundColor = '#ffffff';
  }
  dropHandler(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      let sources = this.builderSer.source1;
      let imgId = this.idImg;
      if (ev.dataTransfer.files) {
        var file = ev.dataTransfer.files[0];
        this.builderSer.uploadFile(file)
        var fReader = new FileReader();
        fReader.readAsDataURL(file);
        this.builderSer.flagNumberImg = imgId
        this.idImg++;
        this.builderSer.source1 = sources;
      }
    }
  }
  chooseImg(numberImg, img, source, event) {
    if (numberImg == 0) {
      event.currentTarget.parentNode.children[1].click()
      numberImg = this.builderSer.flagNumberImg
      this.flagUpload = true;
    }
    else {
      this.builderSer.currentImg = img
    }
    this.builderSer.flagNumberImg = numberImg;
    if (numberImg)
      this.ser.flagToButton = true;
  }
}