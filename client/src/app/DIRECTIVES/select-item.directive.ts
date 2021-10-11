import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ConfiguratorService } from '../SERVICES/configurator.service';
import { DbService } from '../SERVICES/db.service';

@Directive({
  selector: '[appSelectItem]'
})
export class SelectItemDirective implements OnInit {
  @Input() text = ''
  contentPrev;

  constructor(private elementRef: ElementRef, public ser: DbService, public configSer: ConfiguratorService) {


  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    if (this.ser.elementCreatedForFocus) {
      this.ser.elementCreatedForFocus = false
      this.elementRef.nativeElement.focus()
      this.textSelect(this.elementRef.nativeElement)
    }
  }
  textSelect(element) {


    // element.focus()

    // element=element.target
    var doc = element.ownerDocument || element.document;
    // var element = this[0];
    console.log(this, element);
    var range
    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      var selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(element);
      if (selection.rangeCount > 0) {
        selection.removeAllRanges();

      }
      selection.addRange(range);
    }


  }

  @HostListener('focus', ['$event'])
  focusElement(event) {
    this.textSelect(event.target)
    this.contentPrev = event.target.textContent
  }
  @HostListener('blur', ['$event'])
  blurElement(event) {
    this.configSer.changeStylesG(['simpleStyles', 'content'], this.contentPrev)
  }
  @HostListener('keypress', ['$event'])
  preventEnter(event) {

    this.ser.caret = null
    if (event.keyCode != 13) {
      let caret = window.getSelection().getRangeAt(0).startOffset
      if (event.target.textContent[caret - 1] == '\n') {
        event.preventDefault()
        event.target.textContent = [event.target.textContent.slice(0, caret), event.key, event.target.textContent.slice(caret)].join('');
        this.ser.caret = caret
      }
    }
  }
  setCaretPosition(el, caretPos) {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[0], caretPos + 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }
  ngOnChanges() {


    this.elementRef.nativeElement.textContent = this.text
    if (this.ser.caret != null)
      this.setCaretPosition(this.elementRef.nativeElement, this.ser.caret)
    this.ser.caret = null
  }

  @HostListener('keyup', ['$event'])
  keyupContent(event) {

    let textContent = event.target.textContent
    if (event.keyCode == 13) {
      this.ser.caret = textContent.length - document.getSelection().focusNode.nodeValue.length
      event.preventDefault()
      let caret = textContent.length - document.getSelection().focusNode.nodeValue.length
      textContent = [textContent.slice(0, caret), '\n', textContent.slice(caret)].join('');
    }
    this.configSer.changeContent(textContent)
    window.parent.postMessage(JSON.stringify({ function: 'loadItemToConfigurator', params: [this.ser.lastItem.tagName, this.ser.lastItem.toServerObject()] }), '*');
  }



}

