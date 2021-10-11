import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-slider-fill',
  templateUrl: './slider-fill.component.html',
  styleUrls: ['./slider-fill.component.scss']
})
export class SliderFillComponent implements OnInit {

  @Output() changeStyles = new EventEmitter<any>();
  @Input() style: string = ''
  @Input() measureUnit: string = ''
  @Input() minValue
  @Input() maxValue
  @Input() step
  @Input() stylesLocation = 'simpleStyles'
  constructor(public ser: DbService) { }

  ngOnInit(): void {
  }
}
