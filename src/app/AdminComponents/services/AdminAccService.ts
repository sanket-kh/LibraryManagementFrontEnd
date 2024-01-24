import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import {AccDetailsReq} from "../admin-modals/requests/AccDetailsReq";
import {AdminAccDetailsDto} from "../admin-modals/Dtos/AdminAccDetailsDto";

@Injectable({
  providedIn: "root"
})
export class AdminAccService {
  httpClient: HttpClient = inject(HttpClient)
  adminAccDetails?:AdminAccDetailsDto[]
  private readonly baseUri:string = 'http://localhost:8080/api/v1'
  private readonly getAllAccTypesUri: string = this.baseUri+'/librarian/account-type/get-all'
  private readonly addAccTypeUri: string = this.baseUri+'/librarian/account-type/add'

  private readonly addAccAssociatedOrg: string = this.baseUri+'/librarian/account-associated-org/add'
  private readonly getOrganizationNameByAccType: string = this.baseUri+'/librarian/account-associated-org/get'

  private readonly addAccDetailsUri: string = this.baseUri+'/librarian/account/add'
  private readonly getAccDetailsUri: string = this.baseUri+'/librarian/account/get'
 private readonly getFineClearAcc: string = this.baseUri+'/librarian/account/fine-account/get'
  private readonly clearAccDetailsUri: string = this.baseUri+'/librarian/account/clear'
  private readonly updateAccDetailsUri: string=this.baseUri+'/librarian/account/update'



  getAllAccTypes(): Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.getAllAccTypesUri)
  }

  getOrgNamesByAccType(accTypeName:string): Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.getOrganizationNameByAccType, {params:{accountTypeName:accTypeName}})
  }

  addAccDetails(accDetailsReq:AccDetailsReq[]): Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.addAccDetailsUri, accDetailsReq)
  }
  getAccDetails():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.getAccDetailsUri)
  }

  clearDetails():Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.clearAccDetailsUri, null)
  }
  updateAccDetails(updateDetailsReq:AccDetailsReq[]):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.updateAccDetailsUri,updateDetailsReq)
  }
  getClearFineAccountByAccountType(accountType:string):Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.getFineClearAcc+"?accountType="+accountType);
  }
}
