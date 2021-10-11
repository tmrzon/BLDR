import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shadows',
  templateUrl: './shadows.component.html',
  styleUrls: ['./shadows.component.scss', '../../../configurator/configurator.component.scss']
})
export class ShadowsComponent implements OnInit {
  @Output() changeStyles = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  stop(event) {
    event.stopPropagation()
  }

}
