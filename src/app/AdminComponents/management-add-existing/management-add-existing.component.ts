import {Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ManageBookService} from "../services/ManageBookService";
import {AddExistingBookReq} from "../admin-modals/requests/AddExistingBookReq";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../../UserComponents/UserModals/responses/DefaultResponse";
import {Router} from "@angular/router";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { MaxLengthDirective } from '../../directives/max-length.directive';
import { NoSpecialCharDirective } from '../../directives/no-special-char.directive';
import { NoAlphabetsDirective } from '../../directives/no-alphabets.directive';
import { ManagementNav } from '../management-nav/navbar.component';

@Component({
    selector: 'app-management-add-existing',
    templateUrl: './management-add-existing.component.html',
    styleUrl: './management-add-existing.component.css',
    standalone: true,
    imports: [ManagementNav, FormsModule, ReactiveFormsModule, NoAlphabetsDirective, NoSpecialCharDirective, MaxLengthDirective, NgIf, NgbToast]
})
export class ManagementAddExistingComponent implements OnInit {
  bookService:ManageBookService = inject(ManageBookService)
  router:Router = inject(Router)

  addExistingForm: FormGroup = new FormGroup<any>({})
  addExistingReq: AddExistingBookReq = {}
  showToast:boolean = false
  toastMessage:string=''

  ngOnInit(): void {
    this.addExistingForm = new FormGroup({
      isbn: new FormControl('', [Validators.required]),
      copies: new FormControl('', [Validators.required])
    })
  }
  onSubmit() {
    this.addExistingReq = this.addExistingForm.value
    this.bookService.addExistingBook(this.addExistingReq).subscribe({
      next:response=>{
        this.toastMessage=response.message as string;
        this.showToast=true
        setTimeout(()=>{this.router.navigate(['admin','manage-books']).then()},850)
      },error:err => {
        let error:HttpErrorResponse = err
        let defaultRes:DefaultResponse = error.error as DefaultResponse
        this.toastMessage=defaultRes.message as string;
        this.showToast=true
      }
    })
  }


  get isbn() {
    return this.addExistingForm.get('isbn')
  }

  get copies() {
    return this.addExistingForm.get('copies')
  }


  onReset() {
    this.addExistingForm.reset()
    this.toastMessage = "form cleared"
    this.showToast = true
  }
  goBack() {
    this.router.navigate(['admin', 'manage-books']).then()
  }
}
