import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";

@Injectable({
  providedIn:"root"
})
export class FineService{
  private readonly baseUri:string = 'http://localhost:8080/api/v1'
  private readonly userFineUri:string =this.baseUri+'/fine/user/owed'
  private readonly userFineByUsernameUri:string=this.baseUri+'/fine/owed'
  private httpClient:HttpClient = inject(HttpClient)

  getUserFined():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.userFineUri)
  }
  getUserFineByUsername(username:string):Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.userFineByUsernameUri,{params:{username:username}})
  }


}
