import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegisterRequest} from "../modals/requests/UserRegisterRequest";
import {RegexConstants} from "../constants/regex-constants";
import {privateDecrypt} from "node:crypto";
import {CustomValidatorService} from "../services/CustomValidators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  private customValidators: CustomValidatorService = inject(CustomValidatorService)
  protected readonly RegexConstants = RegexConstants;
  formBuilder: FormBuilder = inject(FormBuilder)
  userRegisterRequest: UserRegisterRequest = {}
  registerForm:FormGroup = new FormGroup<any>({});
  submitted:boolean = false
  ngOnInit() {
    this.registerForm =this.formBuilder.group({
      firstName: new FormControl('',[Validators.required, Validators.pattern(RegexConstants.nameRegex)]),
      lastName: new FormControl('',[Validators.required, Validators.pattern(RegexConstants.nameRegex)]),
      username: new FormControl('',[Validators.required, Validators.pattern(RegexConstants.usernameRegex)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern(RegexConstants.passwordRegex)]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: ['', [Validators.required, Validators.pattern(RegexConstants.phoneRegex)]]
    }, {
      validators: this.customValidators.MatchPassword('password', 'confirmPassword')
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
  get password(){
    return this.registerForm.get('password')
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }
  get phone() {
    return this.registerForm.get('phone');
  }

  onSubmit() {
    this.userRegisterRequest = this.registerForm.value;
    this.submitted=true
    console.log(this.registerForm)

  }

}
