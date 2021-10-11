import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChange } from "@angular/core";
import { Action } from '../CLASSES/action';
import { ActionsHistoryService } from "../SERVICES/actions-history.service";
import { DbService } from '../SERVICES/db.service';

@Directive({
    selector: '[contenteditableModel]',
    host: {
        '(blur)': 'onEdit()',
        '(keyup)': 'onEdit()'
    }
})
export class ContentEditableDirective implements OnChanges {

    @Input('contenteditableModel') model: any;
    @Input('key') key: any;

    @Output('contenteditableModelChange') update = new EventEmitter();

    constructor(
        private elementRef: ElementRef, private ser: DbService,public historySer:ActionsHistoryService
    ) {
        console.log('ContentEditableDirective.constructor');

    }

    ngOnChanges(changes) {
        console.log('ContentEditableDirective.ngOnChanges');
        console.log(changes);
        // if (changes.model.isFirstChange())
        this.refreshView();
    }

    onEdit() {
        console.log('ContentEditableDirective.onEdit');
        var value = this.elementRef.nativeElement.innerText;
        let action = new Action();
        action.name = 'change';
        action.theObject = this.ser.lastItem;
        // if(this.key){
        //     switch (this.key) {
        //         case "accordion":
        //             action.whatChange ='accordion';
        //             action.previous = this.ser.lastChooseItem.attributes['accordion'];
        //             this.ser.lastChooseItem.attributes['accordion']=value
        //           break;

        //     }
        // }

        action.whatChange = 'content';
        action.previous = this.ser.lastItem.textContent;
        this.ser.lastItem.textContent = value;
        action.current = this.ser.lastItem.textContent;


        this.historySer.prevStack.push(action);
        this.historySer.nextStack.clearStack();

        // this.ser.lastChooseItem.textContent = value;
        this.update.emit(value)
    }

    private refreshView() {
        console.log('ContentEditableDirective.refreshView');
        this.elementRef.nativeElement.textContent = this.model
    }
}
