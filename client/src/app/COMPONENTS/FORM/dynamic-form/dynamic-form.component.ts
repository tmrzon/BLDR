import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/CLASSES/FORM/question-base';
import { Item } from 'src/app/CLASSES/item';
import { DbService } from 'src/app/SERVICES/db.service';
import { QuestionControlService } from 'src/app/SERVICES/FORM/question-control.service';
import { QuestionService } from 'src/app/SERVICES/FORM/question.service';
import { GeneralActionsService } from 'src/app/SERVICES/general-actions.service';
import { HttpService } from 'src/app/SERVICES/http-ser.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() item;
  myForm: FormGroup;
  questions: QuestionBase<string>[] = [];
  myQuestions;
  constructor(public qs: QuestionService, public qcs: QuestionControlService,
    private http: HttpService, private gActionsSer: GeneralActionsService, public ser: DbService) { }
  ngOnInit(): void {
    this.myForm = this.qcs.toFormGroup(this.item.children);
  }
  onSubmit(form: FormGroup) {
    if (this.ser.builderMode)
      return;
    let saveContact = this.ser.lastItem.children.find(c => c.type == 'email').saveContact;
    if (form.value.email && saveContact)
      this.gActionsSer.createContactToServer(form.value.email);
    this.gActionsSer.createMessage(form);
  }

}
