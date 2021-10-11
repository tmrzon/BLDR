import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss', '../../../configurator/configurator.component.scss']
})
export class SelectsComponent implements OnInit {
  @Output() changeStyles = new EventEmitter<any>();
  @Input() style: string = ''
  @Input() default: string = ''
  options = {
    'font-family': ['Arial', 'serif', 'monospace', 'fantasy', 'Helvetica', 'sans-serif',
    'cursive', 'Courier New', 'Courier‏', 'Verdana‏', 'Georgia‏', 'Palatino‏',
    'Tahoma‏', 'Impact', 'Comic Sans MS', 'Times'],
    'font-weight':[ 'bold','normal','bolder','lighter','initial','inherit'],
    'background-size':['auto','contain','cover'],
    'animation-iteration-count':['1','3','5','7','10','infinite'],
    'animateColors':['colors','color-me-in'],
    'animatefadeIn':['fadeInRight','fadeInBottom','fadeIn','fadeInTop','fadeOut']
  };
  constructor() { }
  ngOnInit(): void {
  }

}
