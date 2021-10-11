import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
@Component({
  selector: 'app-no-sites',
  templateUrl: './no-sites.component.html',
  styleUrls: ['./no-sites.component.scss']
})
export class NoSitesComponent implements OnInit {
  flagOverItem: number = 0;
  overNewSite: boolean = false;
  constructor(public generalActionsSer: GeneralActionsService, public ser: DbService, public httpService: HttpService, public router: Router) { }
  ngOnInit(): void {
  }
  duplicateSite() {
    this.httpService.duplicateSite(this.ser.lastChooseVeiwSite).subscribe(d => { this.ser.sites.push(d.siteContent) }, e => { })
  }
  deleteSite(deleteSite) {
    this.ser.siteToDelete = this.ser.lastChooseVeiwSite;
    this.generalActionsSer.openModal(deleteSite, true);
  }
  noSites() {
    this.ser.newSite = true
  }

}
