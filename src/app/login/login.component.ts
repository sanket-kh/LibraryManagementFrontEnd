import {Component, Inject, inject} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {LoginRequest} from "../modals/requests/LoginRequest";
import {DefaultResponse} from "../modals/responses/DefaultResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {RegexConstants} from "../constants/regex-constants";
import {Router} from "@angular/router";
import {SessionStorageService} from "ngx-webstorage";
import {DOCUMENT} from "@angular/common";

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

  onSubmit() {
    this.authenticationService.login(this.loginRequest).subscribe({
      next: response => {
        this.defaultResponse = response as DefaultResponse
        console.log(this.defaultResponse)
        let sessionStorage = this.document.defaultView?.sessionStorage as Storage
        sessionStorage.setItem('accessToken', (JSON.stringify(this.defaultResponse.responseBody)).slice(1, -1))
        sessionStorage.setItem('loggedIn', 'true')
        sessionStorage.setItem('username', this.loginRequest.username as string)
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
    this.router.navigate(['user/home']).then()
  }


}
