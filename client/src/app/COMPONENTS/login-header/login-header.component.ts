import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from 'src/app/CLASSES/site';
import { DbService } from 'src/app/SERVICES/db.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {

  @Input() userName
  @Input() appName
  jwt
  user = ''
  userImg = ''
  openUserComponent = false
  constructor(public httpSer: HttpService, public router: Router, public ser: DbService,) { }

  ngOnInit(): void {
    document.addEventListener('click', this.closeUserComponent);
    this.getUser(this.userName)
  }
  closeUserComponent(event) {
    if (!event.target.closest('#LC_userComponent'))
      this.openUserComponent = false
  }
  getUser(userName) {

    this.ser.appLoader = false

    // let jwtFromCookie = document.cookie.includes('jwt') ? document.cookie.split(";").filter(function (s) {
    //   return s.includes('jwt');
    // })[0].split("=").pop() : document.cookie.includes('devJwt') ? document.cookie.split(";").filter(function (s) {
    //   return s.includes('devJwt');
    // })[0].split("=").pop() : null;
    // this.jwt = jwtFromCookie ? jwtFromCookie : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJJclJCaTlyamFXYndLQVZKQkZ6UmZNSUN0NXEyIiwiZW1haWwiOiJ5aTQxNDk0MTFAZ21haWwuY29tIiwiaWF0IjoxNjEzMjUwOTEwfQ.vLfr9LDavL2FrsoStrLePfziGx7yuCPzano_uX5KulY';
    // this.httpSer.headers = this.httpSer.headers.append('Authorization', this.jwt);
    // this.httpSer.getBldrUser().subscribe(res => {
    //   // console.log(JSON.parse(r));
    //   // let res = JSON.parse(r)
    //   this.user = res.user;
    //   this.userImg = res.user.imgProfile ? res.user.imgProfile : '';
    //   this.httpSer.user = res.user
    // }, e => {
    //   console.log('error', e);
    // })
    this.httpSer.fetchAcounts().subscribe(res => {

      // console.log(JSON.parse(r));
      // let res = JSON.parse(r)
      this.user = res.user;
      this.userImg = res.user.imgProfile ? res.user.imgProfile : '';

    }, e => {

      window.location.href =
        'https://dev.accounts.codes/bldr/login?routes=myProjects'
      console.log('error', e);
    })
    // fetch("https://accounts.codes/api/" + userName, {
    //   method: 'GET',
    //   headers: {
    //     'authorization': this.jwt
    //   }
    // }).then(function (response) {
    //   return response.text();
    // }).then(function (result) {
    //   console.log(JSON.parse(result));
    //   let res = JSON.parse(result)
    //   this.user = res.user;
    //   this.userImg = JSON.parse(result).user.imgProfile ? JSON.parse(result).user.imgProfile : '';
    // })["catch"](function (error) {
    //   
    //   return console.log('error', error);
    // });
  }
  signOut() {

    document.cookie.includes('devJwt') ? document.cookie = "devJwt=devJwt; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;" : document.cookie = "jwt=jwt; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('Sign out');
    window.location.href = "https://dev.accounts.codes/bldr/login?signout";
  }
  logIn() {

    window.location.href = "https://dev.accounts.codes/bldr/login";
  }
  myProfile() {
    window.open("https://lobby.dev.leader.codes/" + this.userName + "/profile");
  }
}
