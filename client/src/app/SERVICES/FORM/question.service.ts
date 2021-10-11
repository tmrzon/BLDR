import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { DropdownQuestion } from 'src/app/CLASSES/FORM/dropdown-question';
import { QuestionBase } from 'src/app/CLASSES/FORM/question-base';
import { TextboxQuestion } from 'src/app/CLASSES/FORM/textbox-question';
import { TextareaQuestion } from 'src/app/CLASSES/FORM/textarea-question';
import { RadioQuestion } from 'src/app/CLASSES/FORM/radio-question';
import { CheckboxQuestion } from 'src/app/CLASSES/FORM/checkbox-question';

enum ControlTypes {
  Checkbox = 'checkbox',
  Dropdown = 'dropdown',
  Radio = 'radio',
  Textarea = 'textarea',
  Textbox = 'textbox'
};
@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor() { }

  static eControlTypes = ControlTypes;
  order = 1;
  questions: QuestionBase<string>[] = null;
  // TODO: get from a remote source of question metadata
  getQuestions() {

    if (this.questions == null) {
      this.questions = [

        // new DropdownQuestion({
        //   key: 'brave',
        //   label: 'Bravery Rating',
        //   options: [
        //     {key: 'solid',  value: 'Solid'},
        //     {key: 'great',  value: 'Great'},
        //     {key: 'good',   value: 'Good'},
        //     {key: 'unproven', value: 'Unproven'}
        //   ],
        //   order: 3
        // }),

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


    return of(this.questions.sort((a, b) => a.order - b.order));
  }

  addTextBoxQuestion() {

    this.questions.push(new TextboxQuestion({
      key: 'newInput',
      label: 'New Input',
      type: 'text',
      required: false,
      order: this.order++
    }));
  }

  addDropdownQuestion() {
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
    this.questions.push(new TextareaQuestion({
      key: 'newTextarea',
      label: 'new Textarea',
      required: false,
      order: this.order++
    }));
  }

  addCheckboxQuestion() {
    this.questions.push(new CheckboxQuestion({
      key: 'newCheckbox',
      label: 'New Checkbox',
      required: false,
      order: this.order++
    }));
  }

  addRadioQuestion() {
    this.questions.push(new RadioQuestion({
      key: 'newRadio',
      label: 'New Radio',
      required: false,
      order: this.order++
    }));
  }

  removeQuestion(question) {
    let i = this.questions.findIndex(q => q.order == question.order);
    this.questions.splice(i, 1);
  }
}
