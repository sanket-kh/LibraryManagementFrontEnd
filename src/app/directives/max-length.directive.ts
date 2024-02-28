import {Directive, ElementRef, HostListener, inject, Input} from '@angular/core';

@Directive({
    selector: '[appMaxLength]',
    standalone: true
})
export class MaxLengthDirective {

  @Input() appMaxLength!: number;
  private el:ElementRef = inject(ElementRef)

  @HostListener('input', ['$event']) onkeydown(event: InputEvent) {
   let inputValue:string = this.el.nativeElement.value
    if (inputValue.length > this.appMaxLength){
      this.el.nativeElement.value =  inputValue.slice(0,this.appMaxLength)
      event.preventDefault()
      event.stopPropagation()
    }

  }
}
