import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LockUserReq} from "../admin-modals/requests/LockUserReq";
import {Observable} from "rxjs";
import {DefaultResponse} from "../../UserComponents/UserModals/responses/DefaultResponse";

@Injectable({
  providedIn:"root"
})
export class ManageUserService{
  httpClient:HttpClient = inject(HttpClient)
  private readonly baseUri:string = 'http://localhost:8080/api/v1'
  private readonly unlockUserUri:string =this.baseUri+'/users/unlock'
  private readonly lockUserUri:string=this.baseUri+'/users/lock'
  private readonly searchUserUri:string=this.baseUri+'/users/search'
  private readonly getAllUserUri:string = this.baseUri+'/users/get-all'
  private readonly getLockedUsersUri:string = this.baseUri+'/users/locked'
  private readonly getUserByUsernameUri:string=this.baseUri+'/users/details'

  searchUser(searchInput:string):Observable<DefaultResponse>{
   return this.httpClient.get<DefaultResponse>(this.searchUserUri,{params:{username:searchInput}})
  }
  lockUser(lockUserReq:LockUserReq):Observable<DefaultResponse>{
   return this.httpClient.post<DefaultResponse>(this.lockUserUri,lockUserReq)
  }
  unlockUser(username:string):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.unlockUserUri, null,{params:{username:username}})
  }
  getAllUsers():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.getAllUserUri)
  }


  getLockedUsers():Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.getLockedUsersUri)
  }
  getUserByUsername(username:string):Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.getUserByUsernameUri,{params:{username:username}})
  }
}
