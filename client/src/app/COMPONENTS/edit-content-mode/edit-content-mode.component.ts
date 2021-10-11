import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Site } from 'src/app/CLASSES/site';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-edit-content-mode',
  templateUrl: './edit-content-mode.component.html',
  styleUrls: ['./edit-content-mode.component.scss']
})
export class EditContentModeComponent implements OnInit {
  @ViewChild('iframeForContent') iframe: ElementRef

  constructor(private _sanitizer: DomSanitizer, private http: HttpService,
    public ser: DbService, public generalSer: GeneralActionsService, public router: Router) {
  }
  ngOnInit(): void {
    if (this.ser.site._id)
      this.ser.iframeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('/' + this.http.userName + '/preview')
    else
      this.http.getLastSite().subscribe(data => {

        let s = data;
        if (!s.site) {
          this.router.navigate(['/' + this.http.userName + '/myProjects'])
        }
        else {
          this.ser.site = Site.fromServerObject(s.site);
          this.ser.siteToConfig = this.ser.site;
          this.http.loadAllPages(s.site, true);
        }
      }, e => {
        console.log('error', e)
      })
  }
  ngAfterViewInit() {
    this.ser.iframeForContent = this.iframe
  }


}
