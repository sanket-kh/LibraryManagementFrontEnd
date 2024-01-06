import {Inject, inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChangePasswordReq} from "../modals/requests/ChangePasswordReq";
import {DefaultResponse} from "../modals/responses/DefaultResponse";
import {Observable} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(@Inject(DOCUMENT) private document:Document){

  }


  httpClient: HttpClient = inject(HttpClient);
  userDetailsUri = 'http://localhost:8080/api/v1/users/user/details';
  changeUserPasswordUri:string = 'http://localhost:8080/api/v1/users/user/change-password';

  getUserDetails() :Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.userDetailsUri + '?username=' + this.getUsername())
  }
  changeUserPassword(changePasswordReq:ChangePasswordReq){
    return this.httpClient.post(this.changeUserPasswordUri, changePasswordReq)
  }


  getUsername():string{
    let sessionStorage:Storage = this.document.defaultView?.sessionStorage as Storage
    return sessionStorage.getItem('username') as string
  }
}
