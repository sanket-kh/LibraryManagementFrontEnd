import {afterRender, Inject, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {LoginRequest} from "../UserModals/requests/LoginRequest";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly loginUri: string = 'http://localhost:8080/api/v1/auth/user/authentication'


  login(loginRequest: LoginRequest): Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.loginUri, loginRequest)
  }

  isAuthenticated(): boolean {
    let sessionStorage = this.document.defaultView?.sessionStorage
    return sessionStorage?.getItem('loggedIn') === 'true'

  }

  isUser(): boolean {
    let sessionStorage = this.document.defaultView?.sessionStorage
    return sessionStorage?.getItem('role') === 'USER'
  }

  getAuthToken(): string | null {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    return sessionStorage.getItem('accessToken');
  }

  logOut() {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    sessionStorage.clear()
  }

  isAdmin() {
    let sessionStorage = this.document.defaultView?.sessionStorage
    return sessionStorage?.getItem('role') === 'LIBRARIAN'
  }
}
