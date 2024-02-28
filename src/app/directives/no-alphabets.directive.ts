import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
    selector: '[appNoAlphabets]',
    standalone: true
})
export class NoAlphabetsDirective {

  private el: ElementRef = inject(ElementRef)

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const blockedKeys = ['[', ']','-', '\\', ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const isBlockedKey = blockedKeys.includes(event.key);

    if (isBlockedKey) {
      event.preventDefault();
    }

  }
}
