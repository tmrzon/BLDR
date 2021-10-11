import { Action } from './action';

export class Stack {

    private actions: Array<Action>;
    // Array is used to implement stack 
    constructor() {
        this.actions = [];
    }

    // Functions to be implemented 
    push(element) {
        // push element into the ser.actions 
        this.actions.push(element);
    }

    pop() {
        // return top most element in the stack 
        // and removes it from the stack 
        // Underflow if stack is empty 
        if (this.actions.length == 0)
            return null;
        return this.actions.pop();
    }

    peek() {
        // return the top most element from the stack 
        // but does'nt delete it. 
        return this.actions[this.actions.length - 1];
    }

    isEmpty() {
        // return true if stack is empty 
        return this.actions.length == 0;
    }

    printStack() {
        var str = "";
        for (var i = 0; i < this.actions.length; i++)
            str += this.actions[i].date + " ";
        return str;
    }
    //clear the stack
    clearStack() {
        while (this.actions.length) {
            this.actions.pop();
        }
    }

    getStack() {
        return this.actions;
    }

    removeAction(action) {
        let i = this.actions.findIndex(action);
        this.actions.splice(i, 1);
    }

    toServerObject() {
        let stack = {
            actions: []
        };
        this.actions.forEach(action => {
            stack.actions.push(action.toServerObject());
        });
        return stack;
    }

    static fromServerObject(stack): Stack {
        let newStack = new Stack();
        stack.actions.forEach(action => {
            newStack.push(Action.fromServerObject(action))
        });
        return newStack;
    }
}
