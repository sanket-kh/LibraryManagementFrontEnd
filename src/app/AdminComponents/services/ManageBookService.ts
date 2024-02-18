import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SearchBookDto} from "../admin-modals/Dtos/SearchBookDto";
import {AddBookReq} from "../admin-modals/requests/AddBookReq";
import {AddExistingBookReq} from "../admin-modals/requests/AddExistingBookReq";
import {Observable} from "rxjs";
import {DefaultResponse} from "../../UserComponents/UserModals/responses/DefaultResponse";
import {BookDto} from "../admin-modals/Dtos/BookDto";
import {SearchTransactionReq} from "../admin-modals/requests/SearchTransactionReq";

@Injectable({
  providedIn:"root"
})
export class ManageBookService{
  httpClient:HttpClient = inject(HttpClient)
  bookDto?:BookDto
  private readonly baseUri:string = 'http://localhost:8080/api/v1'

  private readonly searchBookUri:string=this.baseUri+'/books/admin/search'
  private readonly searchTransacitonUri:string=this.baseUri+'/transaction/search'
  private readonly addBookUri:string=this.baseUri+'/books/save'
  private readonly makeAvailableUri:string=this.baseUri+'/books/availability/available'
  private readonly makeUnavailableUri:string=this.baseUri+'/books/availability/unavailable'
  private readonly updateBookUri:string=this.baseUri+'/books/update'
  private readonly addExistingBookUri:string=this.baseUri+'/books/add-existing'
  private readonly getAllBooks:string=this.baseUri+'/books/admin/get-all'
  private readonly getAllTransactionsUri:string=this.baseUri+'/transactions/get-all'

  getAllBooksLibrarian(number: number):Observable<DefaultResponse> {
    return this.httpClient.get<DefaultResponse>(this.getAllBooks+"?page="+number)
  }
  searchBook(searchBookReq:SearchBookDto):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.searchBookUri,searchBookReq)
  }
  addBook(addBookReq:AddBookReq):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.addBookUri, addBookReq)
  }
  addExistingBook(addExistingReq:AddExistingBookReq):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.addExistingBookUri, addExistingReq)
  }
  makeAvailable(isbn:number):Observable<DefaultResponse>{
  return this.httpClient.post<DefaultResponse>(this.makeAvailableUri+"?isbn="+isbn,null)
  }
  makeUnavailable(isbn:number):Observable<DefaultResponse>{
    return this.httpClient.post<DefaultResponse>(this.makeUnavailableUri+"?isbn="+isbn,null)
  }
  updateBook(updateBookReq:AddBookReq):Observable<DefaultResponse>{
  return this.httpClient.post<DefaultResponse>(this.updateBookUri,updateBookReq)
  }

  getAllTransactions():Observable<DefaultResponse>{
    return  this.httpClient.get<DefaultResponse>(this.getAllTransactionsUri)
  }

  getScrolledTransactions(currentPage: number):Observable<DefaultResponse> {
    return this.httpClient.get(this.getAllTransactionsUri+"?pageNo="+currentPage)
  }

  searchTransaction(searchTransactionReq: SearchTransactionReq):Observable<DefaultResponse> {
    return this.httpClient.post<DefaultResponse>(this.searchTransacitonUri, searchTransactionReq)
  }
}
