import { DbService } from "src/app/SERVICES/db.service";
import { Item } from "../item";
import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { DropdownQuestion } from 'src/app/CLASSES/FORM/dropdown-question';
import { QuestionBase } from 'src/app/CLASSES/FORM/question-base';
import { TextboxQuestion } from 'src/app/CLASSES/FORM/textbox-question';
import { TextareaQuestion } from 'src/app/CLASSES/FORM/textarea-question';
import { RadioQuestion } from 'src/app/CLASSES/FORM/radio-question';
import { CheckboxQuestion } from 'src/app/CLASSES/FORM/checkbox-question';
import { QuestionControlService } from "src/app/SERVICES/FORM/question-control.service";
import { QuestionService } from "src/app/SERVICES/FORM/question.service";


export class Form {

  public item: Item;
  order = 1;
  questions: QuestionBase<string>[] = [];
  form: Item;
  qs: QuestionService;
  constructor() {
    this.form = new Item('form');
    this.form.children = [
      {
        // ['input'+this.order.toString()]:{
        'order': this.order++,
        'key': 'name',
        'controlType': QuestionService.eControlTypes.Textbox,
        'label': 'First name',
        'type': 'text',
        'required': false,
        'enable': true
        // }  
      },
      {
        //  ['input'+this.order.toString()]:{
        'order': this.order++,
        'key': 'email',
        'controlType': QuestionService.eControlTypes.Textbox,
        'label': 'Email',
        'type': 'email',
        'required': true,
        'enable': true,
        'saveContact': true
        // } 
      },
      {
        // ['input'+this.order.toString()]:{
        'order': this.order++,
        'key': 'message',
        'controlType': QuestionService.eControlTypes.Textarea,
        'label': 'Message',
        'required': true,
        'enable': true
        // }  
      }
    ]


    this.questions = [

      new TextboxQuestion({
        key: 'name',
        label: 'First name',
        type: 'text',
        order: this.order++
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        order: this.order++
      }),

      new TextareaQuestion({
        key: 'message',
        label: 'Message',
        // value: 'Bombasto',
        required: true,
        order: this.order++
      })
    ];
  }

  getQuestions() {
    return of(this.questions.sort((a, b) => a.order - b.order));
  }

  addTextBoxQuestion() {

    this.form.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newInput',
      'controlType': QuestionService.eControlTypes.Textbox,
      'label': 'New Input',
      'type': 'text',
      'required': false
      // }
    });

    this.questions.push(new TextboxQuestion({
      key: 'newInput',
      label: 'New Input',
      type: 'text',
      required: false,
      order: this.order++
    }));
  }

  addDropdownQuestion() {

    this.form.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newDropdown',
      'controlType': QuestionService.eControlTypes.Dropdown,
      'label': 'new Dropdown',
      'options': [
        { 'key': 'option1', 'value': 'Option 1' },
        { 'key': 'option2', 'value': 'Option 2' },
        { 'key': 'option3', 'value': 'Option 3' }
      ]
      // }
    });

    this.questions.push(new DropdownQuestion({
      key: 'newDropdown',
      label: 'new Dropdown',
      options: [
        { key: 'option1', value: 'Option 1' },
        { key: 'option2', value: 'Option 2' },
        { key: 'option3', value: 'Option 3' }
      ],
      order: this.order++
    }));
  }

  addTextareaQuestion() {
    this.form.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newTextarea',
      'controlType': QuestionService.eControlTypes.Textarea,
      'label': 'New Textarea',
      'required': false
      // }
    });

    this.questions.push(new TextareaQuestion({
      key: 'newTextarea',
      label: 'new Textarea',
      required: false,
      order: this.order++
    }));
  }

  addCheckboxQuestion() {
    this.form.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newCheckbox',
      'controlType': QuestionService.eControlTypes.Checkbox,
      'label': 'New Checkbox',
      'required': false
      // }
    });

    this.questions.push(new CheckboxQuestion({
      key: 'newCheckbox',
      label: 'New Checkbox',
      required: false,
      order: this.order++
    }));
  }

  addRadioQuestion() {
    this.form.children.push({
      // ['input'+this.order.toString()]:{
      'order': this.order++,
      'key': 'newRadio',
      'controlType': QuestionService.eControlTypes.Textbox,
      'label': 'New Radio',
      'required': false
      // }
    });

    this.questions.push(new RadioQuestion({
      key: 'newRadio',
      label: 'New Radio',
      required: false,
      order: this.order++
    }));
  }

  removeQuestion(question) {
    let index = this.form.children.findIndex(q => q.order == question.order);
    this.questions.splice(index, 1);

    let i = this.questions.findIndex(q => q.order == question.order);
    this.questions.splice(i, 1);
  }
}
