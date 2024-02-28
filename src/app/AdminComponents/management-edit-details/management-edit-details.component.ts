import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../UserComponents/services/userService";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RegexConstants} from "../../constants/regex-constants";
import {ChangeUserDetailsReq} from "../../UserComponents/UserModals/requests/ChangeUserDetailsReq";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import {Router} from "@angular/router";
import {CustomValidatorService} from "../../UserComponents/services/CustomValidators";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { MaxLengthDirective } from '../../directives/max-length.directive';
import { NoSpecialCharDirective } from '../../directives/no-special-char.directive';
import { NoAlphabetsDirective } from '../../directives/no-alphabets.directive';
import { NgIf } from '@angular/common';
import { ManagementNav } from '../management-nav/navbar.component';

@Component({
    selector: 'app-management-edit-details',
    templateUrl: './management-edit-details.component.html',
    styleUrl: './management-edit-details.component.css',
    standalone: true,
    imports: [ManagementNav, FormsModule, ReactiveFormsModule, NgIf, NoAlphabetsDirective, NoSpecialCharDirective, MaxLengthDirective, NgbToast]
})
export class ManagementEditDetailsComponent implements OnInit{

  userService: UserService = inject(UserService)
  formBuilder: FormBuilder = inject(FormBuilder)
  router:Router = inject(Router)
  userDetailsReq: ChangeUserDetailsReq = {}
  updateDetailsForm: FormGroup = new FormGroup<any>({});
  submitted: boolean = false
  showToast:boolean=false
  toastMessage:string = ''

  ngOnInit() {
    this.updateDetailsForm = this.formBuilder.group({
      firstName: new FormControl(this.userService.userDetails?.firstName, [Validators.required,
        CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.moreThanOneSpaceInBetween, {extraSpaceBetween: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true}
        )
      ]),
      lastName: new FormControl(this.userService.userDetails?.lastName, [Validators.required,
        CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true})

      ]),
      username: new FormControl(this.userService.userDetails?.username, [Validators.required,
        Validators.minLength(3),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
      ]),
      email: new FormControl(this.userService.userDetails?.email, [Validators.required, Validators.email]),
      address: new FormControl(this.userService.userDetails?.address, [Validators.required, Validators.pattern(RegexConstants.addressRegex)]),
      phone: [this.userService.userDetails?.phone, [Validators.required,Validators.pattern(RegexConstants.phoneRegex), Validators.minLength(10)]]
    })

  }


  get firstname() {
    return this.updateDetailsForm.get('firstName');
  }

  get lastName() {
    return this.updateDetailsForm.get('lastName');
  }

  get username() {
    return this.updateDetailsForm.get('username');
  }

  get email() {
    return this.updateDetailsForm.get('email');
  }

  get phone() {
    return this.updateDetailsForm.get('phone');
  }
  get address(){
    return this.updateDetailsForm.get('address')
  }

  onSubmit() {
    this.userDetailsReq = this.updateDetailsForm.value;
    this.submitted = true
    if(this.updateDetailsForm.pristine){
      this.toastMessage = "No changes made"
      this.showToast = true
      // setTimeout(()=>{
      //   this.router.navigate(['admin','profile']).then()
      //
      // },1000)
      return
    }
    this.userService.updateUserDetails(this.userDetailsReq).subscribe({
      next:response=>{
        this.toastMessage = response.message as string
        this.showToast = true
        setTimeout(()=>{
          this.router.navigate(['admin','profile']).then()

        },1000)

      },error:err => {
        let error = err as HttpErrorResponse
        let response = error.error as DefaultResponse
        this.toastMessage = response.message as string
        this.showToast = true
    }
    })
  }
  goBack() {
    this.router.navigate(['admin', 'profile']).then()
  }
}
