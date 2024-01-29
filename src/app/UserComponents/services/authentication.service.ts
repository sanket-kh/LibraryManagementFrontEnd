import {afterRender, Inject, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {LoginRequest} from "../UserModals/requests/LoginRequest";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(DOCUMENT) private document: Document,
              private router:Router ) {

  }
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly loginUri: string = 'http://localhost:8080/api/v1/auth/user/authentication'

  canActivateAdmin(){
    return of(this.isAdmin() && this.isAuthenticated())
  }
  login(loginRequest: LoginRequest): Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.loginUri, loginRequest)
  }

   isAuthenticated() {
    let sessionStorage = this.document.defaultView?.sessionStorage
    return sessionStorage?.getItem('loggedIn') === 'true'

  }
 async isAuthenticatedAsync() {
    let sessionStorage = this.document.defaultView?.sessionStorage
    return  sessionStorage?.getItem('loggedIn') === 'true'

  }
  isUser(): boolean {
    let sessionStorage = this.document.defaultView?.sessionStorage
    return  sessionStorage?.getItem('role') === 'USER'
  }

  getAuthToken(): string | null {
      let sessionStorage = this.document.defaultView?.sessionStorage as Storage
      return sessionStorage.getItem('accessToken') as string
  }

  logOut() {
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    sessionStorage.clear()
  }

     isAdmin() {
    let sessionStorage =  this.document.defaultView?.sessionStorage
    return sessionStorage?.getItem('role') === 'LIBRARIAN'
  }
 async isAdminAsync() {
    let sessionStorage = this.document.defaultView?.sessionStorage
    return sessionStorage?.getItem('role') === 'LIBRARIAN'
  }
}
