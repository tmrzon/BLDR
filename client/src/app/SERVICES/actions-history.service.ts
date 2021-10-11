import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Action } from '../CLASSES/action';
import { Stack } from '../CLASSES/stack';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsHistoryService {

  prevStack: Stack = new Stack();
  nextStack: Stack = new Stack();
  arrToHistory = []

  constructor(public ser: DbService) { }

  undoAdd(action: Action) {
    let prev = action.theObject;
    let parentPrev;
    if (prev.parentItem != undefined)
      parentPrev = prev.parentItem;
    else
      if (prev.parentRow != undefined)
        parentPrev = prev.parentRow;
      else
        parentPrev = prev.parentCol;
    switch (action.whatChange) {
      case 'Tile':
        if (prev.parentItem != undefined) {
          parentPrev.rows.splice(prev.index, 1);
          parentPrev.rows.forEach(item => {
            if (item.index != parentPrev.rows.indexOf(item))
              item.index = parentPrev.rows.indexOf(item)
          });
        } else
          if (prev.parentRow != undefined) {
            parentPrev.cols.splice(prev.index, 1);
            parentPrev.cols.forEach(item => {
              if (item.index != parentPrev.cols.indexOf(item))
                item.index = parentPrev.cols.indexOf(item)
            });
          }
        break;
      case 'Grid':
      default:
        parentPrev.items.splice(prev.index, 1);
        parentPrev.items.forEach(item => {
          if (item.index != parentPrev.items.indexOf(item))
            item.index = parentPrev.items.indexOf(item)
        });
        if (action.whatChange != 'Grid') {
          let i = DbService.globalWidgets.indexOf(action.theObject);
          DbService.globalWidgets.splice(i, 1);
        }
        break;
    }
  }

  undoRemove(action: Action) {
    let prev = action.theObject;
    let parentPrev;
    if (prev.parentItem != undefined)
      parentPrev = prev.parentItem;
    else
      if (prev.parentRow != undefined)
        parentPrev = prev.parentRow;
      else
        parentPrev = prev.parentCol;
    switch (action.whatChange) {
      case 'Tile':
        if (prev.parentItem != undefined) {
          parentPrev.rows.splice(prev.index, 0, prev);
          parentPrev.rows.forEach(item => {
            if (item.index != parentPrev.rows.indexOf(item))
              item.index = parentPrev.rows.indexOf(item)
          });
        } else
          if (prev.parentRow != undefined) {
            parentPrev.cols.splice(prev.index, 0, prev);
            parentPrev.cols.forEach(item => {
              if (item.index != parentPrev.cols.indexOf(item))
                item.index = parentPrev.cols.indexOf(item)
            });
          }
        break;
      case 'Grid':
      default:
        parentPrev.items.splice(prev.index, 0, prev);
        parentPrev.items.forEach(item => {
          if (item.index != parentPrev.items.indexOf(item))
            item.index = parentPrev.items.indexOf(item)
        });
        if (action.whatChange != 'Grid') {
          let i = DbService.globalWidgets.push(action.theObject);
        }
        break;
    }
  }

  undoChange(lastAction: Action) {
    if (typeof lastAction.previous == 'object')
      lastAction.current = Object.assign({}, lastAction.previous);
    else
      lastAction.current = lastAction.previous
    switch (lastAction.whatChange) {
      case 'style':
        for (const styleType in lastAction.current) {
          lastAction.current[styleType] = Object.assign({}, lastAction.previous[styleType])
          for (const key in lastAction.current[styleType]) {
            lastAction.previous[styleType][key] = lastAction.theObject.styles[styleType][key];
            lastAction.theObject.styles[styleType][key] = lastAction.current[styleType][key];
          }
        }
        break;
      case 'properties':
        lastAction.previous = Object.assign({}, lastAction.theObject.attributes);
        Object.keys(lastAction.current).forEach(k => {
          lastAction.theObject.attributes[k] = lastAction.current[k];
        });
        break;
      case 'content':
        lastAction.previous = lastAction.theObject.textContent
        lastAction.theObject.textContent = lastAction.current
        break;
      default:
        if (lastAction.divStylePrev) {
          lastAction.divStylePrev = lastAction.theObject.divStyles[lastAction.divStyleCurr.name]
          lastAction.theObject.divStyles[lastAction.divStyleCurr.name] = lastAction.divStyleCurr.value;
        }
        break;
    }
  }

  undo(action?) {
    let lastAction: Action;
    if (action) {
      let i = this.prevStack.getStack().indexOf(action);
      this.prevStack.getStack().splice(i, 1);
      lastAction = action;
    }
    else
      lastAction = this.prevStack.pop();
    if (lastAction) {
      let prev = lastAction.theObject;
      let parentPrev; switch (lastAction.name) {
        case 'drop':
          switch (lastAction.whatChange) {
            case 'Tile':
              this.undoAdd(lastAction);
              lastAction.current = lastAction.theObject.parentRow;
              lastAction.divStyleCurr = Object.assign({}, lastAction.theObject.index);
              lastAction.theObject._parentRow = lastAction.previous;
              lastAction.theObject.index = lastAction.divStylePrev;
              this.undoRemove(lastAction);
              if (lastAction.current.cols.length < 2) {
                let action = new Action();
                action.theObject = lastAction.current;
                action.whatChange = 'Tile';
                this.undoRemove(action);
              }
              break;
            default:
              this.undoAdd(lastAction);
              lastAction.current = lastAction.theObject.parentCol;
              lastAction.divStyleCurr = Object.assign({}, lastAction.theObject.index);
              lastAction.theObject._parentCol = lastAction.previous;
              lastAction.theObject.index = lastAction.divStylePrev;
              this.undoRemove(lastAction);
              break;
          }
          break;
        case 'copy':
        case 'add':
          this.undoAdd(lastAction);
          break;
        case 'remove':
          this.undoRemove(lastAction);
          break;
        case 'change':
          if (lastAction.theObject.globalWidgetName && lastAction.theObject.description != 'single') {
            let temp = lastAction.theObject;
            let myAction = Action.fromServerObject(lastAction.toServerObject())
            DbService.globalWidgets.forEach(x => {
              if (x.globalWidgetName == temp.globalWidgetName &&
                !(x.singleProperties.find(x => x == lastAction.description))) {
                lastAction = Action.fromServerObject(myAction.toServerObject());
                lastAction.theObject = x;
                this.undoChange(lastAction);
              }
            })
            lastAction.theObject = temp;
            let obj = lastAction.theObject.toServerObject();
            this.ser.site.globalWidgetsName.find(g => g.name == lastAction.theObject.globalWidgetName).object = obj;
          }
          else {
            this.undoChange(lastAction);
            if (lastAction.theObject.description == 'single') {
              lastAction.current = 'single';
              lastAction.theObject.description = lastAction.theObject.globalWidgetName;
              let i = lastAction.theObject.singleProperties.findIndex(x => x == lastAction.description);
              lastAction.theObject.singleProperties.splice(i, 1);
            }
          }
          break;
      }
      lastAction.style = { 'color': '#cecccc' };
      this.nextStack.push(lastAction);
    }
  }

  redoAdd(action: Action) {
    let prev = action.theObject;
    let parentPrev;
    if (prev.parentItem != undefined)
      parentPrev = prev.parentItem;
    else
      if (prev.parentRow != undefined)
        parentPrev = prev.parentRow;
      else
        parentPrev = prev.parentCol;
    switch (action.whatChange) {
      case 'Section':
        break;
      case 'Tile':
        if (prev.parentItem != undefined) {
          parentPrev.rows.splice(prev.index, 0, prev);
          parentPrev.rows.forEach(item => {
            if (item.index != parentPrev.rows.indexOf(item))
              item.index = parentPrev.rows.indexOf(item)
          });
        } else
          if (prev.parentRow != undefined) {
            parentPrev.cols.splice(prev.index, 0, prev)
            parentPrev.cols.forEach(item => {
              if (item.index != parentPrev.cols.indexOf(item))
                item.index = parentPrev.cols.indexOf(item)
            });
          }
        break;
      case 'Grid':
      default:
        parentPrev.items.splice(prev.index, 0, prev)
        parentPrev.items.forEach(item => {
          if (item.index != parentPrev.items.indexOf(item))
            item.index = parentPrev.items.indexOf(item)
        });
        if (action.whatChange != 'Grid') {
          let i = DbService.globalWidgets.push(action.theObject);
        }
        break;
    }
  }

  redoRemove(action: Action) {
    let prev = action.theObject;
    let parentPrev;
    if (prev.parentItem != undefined)
      parentPrev = prev.parentItem;
    else
      if (prev.parentRow != undefined)
        parentPrev = prev.parentRow;
      else
        parentPrev = prev.parentCol;
    switch (action.whatChange) {
      case 'Tile':
        if (prev.parentItem != undefined) {
          parentPrev.rows.splice(prev.index, 1);
          parentPrev.rows.forEach(item => {
            if (item.index != parentPrev.rows.indexOf(item))
              item.index = parentPrev.rows.indexOf(item)
          });
        } else
          if (prev.parentRow != undefined) {
            parentPrev.cols.splice(prev.index, 1);
            parentPrev.cols.forEach(item => {
              if (item.index != parentPrev.cols.indexOf(item))
                item.index = parentPrev.cols.indexOf(item)
            });
          }
        break;
      case 'Grid':
      default:
        parentPrev.items.splice(prev.index, 1);
        parentPrev.items.forEach(item => {
          if (item.index != parentPrev.items.indexOf(item))
            item.index = parentPrev.items.indexOf(item)
        });
        if (action.whatChange != 'Grid') {
          let i = DbService.globalWidgets.indexOf(action.theObject);
          DbService.globalWidgets.splice(i, 1);
        }
        break;
    }
  }

  redoChange(lastAction) {
    if (typeof lastAction.previous == 'object')
      lastAction.current = Object.assign({}, lastAction.previous);
    else
      lastAction.current = lastAction.previous
    switch (lastAction.whatChange) {
      case 'style':
        for (const styleType in lastAction.current) {
          lastAction.current[styleType] = Object.assign({}, lastAction.previous[styleType])
          for (const key in lastAction.current[styleType]) {
            lastAction.previous[styleType][key] = lastAction.theObject.styles[styleType][key];
            lastAction.theObject.styles[styleType][key] = lastAction.current[styleType][key];
          }
        }
        break;
      case 'properties':
        lastAction.previous = Object.assign({}, lastAction.theObject.attributes);
        Object.keys(lastAction.current).forEach(k => {
          lastAction.theObject.attributes[k] = lastAction.current[k];
        });
        break;
      case 'src':
        lastAction.current = lastAction.theObject.specialAttributesObj['src']
        lastAction.theObject.specialAttributesObj['src'] = lastAction.previous;
        break;
      case 'content':
        lastAction.previous = lastAction.theObject.textContent
        lastAction.theObject.textContent = lastAction.current
        break;
      default:
        if (lastAction.divStylePrev) {
          lastAction.divStyleCurr = lastAction.theObject.divStyles[lastAction.divStylePrev.name]
          lastAction.theObject.divStyles[lastAction.divStylePrev.name] = lastAction.divStylePrev.value;
        }
        break;
    }
  }

  redo(action?) {
    let lastAction: Action;
    if (action) {
      let i = this.nextStack.getStack().indexOf(action);
      this.nextStack.getStack().splice(i, 1);
      lastAction = action;
    }
    else
      lastAction = this.nextStack.pop();
    if (lastAction) {
      let prev = lastAction.theObject;
      let parentPrev;
      switch (lastAction.name) {
        case 'drop':
          switch (lastAction.whatChange) {
            case 'Tile':
              this.redoRemove(lastAction);
              lastAction.previous = lastAction.theObject.parentRow;
              lastAction.divStylePrev = Object.assign({}, lastAction.theObject.index);
              lastAction.theObject._parentRow = lastAction.current;
              lastAction.theObject.index = lastAction.divStyleCurr;
              this.redoAdd(lastAction);
              if (lastAction.previous.cols.length < 2) {
                let action = new Action();
                action.theObject = lastAction.previous;
                action.whatChange = 'Tile';
                this.redoRemove(action);
              }
              break;
            default:
              this.undoAdd(lastAction);
              lastAction.previous = lastAction.theObject.parentCol;
              lastAction.divStylePrev = Object.assign({}, lastAction.theObject.index);
              lastAction.theObject._parentCol = lastAction.current;
              lastAction.theObject.index = lastAction.divStyleCurr;
              this.undoRemove(lastAction);
              break;
          }
          break;
        case 'copy':
        case 'add':
          this.redoAdd(lastAction);
          break;
        case 'remove':
          this.redoRemove(lastAction);
          break;
        case 'change':
          if (lastAction.current == 'single') {
            lastAction.theObject.description = 'single';
            let i = lastAction.theObject.singleProperties.push(lastAction.description);
          }
          if (lastAction.theObject.globalWidgetName && lastAction.theObject.description != 'single') {
            let temp = lastAction.theObject;
            let flag = true;
            let myAction = Action.fromServerObject(lastAction.toServerObject());
            DbService.globalWidgets.forEach(x => {
              if (x.globalWidgetName == lastAction.theObject.globalWidgetName &&
                !(x.singleProperties.find(x => x == lastAction.description))) {
                lastAction = Action.fromServerObject(myAction.toServerObject());
                lastAction.theObject = x;
                this.redoChange(lastAction);
              }
            })
            lastAction.theObject = temp;
            let obj = lastAction.theObject.toServerObject();
            this.ser.site.globalWidgetsName.find(g => g.name == lastAction.theObject.globalWidgetName).object = obj;
          }
          else {
            this.redoChange(lastAction);
          }
          break;
      }
      lastAction.style = { 'color': 'white' };
      this.prevStack.push(lastAction);
    }
  }

  loadPrevNextStack(prevStack, nextStack) {
    this.prevStack = Stack.fromServerObject(prevStack);
    this.nextStack = Stack.fromServerObject(nextStack);
    this.arrToHistory = this.prevStack.getStack().concat(this.nextStack.getStack());
    this.arrToHistory.sort((a, b) => {
      return (a.index - b.index)
    });
  }

  actionRecovery(recovery, action?) {
    let myAction;
    let index;

    switch (recovery) {
      case 'undo':
        if (action) {
          myAction = this.prevStack.getStack().find(a => a.date == action.date);
          index = this.prevStack.getStack().indexOf(myAction);
          for (let i = (this.prevStack.getStack().length) - 1; i >= index; i--) {
            this.undo(this.prevStack.getStack()[i]);
          }
        }
        else {
          this.undo();
        }
        break;
      case 'redo':
        if (action) {
          myAction = this.nextStack.getStack().find(a => a.date == action.date);
          index = this.nextStack.getStack().indexOf(myAction);
          for (let i = (this.nextStack.getStack().length) - 1; i >= index; i--) {
            this.redo(this.nextStack.getStack()[i]);
          }
        }
        else {
          this.redo();
        }
        break;
    }
    window.parent.postMessage(JSON.stringify({ function: 'loadPrevNextStack', params: [this.prevStack.toServerObject(), this.nextStack.toServerObject()] }), '*')
  }
}
