import {Component, inject} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-application';
  modalService:NgbModal = inject(NgbModal)
  public open(modal:any){
    this.modalService.open(modal)
  }
}
