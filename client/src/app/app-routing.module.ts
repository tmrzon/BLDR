import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './COMPONENTS/frame/frame.component';
import { PreviewComponent } from './COMPONENTS/preview/preview.component';
import { NotFoundComponent } from './COMPONENTS/not-found/not-found.component';
import { AllPagesComponent } from './COMPONENTS/LEFT_PANEL/all-pages/all-pages.component';
import { AllSitesComponent } from './COMPONENTS/all-sites/all-sites.component';
import { StatisticsComponent } from './COMPONENTS/statistics/statistics.component';
import { UserPagesGuard } from './user-pages.guard'
import { CodesGuard } from './codes.guard'
import { EditContentModeComponent } from './COMPONENTS/edit-content-mode/edit-content-mode.component';
const routes: Routes = [
  { path: '', canActivate: [CodesGuard], component: NotFoundComponent },
  { path: ':userName/preview', component: PreviewComponent },
  {
    path: ':userName', canActivate: [CodesGuard], component: FrameComponent, children: [
      { path: '', redirectTo: 'myProjects', pathMatch: 'full' },
      { path: 'myProjects', component: AllSitesComponent },
      { path: 'editProject', component: EditContentModeComponent }
    ]
  },
  {
    path: ':userName/livePreview', canActivate: [CodesGuard], component: PreviewComponent, children: [
      { path: '', canActivate: [UserPagesGuard], component: PreviewComponent }
    ]
  },
  { path: ':userName/statistics', component: StatisticsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
