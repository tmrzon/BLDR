import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  static colors = ['#40D9ED', '#3598F4', '#B620E0', '#FD808B', '#F13B7F', '#8dd117'];
  @Output() changeStyles = new EventEmitter<any>();
  @Input() style: string = ''
  @Input() styleLocation = 'simpleStyles'
  @Input() isCol = false
  @Input() generalSetting = false
  selectedColor: string
  constructor(public ser: DbService) {
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {

    if (this.isCol)
      this.selectedColor = this.ser.lastCol.styles[this.style]
    else
      if (this.generalSetting)
        this.selectedColor = this.ser.site.generalSetting[this.styleLocation][this.style]
      else
        this.selectedColor = this.ser.lastItem.styles[this.styleLocation][this.style]
  }
  stop(event) {
    event.stopPropagation()
  }
  addColor(value) {

    ColorsComponent.colors.splice(0, 1)
    ColorsComponent.colors.push(value)
  }
  get staticColors() {
    return ColorsComponent.colors
  }
  ngOnChanges() {
  }
}

