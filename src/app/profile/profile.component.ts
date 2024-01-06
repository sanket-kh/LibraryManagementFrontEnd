import {Component, inject, OnInit} from '@angular/core';
import {UserBookDto} from "../modals/dtos/UserBookDto";
import {UserDto} from "../modals/dtos/UserDto";
import {UserService} from "../services/userService";
import {BookService} from "../services/book.service";
import {BorrowedBookDto} from "../modals/dtos/BorrowedBookDto";
import {ReturnBookReq} from "../modals/requests/ReturnBookReq";
import {AuthenticationService} from "../services/authentication.service";
import {response} from "express";
import {DefaultResponse} from "../modals/responses/DefaultResponse";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private userService: UserService = inject(UserService)
  private bookService: BookService = inject(BookService)
  borrowedBookList?: BorrowedBookDto[];
  user?: UserDto;
  borrowedBook?: BorrowedBookDto;
  defaultResponse?:DefaultResponse;
  returned?:boolean;


  getBorrowedBooksByUser() {
    this.bookService.getBorrowedBooksByUser(this.userService.getUsername()).subscribe({
      next: response => {
        console.log(response)
        this.borrowedBookList = response.responseBody as BorrowedBookDto[]
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe({
      next: response => {
        console.log(response)
        this.user = response.responseBody as UserDto
        this.returned=response.success;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getBorrowedBooksByUser();

  }

  protected readonly Date = Date;


  confirmReturn(book: BorrowedBookDto) {
    this.borrowedBook = book;
  }

  returnBook(isbn?: number) {
    let returnBookReq: ReturnBookReq = {username: this.userService.getUsername(), isbn: isbn}
    this.bookService.returnBook(returnBookReq).subscribe({
      next: response => {
        this.defaultResponse = response
        this.ngOnInit()
      },
      error:err => {
        console.log(err)
      }
    })
  }
}
