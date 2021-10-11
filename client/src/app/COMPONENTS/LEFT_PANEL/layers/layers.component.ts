import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {
  openLayer = false;
  constructor(public ser: DbService) {
  }
  ngOnInit(): void {
  }
  getLayers(event) {
    event.stopPropagation()
    event.target.parentElement.parentElement.querySelector(".nested").classList.toggle("active");
    event.target.classList.toggle("caret-down");
  }
  getMoreLayers(event) {
    event.stopPropagation()
    event.target.parentElement.parentElement.parentElement.querySelector(".nested").classList.toggle("active");
    event.target.classList.toggle("caret-down");
  }
}
