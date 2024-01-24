import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../services/userService";
import {BookService} from "../services/book.service";
import {BorrowedBookDto} from "../UserModals/dtos/BorrowedBookDto";
import {UserDto} from "../UserModals/dtos/UserDto";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {ReturnBookReq} from "../UserModals/requests/ReturnBookReq";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private userService: UserService = inject(UserService)
  private bookService: BookService = inject(BookService)
  private router:Router = inject(Router)
  borrowedBookList?: BorrowedBookDto[];
  user: UserDto={};
  borrowedBook?: BorrowedBookDto;
  defaultResponse?:DefaultResponse;
  returned?:boolean;
  showToast:boolean = false;


  getBorrowedBooksByUser() {
    this.bookService.getBorrowedBooksByUser(this.userService.getUsername()).subscribe({
      next: response => {
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
        this.user = response.responseBody as UserDto
        this.userService.userDetails = this.user
        this.userService.userDetailsEmpty=false
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
  navigateToUserDetails(){
    this.router.navigate(['user','edit-details']).then();
  }
  navigateToChangePassword(){
    this.router.navigate(['user', 'change-password']).then();
  }
  confirmReturn(book: BorrowedBookDto) {
    this.borrowedBook = book;
  }

  returnBook(isbn?: number) {
    this.showToast = false
    let returnBookReq: ReturnBookReq = {username: this.userService.getUsername(), isbn: isbn}
    this.bookService.returnBook(returnBookReq).subscribe({
      next: response => {
        this.defaultResponse = response
        this.showToast =true
        this.getBorrowedBooksByUser()
      },
      error:err => {
        console.log(err)
        let error:HttpErrorResponse = err
        this.defaultResponse = error.error
        this.showToast = true
      }
    })
  }
}
