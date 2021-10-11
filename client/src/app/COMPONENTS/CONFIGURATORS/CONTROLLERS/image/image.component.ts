import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss', '../../../configurator/configurator.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() imgToChange: string = ''
  @Input() src: string = ''
  constructor(public ser:DbService, public generalActionsSer: GeneralActionsService) { }

  ngOnInit(): void {
  }

}
