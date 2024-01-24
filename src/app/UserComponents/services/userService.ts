import {Inject, inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {UserDto} from "../UserModals/dtos/UserDto";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {ChangePasswordReq} from "../UserModals/requests/ChangePasswordReq";
import {UserRegisterRequest} from "../UserModals/requests/UserRegisterRequest";
import {ChangeUserDetailsReq} from "../UserModals/requests/ChangeUserDetailsReq";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(@Inject(DOCUMENT) private document:Document){

  }

  userDetails?:UserDto
  userDetailsEmpty:boolean = true

  httpClient: HttpClient = inject(HttpClient);
  private readonly baseUri:string = 'http://localhost:8080/api/v1'

  private readonly registerUserUri: string = this.baseUri+'/auth/user/register';
  private readonly setupAdminUri: string = this.baseUri+'/users/setup-admin';
  private readonly userDetailsUri = this.baseUri+'/users/user/details';
  private readonly changeUserPasswordUri:string = this.baseUri+'/users/user/change-password';
  private readonly usernameExistsUri:string= this.baseUri+'/users/exists'
  private readonly updateUserDetailsUri:string=this.baseUri+'/users/user/update'

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
  usernameExists(username:string):Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.usernameExistsUri +'?username=' +username)
  }

  registerUser(userRegisterRequest: UserRegisterRequest):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.registerUserUri, userRegisterRequest)
  }
  updateUserDetails(updateDetailsReq:ChangeUserDetailsReq):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.updateUserDetailsUri, updateDetailsReq)
  }

  registerAdmin(adminRegisterRequest:UserRegisterRequest):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.setupAdminUri, adminRegisterRequest)
  }
}
