import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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
  document: Document = inject(DOCUMENT)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  pageNumber: number = 0
  notFound: boolean = false
  showToast: boolean = false
  defaultResponse?: DefaultResponse
  borrowedBooks!: UserBookDto[]
  borrowLimit: number = 2
  searchInput: SearchBookDto = {}
  borrowBook: UserBookDto = {}
  el!: ElementRef
  searchFilter: FormGroup = this.formBuilder.group({
    isbn: ['',],
    title: ['',],
    author: ['']
  })
  borrowBookMessage?: string;

  ngOnInit(): void {
    this.getBorrowedBookNumber().then(data =>
      this.activatedRoute.data.subscribe({
        next: value => {
          let response: DefaultResponse = value['bookList']
          this.bookList = response.responseBody as UserBookDto[]
        }, error: err => {
          this.bookList = []
        }

      })
    );


    // this.getBorrowedBookNumber()
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
        this.ngOnInit()
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

  async getBorrowedBookNumber() {
    this.bookService.getBooksBorrowedByUser().subscribe({
      next: response => {
        this.borrowedBooks = response.responseBody as UserBookDto[]
        this.borrowLimit = 2 - this.borrowedBooks.length
      }, error: err => {
        this.borrowLimit = 2
      }
    })
  }

  onClear() {
    this.searchFilter.reset()
  }

  disableBorrowBook(book: UserBookDto): boolean {
    if (this.borrowedBooks == undefined) {
      return false;
    }
    return this.borrowedBooks.some(borrowedBook => borrowedBook.isbn == book.isbn)
  }
}
