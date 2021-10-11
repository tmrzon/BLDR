import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild, HostListener, NgZone, TemplateRef, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { DbService } from 'src/app/SERVICES/db.service';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service'
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/CLASSES/action';
import { Page } from 'src/app/CLASSES/page';
import { Site } from 'src/app/CLASSES/site';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service'
import { of } from 'rxjs';
import { PreviewService } from 'src/app/SERVICES/preview.service';
import { ActionsHistoryService } from 'src/app/SERVICES/actions-history.service';

declare let $;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  squareSize: number = 12
  gridNumbers = Array(11).fill(0).map((x, i) => i)
  gridNumbersHeight = Array(50).fill(20).map((x, i) => i)
  private geoCoder;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  page;
  @HostListener('document:keydown.delete', ['$event'])
  onDeleteComponent(event: KeyboardEvent) {
    this.previewSer.deleteItem(event)
  }
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @Output() itemToConfig: EventEmitter<any> = new EventEmitter<any>();
  isMorePages: boolean = false;
  constructor(
    private titleService: Title, private metaService: Meta, private gActionsSer: GeneralActionsService, private builderSer: BuilderService, public ser: DbService, public http: HttpService,
    public route: ActivatedRoute, public router: Router, private configSer: ConfiguratorService,
    public previewSer: PreviewService, public historySer: ActionsHistoryService, private ngZone: NgZone) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  @HostListener('window:message', ['$event'])
  recieveMessage(event) {
    try {

      const data = JSON.parse(event.data)
      switch (data.function) {
        case 'uploadSite': this.gActionsSer.uploadSite(data.params[0]); break;
        case 'downloadSite': this.gActionsSer.dynamicDownloadJson(); break;
        case 'previewScreen': this.ser.statusScreen = data.params[0]; break;
        case 'deleteImageCarusel': this.ser.lastItem.attributes['items'].splice(data.params[0], 1); break;
        case 'deleteQuestion': this.ser.lastItem.attributes['accordion'].splice(data.params[0], 1); break;
        case 'imageCarusel': this.ser.imageCarusel = data.params[0]; break;
        case 'changeLogoSite': this.ser.site.logo = data.params[0]; break;
        case 'addImage': this.ser.lastItem.attributes['items'].push({ 'thumbImage': data.params[0], 'image': data.params[0] }); break;
        case 'saveSite': this.previewSer.saveSite(data.params[0]); break;
        case 'showGridLine':
          this.ser.showGridLine = !data.params[0]
          window.parent.postMessage(JSON.stringify({ function: 'showGridLine', params: [this.ser.showGridLine] }), '*')
          break;
        case 'setsquareSize':
          this.squareSize = data.params[0]
          this.gridNumbers = Array(this.squareSize - 1).fill(0).map((x, i) => i)
          break;
        case 'animateChanges': { this.configSer.animateChanges(data.params[0], data.params[1]); break; }
        case 'createElement': { this.builderSer.createElement(data.params[0]); break; }
        case 'insertImg': { this.builderSer.insertImg(data.params[0], data.params[1]); break; }
        case 'changeImg': { this.builderSer.changeImg(data.params[0]); break; }
        case 'createGrid': { this.builderSer.createGrid(data.params[0]); break; }
        case 'getElementsForLayers': { this.builderSer.sendElementsForLayers(); break; }
        case 'loadColToConfigurator': { this.gActionsSer.loadColToConfigurator(data.params[0]) }
        case 'loadItemToConfigurator': { this.gActionsSer.loadItemToConfigurator(data.params[0], data.params[1], data.params[2]) }
        case 'undo': { this.builderSer.undo(); break; }
        case 'redo': { this.builderSer.redo(); break; }
        case 'chooseSection': { this.configSer.chooseSection(data.params[0]); break }
        case 'chooseSite': { this.chooseSite(data.params[0]); break; }
        case 'loadSite': { this.gActionsSer.loadSite(data.params[0]); break; }
        case 'changePage': {
          this.ser.currentPage = this.ser.site.pages.find(x => x._id == data.params[0]) ? this.ser.site.pages.find(x => x._id == data.params[0]) : this.ser.site.notFoundPage
        }
          break;
        case 'backgroundImageGrid':
          this.ser.lastChooseGrid.styles['simpleStyles']['background'] = 'url("' + data.params[0] + '")'
          this.ser.lastChooseGrid.styles['simpleStyles']['backgroundImage'] = data.params[0]
          break;
        case 'backgroundImage':
          this.ser.lastCol.styles['background'] = 'url("' + data.params[0] + '")'
          this.ser.lastCol.styles['backgroundImage'] = data.params[0]
          break;
        case 'changeImageCarusel': this.builderSer.insertImg(data.params[0], 'changeCarousel'); break;
        case 'newPage': this.previewSer.newPage(); break;
        case 'duplicatePage': this.previewSer.duplicatePage(); break;
        case 'removePage': this.gActionsSer.removePageOfSite(data.params[0]); break;
        case 'showOverAnimate': {
          this.configSer.showOverAnimate(data.params[0], data.params[1], data.params[2], data.params[3]); break;

        }
        case 'changeContent': this.configSer.changeContent(data.params[0]); break;
        //delete this after fix 
        case 'changeStylesG': this.configSer.changeStylesG(data.params[0], data.params[1], data.params[2], data.params[3])
        case 'setGeneralSettings': this.configSer.setGeneralSettings(data.params[0], data.params[1], data.params[2]); break;
        case 'hideOrShowGrids': this.builderSer.hideOrShowGrids(); break;
        case 'livePreview': this.gActionsSer.livePreview(); break;
        //delete after end the templates
        case 'setPage':

          switch (data.params[0]) {
            case 1:
              this.ser.createDefaultFooterTemplate();
              break;
            case 2:
              this.ser.createDefaultFooterTemplate();
              break;
            case 3:
              this.ser.createDefaultFooterTemplate();
              break;
          }
          break;
        case 'emptyPages': this.previewSer.emptyPages(); break;
        case 'saveTemplate': this.configSer.saveTemplate(data.params[0]); break;
        case 'setTemplate': this.configSer.setTemplate(data.params[0]); break;
        case 'changeIndexes': this.gActionsSer.changeIndexes(data.params[0], data.params[1]); break;
        case 'changeIndexesImage': this.gActionsSer.changeIndexesImages(data.params[0], data.params[1]); break;
        case 'actionRecovery': this.historySer.actionRecovery(data.params[0], data.params[1]); break;
        case 'addQuestion': this.builderSer.addQuestionControl(data.params[0]); break;
        case 'dragImg': this.builderSer.dragImg(data.params[0], data.params[1]); break;
        case 'dragElement': this.builderSer.dragElement(data.params[0]); break;
        case 'dragGrid': this.builderSer.dragGrid(data.params[0]); break;
        case 'createAboutSection': this.ser.createDefaultFooterTemplate(); break;
        case 'changePropertiesPage': this.configSer.changePropertiesPage(data.params[0], data.params[1]); break;
        case 'changeInputInForm': this.gActionsSer.changeInputInForm(data.params[0], data.params[1]); break;
        case 'changeFormInput': this.gActionsSer.changeFormInput(data.params[0], data.params[1]); break;
        case 'globalWidget': this.configSer.globalWidget(data.params[0]); break;
        case 'single': this.ser.ifSingleWidget = !this.ser.ifSingleWidget; break;
        case 'removeFromGlobalWidgets': this.gActionsSer.removeFromGlobalWidgets(); break;
      }

    }
    catch (error) {
      console.log(error)
      return
    }
  }
  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    window.parent.postMessage(JSON.stringify({ function: 'closeBuilder' }), '*')
  }

  changeMetaTags() {
    this.titleService.setTitle(this.ser.currentPage.title);
    this.metaService.addTags([
      { name: 'keywords', content: 'Angular, Universal, Example' },
      { name: 'description', content: 'Angular Universal Example' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  ngOnInit(): void {
    this.ser.ifSingleWidget = false;
    if (sessionStorage.getItem('siteAfterAllProjects')) {
      this.gActionsSer.loadSite(JSON.parse(sessionStorage.getItem('siteAfterAllProjects')))
      sessionStorage.clear()
    }
    else
      if (window.location.hostname != 'bldr.codes') {
      }



    // this.rowsFromSer = this.ser.grids.rows;
    // this.ser.mySections=this.ser.mySections.sort((s1, s2) => { return s1.index > s2.index ? s2.index - s1.index : s2.index - s1.index });
    // console.log('sections',this.ser.mySections)

    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;

    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });


  }
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);

  //     });
  //   }
  // }
  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         // window.alert('No results found');
  //       }
  //     } else {
  //       // window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }

  configElement(event) {
    this.itemToConfig.emit(event);
  }

  chooseSite(site) {
    this.ser.site = Site.fromServerObject(site);
    this.ser.currentPage = this.ser.site.pages[0]
  }
}
