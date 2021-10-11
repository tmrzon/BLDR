import { Component, OnInit } from '@angular/core';
import { BuilderService } from 'src/app/SERVICES/builder.service';
import { ConfiguratorService } from 'src/app/SERVICES/configurator.service';
import { DbService } from 'src/app/SERVICES/db.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';

@Component({
  selector: 'app-c-form',
  templateUrl: './c-form.component.html',
  styleUrls: ['./c-form.component.scss', '../../configurator/configurator.component.scss']
})
export class CFormComponent implements OnInit {
  kindOfBorderForm = 'solid ';
  flagTextShadow: boolean = false
  flagBoxShadow: boolean = false
  kindOfBorder = 'solid ';
  constructor(public configuratorSer: ConfiguratorService, public ser: DbService, public builderSer: BuilderService, public generalActionsSer: GeneralActionsService) { }

  ngOnInit(): void {
  }
  changeStyles(name, value, value2?, value3?, event?) {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStyles', params: [name, value, value2, value3, event] }), '*')
  }
  changeStylesG(keys, value, actionType = 'style') {
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeStylesG', params: [keys, value, actionType] }), '*')
  }


  changeFormInput(question, value) {

    question.key = question.label = value
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeFormInput', params: [question, value] }), '*')

  }
  changeTextShadow() {
    this.flagTextShadow = !this.flagTextShadow
    if (this.flagTextShadow == false) {
      this.changeStyles('text-shadow', 'none')
    }
  }
  changeBoxShadow() {
    this.flagBoxShadow = !this.flagBoxShadow;
    if (this.flagBoxShadow == false) {

      this.changeStyles('box-shadow', 'none')
    }
  }
  changeInputsInForm(question, event) {

    question.enable = event.currentTarget.checked;
    this.ser.iframeForContent.nativeElement.contentWindow.postMessage(JSON.stringify({ function: 'changeInputInForm', params: [question, event.currentTarget.checked] }), '*')

  }

}
