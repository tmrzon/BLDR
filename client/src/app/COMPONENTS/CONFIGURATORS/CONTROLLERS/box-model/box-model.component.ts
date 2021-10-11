import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';

@Component({
  selector: 'app-box-model',
  templateUrl: './box-model.component.html',
  styleUrls: ['./box-model.component.scss', '../../../configurator/configurator.component.scss']
})
export class BoxModelComponent implements OnInit {
 @Output() changeStyles = new EventEmitter<any>();
 lock: boolean = true
  constructor(public ser:DbService) { }

  ngOnInit(): void {
  }
  isEdit() {
    this.lock = !this.lock
  }
}
