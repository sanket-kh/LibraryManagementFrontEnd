import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    standalone: true,
    imports: [NgIf]
})
export class ModalComponent {
  @Input('heading') heading?: string;
  @Input('body') body?: string;
  @Input('buttonText') buttonText?: string;
  @Input('var') var?:unknown;
  @Input('button') button?:boolean;

  @Output('buttonClicked') buttonClicked:EventEmitter<Boolean> = new EventEmitter<Boolean>()

  buttonClickedEvent(){
    this.buttonClicked.emit(true);
  }

}
