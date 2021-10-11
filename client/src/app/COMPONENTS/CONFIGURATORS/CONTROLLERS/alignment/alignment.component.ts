import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-alignment',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.scss', '../../../configurator/configurator.component.scss']
})
export class AlignmentComponent implements OnInit {
  @Output() changeStyles = new EventEmitter<any>();
  @Input() stylesLocation = 'simpleStyles'
  @Input() style: string = ''
  @Input() generalSetting = false
  constructor(public ser: DbService) { }

  ngOnInit(): void {

  }

}
