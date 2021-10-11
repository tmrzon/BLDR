import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[paintRangeInput]'
})
export class InitRangeInputDirective {
  @Input('colorValue') colorValue: string
  constructor(public range: ElementRef) {

  }

  ngOnChanges() {
    let half = ((parseFloat(this.colorValue) - this.range.nativeElement.min) / (this.range.nativeElement.max - this.range.nativeElement.min)) * 100
    this.range.nativeElement.style.background = 'linear-gradient(to right, #fbcd4f 0%, #fbcd4f ' + half + '%, #fff ' + half + '%, white 100%)'
  }
}
