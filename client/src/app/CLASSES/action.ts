import { Item } from './item';
import { formatDate } from '@angular/common';
import { Row } from './row';
import { Col } from './col';
import { AnyAaaaRecord } from 'dns';
export class Action {
    static indexGlobal=0;
    constructor(
        public date = '',
        public index=null,
        public style:any={'color':'white'},
        public name: string = '',
        public whatChange: string = '',
        public description:any='',
        public theObject: any = null,
        public previous: any = null,
        public current: any = null,
        public divStylePrev: any = null,
        public divStyleCurr: any = null) {
        if (this.date == '')
            this.date = formatDate(Date.now(), 'hh:mm:ss.SSS', 'en-US');
        if(index==null)
            this.index=Action.indexGlobal++;
        else
            this.index=index;
        this.name = name;
        this.whatChange = whatChange;
        this.description=description;
        this.theObject = theObject;
        this.current = current;
        this.previous = previous;
        this.divStylePrev = divStylePrev;
        this.divStyleCurr = divStyleCurr;
    }

    objToServer(obj){
        let myObject;
        if(!obj)
        return
        if(obj.theObject){
            myObject = (obj as Action).toServerObject();
            return  
        }
        if (obj.rows) {
            myObject = (obj as Item).toServerObject();
        }
        else
            if (obj.cols) {
                myObject = (obj as Row).toServerObject();
            }
            else
                if (obj.items) {
                    myObject = (obj as Col).toServerObject();
                }
                else
                    if(obj.simpleStyles)
                        myObject={
                            simpleStyles: Object.assign({}, obj.simpleStyles),
                            spanStyles: Object.assign({}, obj.spanStyles),
                            divStyles: Object.assign({}, obj.divStyles),
                            divStylesHeader: Object.assign({}, obj.divStylesHeader),
                            imgStylesHeader: Object.assign({}, obj.imgStylesHeader),
                            formInputsStyle: Object.assign({}, obj.formInputsStyle)
                        }
                    else
                        if(typeof obj=='object')
                           myObject=Object.assign({},obj);
                        else
                            myObject=obj;
        return myObject;
    }

    static objFromServer(obj){
        let object;
        if(!obj)
        return
        if(obj.theObject){
            object =Action.fromServerObject(obj);
            return  
        }
        if (obj.rows) {
            object = Item.fromServerObject(obj, null);
        }
        else
            if (obj.cols) {
                object = Row.fromServerObject(obj, null);
            }
            else
                if (obj.items) {
                    object = Col.fromServerObject(obj, null);
                }
                else
                if(obj.simpleStyles)
                object={
                    simpleStyles: Object.assign({}, obj.simpleStyles),
                    spanStyles: Object.assign({}, obj.spanStyles),
                    divStyles: Object.assign({}, obj.divStyles),
                    divStylesHeader: Object.assign({}, obj.divStylesHeader),
                    imgStylesHeader: Object.assign({}, obj.imgStylesHeader),
                    formInputsStyle: Object.assign({}, obj.formInputsStyle)
                }
            else
                if(typeof obj=='object')
                   object=Object.assign({},obj);
                else
                    object=obj;
        return object;
    }

    toServerObject() {
        let action = {
            date: this.date,
            index:this.index,
            style:this.style,
            name: this.name,
            whatChange: this.whatChange,
            description:this.description,
            theObject: null,
            current: null,
            previous: null,
            divStylePrev: this.divStylePrev,
            divStyleCurr: this.divStyleCurr
        };
        action.theObject=this.objToServer(this.theObject);
        action.previous=this.objToServer(this.previous);
        action.current=this.objToServer(this.current);
        return action;
    }

    static fromServerObject(action) {
        let newAction = new Action(action.date,action.index,action.style,action.name, action.whatChange,action.description,this.objFromServer(action.theObject),
            this.objFromServer(action.previous), this.objFromServer(action.current), action.divStylePrev, action.divStyleCurr);

        return newAction;
    }
}
