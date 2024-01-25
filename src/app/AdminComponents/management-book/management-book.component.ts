import {Component, DoCheck, inject, OnInit} from '@angular/core';
import {UserBookDto} from "../../UserComponents/UserModals/dtos/UserBookDto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../UserComponents/services/userService";
import {DOCUMENT} from "@angular/common";
import {SearchBookDto} from "../../UserComponents/UserModals/dtos/SearchBookDto";
import {BookDto} from "../admin-modals/Dtos/BookDto";
import {ManageBookService} from "../services/ManageBookService";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../../UserComponents/UserModals/responses/DefaultResponse";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-management-book',
  templateUrl: './management-book.component.html',
  styleUrl: './management-book.component.css'
})
export class ManagementBookComponent implements OnInit {
  bookList: BookDto[] = []
  bookService: ManageBookService = inject(ManageBookService)
  router: Router = inject(Router)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  formBuilder: FormBuilder = inject(FormBuilder)
  userService: UserService = inject(UserService)
  document: Document = inject(DOCUMENT)
  pageNumber: number = 0
  selectedBook: BookDto = {}
  notFound: boolean = false
  showToast: boolean = false
  searchInput: SearchBookDto = {}
  searchFilter: FormGroup = this.formBuilder.group({
    isbn: [''],
    title: [''],
    author: ['']
  })
  toastMessage?: string;

  ngOnInit(): void {
    this.pageNumber = 0
    this.activatedRoute.data.subscribe(
      (data)=>{
        const response:DefaultResponse = data['bookList'];
        this.bookList = response.responseBody as BookDto[]
      }
    )
    // this.getAllBooksLibrarian()
    this.bookService.bookDto = undefined
  }

  searchBooks() {
    this.pageNumber = 0
    this.notFound = false;
    this.searchInput = this.searchFilter.value
    if (!this.searchInput.isbn && !this.searchInput.author && !this.searchInput.title) {
      this.bookService.getAllBooksLibrarian(this.pageNumber).subscribe({
        next: (response) => {
          console.log(response)
          this.bookList = response.responseBody as BookDto[]
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

    this.bookService.searchBook(this.searchInput).subscribe({
      next: (response) => {
        console.log(response)
        if (!response) {
          this.notFound = true;
          this.bookList = []
          console.log("not found status:" + this.notFound)

        } else {
          this.bookList = response.responseBody as UserBookDto[]
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  makeUnavailable(isbn: number) {
    this.bookService.makeUnavailable(isbn).subscribe({
      next: response => {
        this.getAllBooksLibrarian()
        this.toastMessage = response.message as string
        this.showToast = true
        this.ngOnInit()
      },
      error: err => {
        let error: HttpErrorResponse = err
        console.log(err)
        let defaultResponse: DefaultResponse = error.error
        this.toastMessage = defaultResponse.message as string
        this.showToast = true

      }
    })
  }

  makeAvailable(isbn: number) {
    this.showToast = false
    this.bookService.makeAvailable(isbn).subscribe({
      next: response => {
        this.getAllBooksLibrarian()
        this.toastMessage = response.message
        this.showToast = true
        this.ngOnInit()
      },
      error: err => {
        console.log(err)
        let error: HttpErrorResponse = err
        console.log(err)
        let defaultResponse: DefaultResponse = error.error
        this.toastMessage = defaultResponse.message
        this.showToast = true
      }
    })
  }

  getAllBooksLibrarian() {
    this.showToast = false
    this.bookService.getAllBooksLibrarian(this.pageNumber).subscribe({
      next: response => {
        this.bookList = response.responseBody as BookDto[]
      },
      error: err => {
        console.log(err)
      }
    })
  }

  setBook(book: BookDto) {
    this.selectedBook = book;
  }

  changeAvailability(selectedBook: BookDto) {
    if (selectedBook.isAvailable) {
      this.makeUnavailable(selectedBook.isbn as number)
    } else {
      this.makeAvailable(selectedBook.isbn as number)
    }
  }


  navigateToModifyBook(book: BookDto) {
    this.bookService.bookDto = book as BookDto
    this.router.navigate(['admin', 'modify-books']).then()
  }

  onScrolled() {
    this.pageNumber++
    this.bookService.getAllBooksLibrarian(this.pageNumber).subscribe({
      next: response => {
        this.bookList?.push(...response.responseBody as BookDto[])
      }
    })
  }

  onClear() {
    this.searchFilter.reset()
  }


}
