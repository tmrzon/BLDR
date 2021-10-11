import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRunScripts]'
})
export class RunScriptsDirective {
  constructor(private elementRef: ElementRef,private renderer:Renderer2) { }
  ngOnInit(): void {
      setTimeout(() => { // wait for DOM rendering
          this.reinsertScripts();
      });
  }
  reinsertScripts(): void {
      
      const scripts = <HTMLScriptElement[]>this.elementRef.nativeElement.getElementsByTagName('script');
      const scriptsInitialLength = scripts.length;
      for (let i = 0; i < scriptsInitialLength; i++) {
          const script = scripts[i];
          const scriptCopy = <HTMLScriptElement>this.renderer.createElement('script');
          scriptCopy.type = script.type ? script.type : 'text/javascript';
          if (script.innerHTML) {
              scriptCopy.innerHTML = script.innerHTML;
          } else if (script.src) {
              scriptCopy.src = script.src;
          }
          scriptCopy.async = false;
          script.parentNode.replaceChild(scriptCopy, script);
      }
  }
}
