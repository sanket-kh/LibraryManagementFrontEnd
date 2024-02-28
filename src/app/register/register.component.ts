import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CustomValidatorService} from "../UserComponents/services/CustomValidators";
import {UserRegisterRequest} from "../UserComponents/UserModals/requests/UserRegisterRequest";
import {RegexConstants} from "../constants/regex-constants";
import {UserService} from "../UserComponents/services/userService";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../UserComponents/UserModals/responses/DefaultResponse";
import {Router} from "@angular/router";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { MaxLengthDirective } from '../directives/max-length.directive';
import { NoSpecialCharDirective } from '../directives/no-special-char.directive';
import { NoAlphabetsDirective } from '../directives/no-alphabets.directive';
import { NgIf } from '@angular/common';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, NoAlphabetsDirective, NoSpecialCharDirective, MaxLengthDirective, NgbToast]
})
export class RegisterComponent implements OnInit {

  protected readonly RegexConstants: RegexConstants = RegexConstants
  formBuilder: FormBuilder = inject(FormBuilder)
  userService: UserService = inject(UserService)
  router: Router = inject(Router)
  userRegisterRequest: UserRegisterRequest = {}
  registerForm: FormGroup = new FormGroup<any>({});
  submitted: boolean = false
  showToast: boolean = false;
  toastMessage: string = '';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required,
        CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.moreThanOneSpaceInBetween, {extraSpaceBetween: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true}
        )]),
      lastName: new FormControl('', [Validators.required,
        CustomValidatorService.patternValidator(RegexConstants.firstLetterCapital, {noCapital: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.numberRegex, {hasNumber: true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.capitalBetweenWord,{capitalBetween:true})
        ]),
      username: new FormControl('', [Validators.required,
        Validators.minLength(3),
        CustomValidatorService.containingPatternValidator(RegexConstants.trailingSpaces, {trailingSpace:true}),
        CustomValidatorService.containingPatternValidator(RegexConstants.containingSpecialCharacters, {specialChar: true}),

      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,
        Validators.minLength(8),
        CustomValidatorService.patternValidator(RegexConstants.containingSpecialCharacters, {noSpecialChar:true}),
        CustomValidatorService.patternValidator(RegexConstants.numberRegex, {noNumber:true})
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: ['', [Validators.required, Validators.pattern(RegexConstants.phoneRegex)]],
      address: ['', [Validators.required, Validators.pattern(RegexConstants.addressRegex)]]
    }, {
      validators: CustomValidatorService.matchPassword('password', 'confirmPassword')
    })
  }


  get firstname() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get address() {
    return this.registerForm.get('address')
  }

  onSubmit() {
    this.userRegisterRequest = this.registerForm.value;
    this.submitted = true
    console.log(this.userRegisterRequest)
    this.userService.registerUser(this.userRegisterRequest).subscribe({
      next: response => {
        this.toastMessage = response.message as string
        this.showToast = true
        setTimeout(()=>{
          this.router.navigate(['']).then()
        },1000)

      },error:err => {
        let error = err as HttpErrorResponse
        let response = error.error as DefaultResponse
        this.toastMessage = response.message as string
      }
    })

  }

}
