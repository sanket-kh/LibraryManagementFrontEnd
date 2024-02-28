import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-management-form-modal',
    templateUrl: './management-form-modal.component.html',
    styleUrl: './management-form-modal.component.css',
    standalone: true,
    imports: [FormsModule]
})
export class ManagementFormModalComponent {
  remark: string = ''
  @Output('remark') remarkEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Input('heading') heading: string = ''
  @Input('body') body: string='';

  onConfirm() {
    this.remarkEmitter.emit(this.remark)
  }

}
