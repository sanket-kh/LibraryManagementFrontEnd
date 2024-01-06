import {afterRender, Inject, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../modals/requests/LoginRequest";
import {Observable} from "rxjs";
import {DefaultResponse} from "../modals/responses/DefaultResponse";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

constructor(@Inject(DOCUMENT) private document:Document){

}

  httpClient:HttpClient = inject(HttpClient);



  login(loginRequest:LoginRequest):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>("http://localhost:8080/api/v1/auth/user/authentication",loginRequest)
  }

  isAuthenticated():boolean{
    let sessionStorage = this.document.defaultView?.sessionStorage
      return sessionStorage?.getItem('loggedIn') === 'true'

  }
  getAuthToken():string|null{
    console.log('getting token')
    let sessionStorage = this.document.defaultView?.sessionStorage as Storage
    return sessionStorage.getItem('accessToken');
  }
}
