import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-borders',
  templateUrl: './borders.component.html',
  styleUrls: ['./borders.component.scss', '../../../configurator/configurator.component.scss']
})
export class BordersComponent implements OnInit {
  @Output() changeStyles = new EventEmitter<any>();
  constructor(public ser: DbService) { }

  ngOnInit(): void {
  }

}
