import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RegexConstants} from "../../constants/regex-constants";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomValidatorService} from "../services/CustomValidators";
import {UserService} from "../services/userService";
import {ChangePasswordReq} from "../UserModals/requests/ChangePasswordReq";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {AuthenticationService} from "../services/authentication.service";
import { Router, RouterLink } from "@angular/router";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.css',
    standalone: true,
    imports: [NavbarComponent, FormsModule, ReactiveFormsModule, NgIf, RouterLink, NgbToast]
})
export class ChangePasswordComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder)
  private customValidators: CustomValidatorService = inject(CustomValidatorService)
  private userService: UserService = inject(UserService)
  private router:Router = inject(Router)
  private changePasswordReq: ChangePasswordReq = {}
  private defaultResponse: DefaultResponse = {}
  protected changePasswordMessage = ''
  protected showToast: boolean = false
  private authService:AuthenticationService = inject(AuthenticationService)


  changePasswordForm: FormGroup = new FormGroup<any>({})

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required,
        Validators.minLength(8),
        CustomValidatorService.patternValidator(RegexConstants.containingSpecialCharacters, {noSpecialChar:true}),
        CustomValidatorService.patternValidator(RegexConstants.numberRegex, {noNumber:true})
      ]),
      reEnterNewPassword: new FormControl('', Validators.required)
    }, {
      validators: CustomValidatorService.matchPassword('newPassword', 'reEnterNewPassword')
    })
  }

  get currentPassword() {
    return this.changePasswordForm?.get('currentPassword')
  }

  get newPassword() {
    return this.changePasswordForm?.get('newPassword')
  }

  get reEnterNewPassword() {
    return this.changePasswordForm?.get('reEnterNewPassword')
  }


  onSubmit() {
    this.showToast = false;
    let username = this.userService.getUsername()
    this.changePasswordReq = this.changePasswordForm.value
    this.changePasswordReq.username = username;
    console.log(this.changePasswordReq)
    this.userService.changeUserPassword(this.changePasswordReq).subscribe({
      next: response => {
        this.defaultResponse = response
        this.changePasswordMessage = this.defaultResponse.message as string
        this.showToast= true
        this.authService.logOut()
        setTimeout(()=>{
          this.navigateToLogin()
        },850)
      },
      error: err => {
        let errorResponse: HttpErrorResponse = err
        this.defaultResponse = errorResponse.error
        this.changePasswordMessage = this.defaultResponse.message as string
        this.showToast = true
      }
    })
  }
  navigateToLogin(){
    this.router.navigate(['']).then()
  }
}
