import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RegexConstants} from "../../constants/regex-constants";
import {UserService} from "../services/userService";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../../AdminComponents/admin-modals/responses/DefaultResponse";
import { Router, RouterLink } from "@angular/router";
import {ChangeUserDetailsReq} from "../UserModals/requests/ChangeUserDetailsReq";
import {CustomValidatorService} from "../services/CustomValidators";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { MaxLengthDirective } from '../../directives/max-length.directive';
import { NoSpecialCharDirective } from '../../directives/no-special-char.directive';
import { NoAlphabetsDirective } from '../../directives/no-alphabets.directive';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-admin-details-form',
    templateUrl: './user-details-form.component.html',
    styleUrl: './user-details-form.component.css',
    standalone: true,
    imports: [NavbarComponent, FormsModule, ReactiveFormsModule, NgIf, NoAlphabetsDirective, NoSpecialCharDirective, MaxLengthDirective, RouterLink, NgbToast]
})
export class UserDetailsFormComponent implements OnInit {

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
      email: new FormControl(this.userService.userDetails?.email, [Validators.required, Validators.email]),
      phone: [this.userService.userDetails?.phone, [Validators.required, Validators.pattern(RegexConstants.phoneRegex)]],
      address: new FormControl(this.userService.userDetails?.address, [Validators.required, Validators.pattern(RegexConstants.addressRegex)])
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
    return this.updateDetailsForm.get('address');
  }

  onSubmit() {
    this.userDetailsReq = this.updateDetailsForm.value;
    this.submitted = true
    if (this.updateDetailsForm.pristine){
      this.toastMessage ="No changes made"
      this.showToast = true
      setTimeout(()=>{
        this.router.navigate(['user','profile']).then()
      },1000)
      return
    }
    this.userService.updateUserDetails(this.userDetailsReq).subscribe({
      next:response=>{
        this.toastMessage = response.message as string
        this.showToast = true
        setTimeout(()=>{
          this.router.navigate(['user','profile']).then()
        },1000)

      },error:err => {
        let error = err as HttpErrorResponse
        let response = error.error as DefaultResponse
        this.toastMessage = response.message as string
        this.showToast = true
      }
    })
  }


}
