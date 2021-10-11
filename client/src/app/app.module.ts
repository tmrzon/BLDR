import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './COMPONENTS/app.component';
import { BuilderComponent } from './COMPONENTS/LEFT_PANEL/builder/builder.component';
import { PreviewComponent } from './COMPONENTS/preview/preview.component';
import { GridComponent } from './COMPONENTS/grid/grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './SERVICES/http-ser.service'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChildrenElementComponent } from './COMPONENTS/children-element/children-element.component';
import { ConfiguratorComponent } from './COMPONENTS/configurator/configurator.component';
import { FrameComponent } from './COMPONENTS/frame/frame.component'
import { SortablejsModule } from 'ngx-sortablejs'
import { HeaderComponent } from './COMPONENTS/header/header.component';
import { AlertComponent } from './COMPONENTS/alert/alert.component';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { NotFoundComponent } from './COMPONENTS/not-found/not-found.component';

import { AllPagesComponent } from './COMPONENTS/LEFT_PANEL/all-pages/all-pages.component';
import { AllSitesComponent } from './COMPONENTS/all-sites/all-sites.component';
import { SafePipe } from './PIPES/safe.pipe';
import { RunScriptsDirective } from './DIRECTIVES/run-scripts.directive';
import { ContentEditableDirective } from './DIRECTIVES/content-editable.directive';
import { DbService } from './SERVICES/db.service';
import { StatisticsComponent } from './COMPONENTS/statistics/statistics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartPieComponent } from './COMPONENTS/chart-pie/chart-pie.component';
import { NoSitesComponent } from './COMPONENTS/no-sites/no-sites.component';
import { CreateSiteModalComponent } from './COMPONENTS/create-site-modal/create-site-modal.component';
import { ActionsHistoryComponent } from './COMPONENTS/LEFT_PANEL/actions-history/actions-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ResizableModule } from 'angular-resizable-element';
import { ModalImageComponent } from './COMPONENTS/modal-image/modal-image.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditContentModeComponent } from './COMPONENTS/edit-content-mode/edit-content-mode.component';
import { LayersComponent } from './COMPONENTS/LEFT_PANEL/layers/layers.component';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { ChartColumnsComponent } from './COMPONENTS/chart-columns/chart-columns.component'
import { ChartDonutComponent } from './COMPONENTS/chart-donut/chart-donut.component';
import { ChartSemiDonutComponent } from './COMPONENTS/chart-semi-donut/chart-semi-donut.component';
import { BuilderService } from './SERVICES/builder.service';
import { GeneralActionsService } from './SERVICES/general-actions.service';
import { SaveChangesModalComponent } from './COMPONENTS/save-changes-modal/save-changes-modal.component';
import { LoginHeaderComponent } from './COMPONENTS/login-header/login-header.component';
import { StartBuildComponent } from './COMPONENTS/start-build/start-build.component';
import { SelectItemDirective } from './DIRECTIVES/select-item.directive';
import { DynamicFormComponent } from './COMPONENTS/FORM/dynamic-form/dynamic-form.component';
import { CFormComponent } from './COMPONENTS/CONFIGURATORS/c-form/c-form.component';
import { CWHeaderComponent } from './COMPONENTS/CONFIGURATORS/c-wheader/c-wheader.component';
import { CGridComponent } from './COMPONENTS/CONFIGURATORS/c-grid/c-grid.component';
import { CColComponent } from './COMPONENTS/CONFIGURATORS/c-col/c-col.component';
import { CwImageComponent } from './COMPONENTS/CONFIGURATORS/cw-image/cw-image.component';
import { CwTextComponent } from './COMPONENTS/CONFIGURATORS/cw-text/cw-text.component';
import { CwLinkComponent } from './COMPONENTS/CONFIGURATORS/cw-link/cw-link.component';
import { CPageComponent } from './COMPONENTS/CONFIGURATORS/c-page/c-page.component';
import { CwCaruselComponent } from './COMPONENTS/CONFIGURATORS/cw-carusel/cw-carusel.component';
import { CwYoutubeComponent } from './COMPONENTS/CONFIGURATORS/cw-youtube/cw-youtube.component';
import { CwAccordionComponent } from './COMPONENTS/CONFIGURATORS/cw-accordion/cw-accordion.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { LottieAnimationViewModule } from 'ng-lottie';
import { CwSliderComponent } from './COMPONENTS/CONFIGURATORS/cw-slider/cw-slider.component';
import { CwLottieComponent } from './COMPONENTS/CONFIGURATORS/cw-lottie/cw-lottie.component';
import { CwIframeComponent } from './COMPONENTS/CONFIGURATORS/cw-iframe/cw-iframe.component';
import { CwCounterComponent } from './COMPONENTS/CONFIGURATORS/cw-counter/cw-counter.component';
import { CounterComponent } from './COMPONENTS/counter/counter.component';
import { CSiteComponent } from './COMPONENTS/CONFIGURATORS/c-site/c-site.component';
import { GlobalWidgetComponent } from './COMPONENTS/CONFIGURATORS/global-widget/global-widget.component';
import { InitRangeInputDirective } from './DIRECTIVES/init-range-input.directive';
import { SliderFillComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/slider-fill/slider-fill.component';
import { SliderWithNumberComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/slider-with-number/slider-with-number.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColorsComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/colors/colors.component';
import { BordersComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/borders/borders.component';
import { ShadowsComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/shadows/shadows.component';
import { ModalComponent } from './COMPONENTS/modal/modal.component';
import { SelectsComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/selects/selects.component';
import { AlignmentComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/alignment/alignment.component';
import { ImageComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/image/image.component';
import { BoxModelComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/box-model/box-model.component';
import { AnimationsComponent } from './COMPONENTS/CONFIGURATORS/CONTROLLERS/animations/animations.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    BuilderComponent,
    PreviewComponent,
    GridComponent,
    AlertComponent,
    ConfiguratorComponent,
    ChildrenElementComponent,
    FrameComponent,
    NotFoundComponent,
    AllPagesComponent,
    ModalImageComponent,
    HeaderComponent,
    AllSitesComponent,
    SafePipe,
    RunScriptsDirective,
    ContentEditableDirective,
    StatisticsComponent,
    ChartPieComponent,
    ActionsHistoryComponent,
    EditContentModeComponent,
    NoSitesComponent,
    CreateSiteModalComponent,
    ChartColumnsComponent,
    ChartDonutComponent,
    ChartSemiDonutComponent,
    LayersComponent,
    SaveChangesModalComponent,
    LoginHeaderComponent,
    StartBuildComponent,
    SelectItemDirective,
    DynamicFormComponent,
    CFormComponent,
    CWHeaderComponent,
    CGridComponent,
    CColComponent,
    CwImageComponent,
    CwTextComponent,
    CwLinkComponent,
    CPageComponent,
    CwCaruselComponent,
    CwYoutubeComponent,
    CwSliderComponent,
    CwLottieComponent,
    CwIframeComponent,
    CwAccordionComponent,
    CwCounterComponent,
    CounterComponent,
    CSiteComponent,
    GlobalWidgetComponent,
    InitRangeInputDirective,
    SliderFillComponent,
    SliderWithNumberComponent,
    ColorsComponent,
    ModalComponent,
    BordersComponent,
    ShadowsComponent,
    SelectsComponent,
    AlignmentComponent,
    ImageComponent,
    BoxModelComponent,
    AnimationsComponent,

  ],
  imports: [
    LottieAnimationViewModule,
    YouTubePlayerModule,
    SortablejsModule.forRoot({ animation: 150 }),
    HttpClientModule,
    ImageCropperModule,
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    FormsModule,
    NgbModule,
    CommonModule,
    ResizableModule,
    ReactiveFormsModule,
    ContenteditableModule,
    // NgxParallaxScrollModule
    // PopoverModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCQu2W9RhI1Sm5sEt3IwZWEXPxobSxlz2E',
    //   libraries: ['places']
    // }),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    Ng2SearchPipeModule,
    // NgxParallaxScrollModule
    // PopoverModule,
    NgApexchartsModule,
    ModalModule.forRoot(),
    ContextMenuModule.forRoot(),
  ],
  providers: [HttpService, HttpClientModule, DbService, ModalImageComponent, BuilderService, GeneralActionsService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [
        HttpService, DbService, Router
      ],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function appInitializerFactory(
  http: HttpService, ser: DbService, router: Router
): () => Promise<any> {
  return () => {
    return new Promise<any>((resolve, reject) => {
      // if (window.location.hostname != 'bldr.codes') {
      //   const subDomains = window.location.hostname.split('.')
      //   if (subDomains.length > 3) {
      //     router.navigate(['**'])
      //     return
      //   }
      // //let viewerDetails = this.getViewerDetails();
      //   http.getSiteByUrl("newsiteronit1").subscribe(data => {
      //   //http.getSiteByUrl(subDomains[0]).subscribe(data => {
      //    
      //       ser.viewerId = data.viewerId;
      //     ser.builderMode = false;

      //     ser.site = Site.fromServerObject(data.site);
      //     let allPages = ser.site.pages
      //     let config = router.config;
      //     let count;
      //     config=[{path:'',component:PreviewComponent,children:[]}];
      //     allPages.forEach(page => {
      //       count = 0
      //       let p = Page.fromServerObject(page)
      //       // let sections = data.sections.filter(s => s.pageId == p._id)
      //       let fullSections = p.sections
      //       // sections.forEach(s => {
      //       //   fullSections.push(Section.fromServerObject(s))
      //       // });
      //       ser.sectionsOfPage.push({ page: p, sections: fullSections })

      //       // add routes
      // config=[{path:'',component:PreviewComponent,children:[]}]
      //       if (!config.find(r => r.path == '').children.find(c => c.path == page.url)){
      //         config.find(r => r.path == '').children
      //           .push({ path: page.url, component: PreviewComponent });
      //           if(page.index==0)
      //           config.find(r => r.path == '').children
      //           .push({ path: '', component: PreviewComponent });
      //       }

      //     });

      //     router.resetConfig(config);
      //     console.log('routes', router.config)
      //     router.initialNavigation()
      //   }, e => {
      //    
      //     const notFound=router.config.find(r => r.path == '**')
      //     const config=[notFound]
      //     router.resetConfig(config)
      //     router.navigate(['/notFound'])
      //     return
      //   })

      // }
      // else {

      router.initialNavigation()
      // }
      resolve(this.config);

    });
  }
}