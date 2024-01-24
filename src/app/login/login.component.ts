import {Component, Inject, inject} from '@angular/core';
import {AuthenticationService} from "../UserComponents/services/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {RegexConstants} from "../constants/regex-constants";
import {LoginRequest} from "../UserComponents/UserModals/requests/LoginRequest";
import {DefaultResponse} from "../UserComponents/UserModals/responses/DefaultResponse";
import {AuthResponse} from "../UserComponents/UserModals/dtos/AuthResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(@Inject(DOCUMENT) private document:Document) {
  }


  authenticationService: AuthenticationService = inject(AuthenticationService)
  router: Router = inject(Router)
  loginRequest: LoginRequest = {};
  defaultResponse: DefaultResponse = {};
  protected readonly RegexConstants = RegexConstants;
  loginFailed: Boolean = false;
  minLength: number = 3;
  authResponse:AuthResponse={}

  onSubmit() {
    this.authenticationService.login(this.loginRequest).subscribe({
      next: response => {
        this.authResponse = response.responseBody as AuthResponse
        let sessionStorage = this.document.defaultView?.sessionStorage as Storage
        sessionStorage.setItem('accessToken', (JSON.stringify(this.authResponse.accessToken)).slice(1, -1))
        sessionStorage.setItem('loggedIn', 'true')
        sessionStorage.setItem('username', this.loginRequest.username as string)
        sessionStorage.setItem('role', this.authResponse.role as string)
        console.log(sessionStorage.getItem('accessToken'))
        this.navigate()
      },
      error: err => {
        let error = new HttpErrorResponse(err)
        this.defaultResponse = Object.assign({}, error.error)
        this.displayMessage();
        console.log(this.defaultResponse.message)
      }
    })

  }

  displayMessage() {
    this.loginFailed = true;
  }

  navigate() {
    if(this.authenticationService.isUser()){
      this.router.navigate(['user/home']).then()
    }else if (this.authenticationService.isAdmin()){
    this.router.navigate(['admin/home']).then()
    }

  }


}
