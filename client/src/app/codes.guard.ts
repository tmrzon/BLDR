import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpService } from './SERVICES/http-ser.service';

@Injectable({
  providedIn: 'root'
})
export class CodesGuard implements CanActivate {
  env = environment;
  isLoading = true;
  isLoggedIn = false;
  routes = window.location.pathname.split('/')[2];
  userName = window.location.pathname.split('/')[1];
  isFirstEntrance = true
  constructor(public httpSer: HttpService) {
    let params = (new URL(document.location.toString())).searchParams;
    let jwtGlobal = params.get('jwt');

    if (jwtGlobal) {
      let newUrl = window.location.href.split('?jwt=')[0]
      let date = new Date(Date.now() + 86400e3).toUTCString();
      var expires = "expires=" + date;
      document.cookie = this.env.JWT + "=" + jwtGlobal + ";" + expires + ";path=/";
      window.location.replace(newUrl)
    }
    let url = window.location



    ///////////

    // }, [])




  }
  redirectToLogin() {

    window.location.href = this.routes ?
      `https://dev.accounts.codes/bldr/login?routes=${this.routes}` :
      `https://dev.accounts.codes/bldr/login`;
    return null
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    const isLocal = window.location.hostname == "localhost"
    const isPermissionUrl = `${this.env.BASE_URL}${this.userName}/isPermission?isLocal=${isLocal}`;
    return new Promise(async (resolve, reject) => {
      if (this.isFirstEntrance) {
        this.isFirstEntrance = false
        if (this.userName == '')
          this.redirectToLogin()
        this.httpSer.fetchAcounts().subscribe(async (u) => {
          this.userName = u.user.username
          this.httpSer.uId = u.user.uid
          let user = document.cookie.includes('jwt') ? document.cookie.split(";")
            .filter(s => s.includes('jwt'))[0].split("=").pop() : '';
          let response = await fetch(isPermissionUrl, {
            method: 'GET',
            headers: {
              Authorization: user,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          })
          if (response.status == 401) {
            this.isLoading = false
            this.isLoggedIn = true
            this.redirectToLogin()
            resolve(false)

          }
          else {
            this.isLoading = false
            resolve(true)
          }
        }, e => {
          // if (response.status == 401) {
          this.isLoading = false
          this.isLoggedIn = true
          this.redirectToLogin()
          resolve(false)
          // }
        })
      }

      else {
        let user = document.cookie.includes('jwt') ? document.cookie.split(";")
          .filter(s => s.includes('jwt'))[0].split("=").pop() : '';
        let response = await fetch(isPermissionUrl, {
          method: 'GET',
          headers: {
            Authorization: user,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        })
        if (response.status == 401) {
          this.isLoading = false
          this.isLoggedIn = true
          this.redirectToLogin()
          resolve(false)

        }
        else {
          this.isLoading = false
          resolve(true)
        }
      }
      // }   
      //  isPermission()
    })

    // if (this.isLoggedIn)
    //   return true
    // else {
    //   this.redirectToLogin()
    //   return false
    // }

  }

}
