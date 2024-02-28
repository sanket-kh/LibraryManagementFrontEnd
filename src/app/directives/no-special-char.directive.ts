import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appNoSpecialChar]'
})
export class NoSpecialCharDirective {

 @HostListener('input', ['$event']) onInput(event:Event){
   const inputElement = event.target as HTMLInputElement;
   inputElement.value = inputElement.value.replace(/[!@#$%^&*()_+~`={}:"<>?,./;|']+/, '')
 }
}
