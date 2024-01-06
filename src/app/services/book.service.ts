import {Inject, inject, Injectable, numberAttribute} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DefaultResponse} from "../modals/responses/DefaultResponse";
import {Observable} from "rxjs";
import {SearchBookDto} from "../modals/dtos/SearchBookDto";
import {ReturnBookReq} from "../modals/requests/ReturnBookReq";
import {DOCUMENT} from "@angular/common";
import {BorrowedBookDto} from "../modals/dtos/BorrowedBookDto";
import {BorrowBookReq} from "../modals/requests/BorrowBookReq";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(@Inject(DOCUMENT) document:Document) {
  }

  private readonly httpClient: HttpClient = inject(HttpClient)
  private readonly getAllUri: string = 'http://localhost:8080/api/v1/books/user/get-all';
  private readonly searchBookUri: string = 'http://localhost:8080/api/v1/books/user/search';
  private readonly borrowedBookUri: string = 'http://localhost:8080/api/v1/user/borrowed-books';
  private readonly returnBookUri:string = 'http://localhost:8080/api/v1/return';
  private readonly borrowBookUri:string = 'http://localhost:8080/api/v1/borrow';
  private readonly userTransactionUri:string='http://localhost:8080/api/v1/user/transactions?username=sachetk';


  getAllBooks(pageNo: number): Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.getAllUri + '?page=' + pageNo.toString())
  }

  searchBooks(searchInput: SearchBookDto): Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.searchBookUri, searchInput)
  }

  getBorrowedBooksByUser(username: string): Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.borrowedBookUri + '?username=' + username)
  }

  returnBook(returnBook:ReturnBookReq):Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.returnBookUri, returnBook)
  }
  borrowBook(borrowBookReq:BorrowBookReq):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.borrowBookUri,borrowBookReq)
  }
  getAllUserTransaction(username:string):Observable<DefaultResponse>{
    return this.httpClient.get<DefaultResponse>(this.userTransactionUri,{params:{
      username:username
      }} )
  }
}
