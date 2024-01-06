import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {UserBookDto} from "../modals/dtos/UserBookDto";
import {BookService} from "../services/book.service";
import {SearchBookDto} from "../modals/dtos/SearchBookDto";
import {ForeignFunctionResolver} from "@angular/compiler-cli/src/ngtsc/partial_evaluator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {response} from "express";
import {BorrowBookReq} from "../modals/requests/BorrowBookReq";
import {UserService} from "../services/userService";
import {DefaultResponse} from "../modals/responses/DefaultResponse";
import {DOCUMENT} from "@angular/common";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";
import {setDefaultHighWaterMark} from "node:stream";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  bookList?: UserBookDto[] = []
  bookService: BookService = inject(BookService)
  formBuilder:FormBuilder = inject(FormBuilder)
  userService:UserService = inject(UserService)
  document:Document = inject(DOCUMENT)
  pageNumber: number = 0
  notFound: boolean = false
  showToast:boolean =false
  defaultResponse?:DefaultResponse
  searchInput:SearchBookDto={}
  borrowBook:UserBookDto={}
  searchFilter:FormGroup = this.formBuilder.group({
    isbn: ['',],
    title:['',],
    author:['']
  })
  borrowBookMessage?:string;
  ngOnInit(): void {

  }
  confirmBurrow(borrowBook:UserBookDto){
  this.borrowBook = borrowBook;
  }
  burrowBook(borrowBook:UserBookDto){
    this.showToast= false;
    let borrowBookReq:BorrowBookReq = {username:this.userService.getUsername(), isbn:borrowBook.isbn}
    this.bookService.borrowBook(borrowBookReq).subscribe({
      next:response=>{
        this.borrowBookMessage = response.message
        this.showToast=true;
        console.log(this.showToast)
      },
      error:err => {
        console.log(err)
        let error:DefaultResponse = err.error
        this.borrowBookMessage = error.message
        this.showToast= true;
        console.log(this.showToast)
      },
    })
  }
  // getAllBooks() {
  //   this.bookService.getAllBooks(this.pageNumber).subscribe({
  //       next: response => {
  //         this.bookList = response.responseBody as UserBookDto[]
  //         console.log(response)
  //         console.log(this.bookList)
  //       },
  //       error: err => {
  //         console.log(err)
  //       }
  //
  //     }
  //   )
  // }

  searchBooks(){
    this.notFound = false;
    this.searchInput = this.searchFilter.value
    if(!this.searchInput.isbn && !this.searchInput.author && !this.searchInput.title){
      this.bookService.getAllBooks(0).subscribe({
        next:(response)=>{
          console.log(response)
          this.bookList = response.responseBody as UserBookDto[]
          if(!this.bookList){
            this.notFound = true;
            this.bookList=[];
            console.log("not found status:"+ this.notFound)

          }
        },
        error:err => {
          console.log(err)
        }
      });
      return
    }

    this.bookService.searchBooks(this.searchInput).subscribe({
      next:(response)=>{
        console.log(response)
        if(!response){
          this.notFound = true;
          this.bookList=[]
          console.log("not found status:"+ this.notFound)

        }else {
          this.bookList = response.responseBody as UserBookDto[]
        }
      },
      error:err => {
        console.log(err)
      }
    })
  }


}
