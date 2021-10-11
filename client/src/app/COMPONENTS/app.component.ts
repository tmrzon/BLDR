import { Component, ElementRef, HostListener, Injector, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../SERVICES/db.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Site } from 'src/app/CLASSES/site';
import { PreviewComponent } from './preview/preview.component';
import { UserPagesGuard } from '../user-pages.guard';
import { GeneralActionsService } from '../SERVICES/general-actions.service';
import { PreviewService } from '../SERVICES/preview.service';
import { ActionsHistoryService } from '../SERVICES/actions-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  preview = window.location.href.includes('preview')

  deviceSize: number;
  publisshModePageUrl = '';

  constructor(public ser: DbService, public router: Router, public http: HttpService,
    public activatedRoute: ActivatedRoute,public previewSer:PreviewService,
    public generalAction: GeneralActionsService,public historySer:ActionsHistoryService) {
    if (window.location.hostname == 'bldr.codes' || window.location.hostname == 'localhost') {
      if (window.location.href.search('livePreview') != -1) {
        this.ser.appLoader = false
        ser.builderMode = false;

        ser.site = Site.fromServerObject(JSON.parse(localStorage.getItem('site')))
        let config = router.config;
        ser.site.pages.forEach(page => {
          ser.site.pages.push(page)
          // add routes
          if (!config.find(r => r.path == ':userName/livePreview').children.find(c => c.path == page.url))
            config.find(r => r.path == ':userName/livePreview').children
              .push({ path: page.url, component: PreviewComponent, canActivate: [UserPagesGuard] });
        });
        config.find(r => r.path == ':userName/livePreview').children
          .push({ path: '**', component: PreviewComponent, canActivate: [UserPagesGuard] });

        router.resetConfig(config);
        console.log('routes', router.config)
        // console.log('url',router.url)
        let page = window.location.pathname.split('/')[3];
        http.userName = location.pathname.split('/')[1]
        router.navigate(['/' + this.http.userName + '/livePreview/' + page]);
      }
      else
        if (window.location.href.search('publish') == -1) {
          this.ser.builderMode = true;
        }
    }
  }

  // @HostListener('window:resize', ['$event'])
  onResize(event?) {
    // this.deviceSize = window.innerWidth
    if (this.ser.builderMode)
      if (window.innerWidth > 768) {
        this.ser.smallDevice = false;

        this.router.navigate(['/' + this.http.userName + '/editProject']);

      }
      else {
        this.ser.smallDevice = true;
        // if (!this.ser.allPagesMode)
        this.router.navigate(['/' + this.http.userName + '/preview']);
        // else
        //   this.router.navigate(['/' + this.http.userName + '/allPages']);
      }
  }


  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event) {
  // //  if(window.location.hostname!='bldr.codes'){ 
  //   localStorage.setItem('left1', 'hhh');
  //     this.http.updateViewerLeavingDate().subscribe(data=>{
  //       localStorage.setItem('left2', data);
  //       console.log(data);
  //     }, err=>{
  //       localStorage.setItem('left3', err);
  //       console.log(err);
  //     })
  // //  }
  // }

  // @HostListener('window:beforeunload', [ '$event' ]) 
  // beforeUnloadHandler(event) { 
  //    //  if(window.location.hostname!='bldr.codes'){ 
  //     localStorage.setItem('left1', 'hhh');
  //     this.http.updateViewerLeavingDate(event).subscribe(data=>{
  //       localStorage.setItem('left2', data);
  //       console.log(data);
  //     }, err=>{
  //       localStorage.setItem('left3', err);
  //       console.log(err);
  //     })
  // //  }
  // }

  @HostListener('window:popstate', ['$event'])
  onHashChange(event) {
    this.checkCurrentURL();
  }

  private checkCurrentURL() {
    let path = window.location.pathname.split("/").pop();
    console.log("loaction : " + window.location.pathname);
    console.log("path : " + path);
    if (path == 'myProjects') {
      this.ser.ifAllProjects = true;
    }
    else {
      this.ser.ifAllProjects = false;
    }
  }

  @HostListener('window:visibilitychange', ['$event'])
  visibilitychange(event) {
    if (document.visibilityState === 'hidden') {
      localStorage.setItem('newTry', 'hhh');
      //navigator.sendBeacon('https://bldr.codes/apiForPublish/updateViewerLeavingDate', 'helloworld');
      this.http.updateViewerLeavingDate(event);
      // this.http.updateViewerLeavingDate(event).subscribe(data=>{
      //         localStorage.setItem('left2', data);
      //         console.log(data);
      //       }, err=>{
      //         localStorage.setItem('left3', err.error);
      //         console.log(err);
      //       })
    }
  }




  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.ctrlKey == true && event.code == "KeyZ") {

      if (this.preview)
        this.historySer.actionRecovery('undo');
      else
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'actionRecovery', params: ['undo'] }), '*');
    }

    else if (event.ctrlKey == true && event.code == "KeyY") {
      if (this.preview)
        this.historySer.actionRecovery('redo');
      else
        this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'actionRecovery', params: ['redo'] }), '*');
    }



  }
  @HostListener('document:cookie', ['$event'])
  changeCookie(event) {

  }

  ngOnInit() {
    // if (this.isPreview.includes('preview'))
    //   this.preview = true
    //   // this.router.events.subscribe(event => {
    //   //   if (event instanceof NavigationStart) {
    //   //     console.log(event.url)
    //   //     this.routerChangeMethod(event.url);
    //   //   }
    //   // })
  }

  routerChangeMethod(url) {
    if (url == "/" + this.http.userName + "/preview")
      return
    if (!this.ser.builderMode)
      return
    if (url == "/" + this.http.userName + "/editProject") {
      // this.ser.preview = true;
      this.ser.closeBuilder = false;
      // this.ser.openConfigurator();
    }
    else {
      // this.ser.preview = false;
      this.ser.closeBuilder = true;
      // this.ser.openConfigurator();
    }
  }

  // saveSections(){
  //   
  //   this.ser.mySections = [];
  //   this.ser.createHomeSection();
  //   this.ser.createServicesSection();
  //   this.ser.createAboutSection();
  //   this.ser.createGallerySection();
  //   this.ser.createCustomersReviewSection();
  //   this.ser.createQuestionSection();
  //   this.ser.createThreeServicesSection();
  //   this.ser.createTeamSection();
  //   this.ser.createLoginSection();
  //   this.ser.createEmailSection();
  //   this.ser.createAboutImageSection();
  //   this.ser.createServices2Section();
  //   this.ser.createServices3Section();
  //   this.ser.createServices4Section();
  //   this.ser.createServices5Section();
  //   this.ser.createServices6Section();
  //   this.ser.createServices7Section();
  //   this.ser.createServices8Section();
  //   this.ser.createServices9Section();
  //   this.ser.createServices10Section();
  //   this.ser.createServices11Section();
  //   this.ser.createServices12Section();
  //   this.ser.createServices13Section();
  //   this.ser.createServices14Section();
  //   this.ser.createServices15Section();
  //   this.ser.createServices16Section();
  //   this.ser.createServices17Section();
  //   this.ser.createServices18Section();
  //   this.ser.createServices19Section();




  //   console.log(this.ser.mySections)

  //   this.ser.mySections.forEach(s => {

  //     this.http.postSection(s).subscribe(data => {
  //       
  //       console.log('section', data)
  //     }, err => { });
  //   });

  // }

}