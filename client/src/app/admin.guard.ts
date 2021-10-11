import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { DbService } from './SERVICES/db.service';
import { HttpService } from './SERVICES/http-ser.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router, private dbSer: DbService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.httpService.isLoggedIn) {
      return true;
    }
    else {
      return this.router.navigate(["/login", { des: window.location.pathname.split('/')[2] }]);
    }
  }

}
