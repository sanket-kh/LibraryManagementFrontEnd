import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import {Observable} from "rxjs";
import {ClearFineReq} from "../admin-modals/requests/ClearFineReq";

@Injectable({
  providedIn:"root"
})
export class ManageFineService{
  httpClient:HttpClient = inject(HttpClient)
  private readonly baseUri:string = 'http://localhost:8080/api/v1'
  private readonly getAllFineTransactionUri:string=this.baseUri+'/fine/get-all'
  private readonly getAllUnpaidFineTransactionUri:string=this.baseUri+'/fine/get-all/unpaid'
private readonly clearFineByTransactionUri:string=this.baseUri+'/fine/pay'
  getAllFineTransaction():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.getAllFineTransactionUri)
  }
  getAllUnpaidFineTransaction():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.getAllUnpaidFineTransactionUri)
  }

  clearFineByUserAndBook(clearFineReq:ClearFineReq):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.clearFineByTransactionUri,clearFineReq)
  }
}
