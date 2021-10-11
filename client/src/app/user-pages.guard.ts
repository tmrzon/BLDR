import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Section } from './CLASSES/section';
import { DbService } from './SERVICES/db.service';
import { GeneralActionsService } from './SERVICES/general-actions.service';
import { HttpService } from './SERVICES/http-ser.service';

@Injectable({
  providedIn: 'root'
})
export class UserPagesGuard implements CanActivate {
  constructor(public router: Router, public ser: DbService, public gActionsSer: GeneralActionsService, public http: HttpService) {
    this.ser.builderMode = false;
    this.http.userName = location.pathname.split('/')[1]
    if (window.location.href.search('livePreview') != -1)
      this.gActionsSer.loadSite(JSON.parse(localStorage.getItem('site')))

    this.ser.prefixUrlForHeader = '/' + this.http.userName + '/livePreview/'

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let pageUrl = next.routeConfig.path
    let page
    if (this.ser.site.pages.find(p => p.url == pageUrl))
      page = this.ser.site.pages.find(p => p.url == pageUrl)
    else
      page = this.ser.site.notFoundPage
    if (page.permission == 'protected') {
      let password = prompt('Enter page password')
      if (password != page.password) {
        alert('invalid password')
        return false
      }
    }
    this.ser.currentPage = page
    return true
  }

}
