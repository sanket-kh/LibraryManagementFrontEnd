import {Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ManageBookService} from "../services/ManageBookService";
import { DOCUMENT, NgIf } from "@angular/common";
import {Router} from "@angular/router";
import {AddBookReq} from "../admin-modals/requests/AddBookReq";
import {RegexConstants} from "../../constants/regex-constants";
import {CustomValidatorService} from "../../UserComponents/services/CustomValidators";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../UserComponents/modal/modal.component';
import { MaxLengthDirective } from '../../directives/max-length.directive';
import { NoAlphabetsDirective } from '../../directives/no-alphabets.directive';
import { NoSpecialCharDirective } from '../../directives/no-special-char.directive';
import { ManagementNav } from '../management-nav/navbar.component';

@Component({
    selector: 'app-modify-book',
    templateUrl: './modify-book.component.html',
    styleUrl: './modify-book.component.css',
    standalone: true,
    imports: [ManagementNav, FormsModule, ReactiveFormsModule, NoSpecialCharDirective, NoAlphabetsDirective, NgIf, MaxLengthDirective, ModalComponent, NgbToast]
})
export class ModifyBookComponent implements OnInit {
  bookForm: FormGroup = new FormGroup<any>({})
  router: Router = inject(Router)
  manageBookService: ManageBookService = inject(ManageBookService)
  pageTitle?: string = 'Add New Book'
  isSubmitted: boolean = false
  bookReq: AddBookReq = {}
  toastMessage: string = ''
  showToast: boolean = false
  newBookForm: boolean = true

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      isbn: new FormControl(null, [Validators.required, Validators.pattern(RegexConstants.isbnNumberRegex),
      CustomValidatorService.containingPatternValidator(/[e.]+/, {notNumber:true})
      ],),
      title: new FormControl('', [Validators.required,
        CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
      ]),
      author: new FormControl('', [Validators.required,
        CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.moreThanOneSpaceInBetween, {extraSpaceBetween: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true}
        )
      ]),
      copies: new FormControl('', [Validators.required, CustomValidatorService.patternValidator(RegexConstants.numberRegex, {noNumber:true})]),
    })
    if (this.manageBookService.bookDto) {
      this.newBookForm = false
      this.bookReq = this.manageBookService.bookDto
      this.isbn?.setValue(this.manageBookService.bookDto.isbn)
      this.isbn?.disable()
      this.populateValue()
      this.pageTitle = 'Modify   Book'
    }
  }

  // async canExit() {
  //   if (!this.isSubmitted) {
  //       const button: HTMLButtonElement = this.document.getElementById('modalButton') as HTMLButtonElement
  //        button.click();
  //       this.confirmNavigation = new Promise<boolean>((resolve, reject) => {
  //       resolve = this.navigationConfirmed()
  //       })
  //     return await this.confirmNavigation;
  //   }
  //   return this.isSubmitted
  // }


  populateValue() {
    this.bookForm.setValue({
      isbn: this.manageBookService.bookDto?.isbn,
      title: this.manageBookService.bookDto?.title,
      author: this.manageBookService.bookDto?.author,
      copies: this.manageBookService.bookDto?.copies
    })

  }

  get isbn() {
    return this.bookForm.get('isbn')
  }

  get title() {
    return this.bookForm.get('title')
  }

  get author() {
    return this.bookForm.get('author')
  }

  get copies() {
    return this.bookForm.get('copies')
  }

  onSubmit() {
    this.bookReq = this.bookForm.value
    this.bookReq.isbn = this.manageBookService.bookDto?.isbn
    this.isSubmitted = true
    if(this.bookForm.pristine){
      this.toastMessage = "no changes made";
      this.showToast = true
      return
    }
    if (!this.newBookForm) {
      this.manageBookService.updateBook(this.bookReq).subscribe({
        next: response => {
          this.toastMessage = response.message as string
          this.showToast = true
          setTimeout(() => {
            this.router.navigate(['admin', 'manage-books']).then()
          }, 850)

        }, error: err => {
          console.log(err)
          alert('some error occurred')
          setTimeout(() => {
            this.router.navigate(['admin', 'manage-books']).then()
          }, 850)
        }
      })
    } else {
      this.bookReq.isbn = this.isbn?.value
      this.manageBookService.addBook(this.bookReq).subscribe({
        next: response => {
          this.toastMessage = response.message as string
          this.showToast = true
          setTimeout(() => {
            this.router.navigate(['admin', 'manage-books']).then()
          }, 1000)

        }, error: err => {
          let err1:DefaultResponse = err.error as DefaultResponse
          this.toastMessage = err1.message as string
          this.showToast = true
          // setTimeout(() => {
          //   this.router.navigate(['admin', 'manage-books']).then()
          // }, 850)
        }
      })
    }


  }

  goBack() {
    this.router.navigate(['admin', 'manage-books']).then()
  }

  protected readonly Promise = Promise;

  navigationConfirmed() {
   return true
  }
}
