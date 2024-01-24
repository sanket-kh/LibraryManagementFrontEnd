import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponse} from "../../UserComponents/UserModals/responses/DefaultResponse";

@Injectable({
  providedIn:"root"
})
export class ReportStatService{
  httpClient:HttpClient = inject(HttpClient)
  private readonly baseUri:string = 'http://localhost:8080/api/v1'

  private readonly totalBookCountUri:string=this.baseUri+'/report/book-count/total'
  private readonly totalAvailableBookCount:string=this.baseUri+'/report/book-count/available'
  private readonly bookCountUniqueUri:string=this.baseUri+'/report/book/unique/count'
  private readonly totalBorrowBookCount:string=this.baseUri+'/report/borrowed-books/total/count'
  private readonly borrowBookUniqueCount:string=this.baseUri+'/report/borrowed-books/unique/count'
  private readonly totalUserCountUri:string=this.baseUri+'/report/users/total/count'
  private readonly activeUserCountUri:string=this.baseUri+'/report/users/active/count'
  private readonly lockedUserCountUri:string=this.baseUri+'/report/users/locked/count'
  private readonly disabledUserCountUri:string=this.baseUri+'/report/users/disabled/count'

  getTotalBookCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.totalBookCountUri)
  }
  getTotalAvailableBookCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.totalAvailableBookCount)
  }

  getUniqueBookCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.bookCountUniqueUri)
  }
  getTotalBorrowedBookCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.totalBorrowBookCount)
  }
  getUniqueBorrowedBookCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.borrowBookUniqueCount)
  }
  getTotalUserCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.totalUserCountUri)
  }
  getActiveUserCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.activeUserCountUri)
  }
  getLockedUserCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.lockedUserCountUri)
  }
  getDisabledUserCount():Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.disabledUserCountUri)
  }

}
