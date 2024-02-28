import {afterNextRender, inject, Inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {LoginRequest} from "../UserModals/requests/LoginRequest";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {document} from "ngx-bootstrap/utils";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,
  ) {
  }

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly loginUri: string = 'http://localhost:8080/api/v1/auth/user/authentication'

  canActivateAdmin() {
    return of(this.isAdmin() && this.isAuthenticated())
  }

  canActivateUser() {
    return of(this.isUser() && this.isAuthenticated())
  }

  login(loginRequest: LoginRequest): Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.loginUri, loginRequest)
  }

  isAuthenticated() {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    return sessionStorage?.getItem('loggedIn') === 'true'

  }

  isUser(): boolean {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    return sessionStorage.getItem('role') === 'USER'
  }

  getAuthToken(): string | null {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    return sessionStorage?.getItem('accessToken') as string
  }

  logOut() {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    sessionStorage.clear()
  }

  isAdmin() {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    return sessionStorage.getItem('role') === 'LIBRARIAN'
  }

  ngOnInit(): void {
    afterNextRender((): void =>
      this.document =document)
  }

}
