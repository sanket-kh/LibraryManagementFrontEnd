import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {SearchBookDto} from "../UserModals/dtos/SearchBookDto";
import {ReturnBookReq} from "../UserModals/requests/ReturnBookReq";
import {BorrowBookReq} from "../UserModals/requests/BorrowBookReq";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly baseUri:string = 'http://localhost:8080/api/v1'

  private readonly httpClient: HttpClient = inject(HttpClient)
  private readonly getAllUri: string = this.baseUri+'/books/user/get-all';
  private readonly searchBookUri: string = this.baseUri+'/books/user/search';
  private readonly borrowedBookUri: string = this.baseUri+'/user/borrowed-books';
  private readonly returnBookUri:string = this.baseUri+'/return';
  private readonly borrowBookUri:string = this.baseUri+'/borrow';
  private readonly userTransactionUri:string=this.baseUri+'/user/transactions';
  private readonly getBooksBorrowedByUserUri:string = this.baseUri+'/books/user/get-borrowed'


  getAllBooks(pageNo: number): Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.getAllUri + '?page=' + pageNo.toString())
  }

  searchBooks(searchInput: SearchBookDto): Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.searchBookUri, searchInput)
  }

  getBorrowedBooksByUser(username: string): Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.borrowedBookUri + '?username=' + username)
  }
  getBooksBorrowedByUser(): Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.getBooksBorrowedByUserUri)
  }


  returnBook(returnBook:ReturnBookReq):Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.returnBookUri, returnBook)
  }
  borrowBook(borrowBookReq:BorrowBookReq):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.borrowBookUri,borrowBookReq)
  }
  getAllUserTransaction(username:string):Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.userTransactionUri+"?username="+username)
  }
}
