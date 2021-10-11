import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() item;
  @Input() dateChanged;
  intervalDate;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

    if ('dateChanged' in changes) {
      if (this.intervalDate)
        clearInterval(this.intervalDate);
      this.intervalDate = setInterval(() => {
        var countDownDate: Date = this.item.attributes['time'];
        var now = new Date();
        countDownDate = new Date(countDownDate)
        var distance = countDownDate.getTime() - now.getTime();
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.item.attributes['stringTime'] = days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ";

        if (distance < 0) {
          clearInterval(this.intervalDate);
          this.item.attributes['stringTime'] = this.item.attributes['massage']
        }

      }, 1000);
    }

  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    clearInterval(this.intervalDate);
  }

}
