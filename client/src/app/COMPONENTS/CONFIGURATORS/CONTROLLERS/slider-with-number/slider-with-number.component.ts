import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-slider-with-number',
  templateUrl: './slider-with-number.component.html',
  styleUrls: ['./slider-with-number.component.scss', '../../../configurator/configurator.component.scss']
})
export class SliderWithNumberComponent implements OnInit {
  @Output() changeStyles = new EventEmitter<any>();
  @Input() style: string = ''
  @Input() measureUnit: string = ''
  @Input() minValue
  @Input() maxValue
  @Input() img: string
  @Input() step
  @Input() stylesLocation = 'simpleStyles'
  @Input() icon: string
  constructor(public ser: DbService) { }

  ngOnInit(): void {
  }

}
