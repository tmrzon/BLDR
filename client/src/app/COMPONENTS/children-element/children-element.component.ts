import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/CLASSES/item';

@Component({
  selector: 'app-children-element',
  templateUrl: './children-element.component.html',
  styleUrls: ['./children-element.component.css']
})
export class ChildrenElementComponent implements OnInit {

  @Input()children:Array<Item>=[];
  constructor() { }

  ngOnInit(): void {
  }

}
