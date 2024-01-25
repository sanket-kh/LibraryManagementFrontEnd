import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";
import {BookService} from "../services/book.service";
import {UserService} from "../services/userService";
import {UserBookDto} from "../UserModals/dtos/UserBookDto";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {SearchBookDto} from "../UserModals/dtos/SearchBookDto";
import {BorrowBookReq} from "../UserModals/requests/BorrowBookReq";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  bookList?: UserBookDto[] = []
  bookService: BookService = inject(BookService)
  formBuilder: FormBuilder = inject(FormBuilder)
  userService: UserService = inject(UserService)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  document: Document = inject(DOCUMENT)
  pageNumber: number = 0
  notFound: boolean = false
  showToast: boolean = false
  defaultResponse?: DefaultResponse
  borrowLimit:number=2
  searchInput: SearchBookDto = {}
  borrowBook: UserBookDto = {}
  searchFilter: FormGroup = this.formBuilder.group({
    isbn: ['',],
    title: ['',],
    author: ['']
  })
  borrowBookMessage?: string;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: value => {
       let response:DefaultResponse = value['bookList']
        this.bookList = response.responseBody as UserBookDto[]
      },error:err => {
        this.bookList = []
      }

    })
    this.getBorrowedBookNumber()
  }

  confirmBurrow(borrowBook: UserBookDto) {
    this.borrowBook = borrowBook;
  }

  burrowBook(borrowBook: UserBookDto) {
    this.showToast = false;
    let borrowBookReq: BorrowBookReq = {username: this.userService.getUsername(), isbn: borrowBook.isbn}
    this.bookService.borrowBook(borrowBookReq).subscribe({
      next: response => {
        this.borrowBookMessage = response.message
        this.showToast = true;
        this.borrowLimit--
      },
      error: err => {
        console.log(err)
        let error: DefaultResponse = err.error
        this.borrowBookMessage = error.message
        this.showToast = true;
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

  searchBooks() {
    this.notFound = false;
    this.searchInput = this.searchFilter.value
    if (!this.searchInput.isbn && !this.searchInput.author && !this.searchInput.title) {
      this.bookService.getAllBooks(0).subscribe({
        next: (response) => {
          this.bookList = response.responseBody as UserBookDto[]
          if (!this.bookList) {
            this.notFound = true;
            this.bookList = [];
            console.log("not found status:" + this.notFound)

          }
        },
        error: err => {
          console.log(err)
        }
      });
      return
    }

    this.bookService.searchBooks(this.searchInput).subscribe({
      next: (response) => {
        if (!response) {
          this.notFound = true;
          this.bookList = []

        } else {
          this.bookList = response.responseBody as UserBookDto[]
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getBorrowedBookNumber() {
    this.bookService.getBorrowedBooksByUser(this.userService.getUsername()).subscribe({
      next:response=>{
        let borrowedBook:UserBookDto[] = response.responseBody as UserBookDto[]
        this.borrowLimit =  2-borrowedBook.length
      },error:err => {
        this.borrowLimit=2
      }
    })
  }

  onClear() {
    this.searchFilter.reset()
  }
}
