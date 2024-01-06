import {Component, inject} from '@angular/core';
import {UserService} from "../services/userService";
import {BookService} from "../services/book.service";
import {UserBookTransactionDto} from "../modals/dtos/UserBookTransactionDto";
import {response} from "express";
import {DEBUG} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrl: './user-transaction.component.css'
})
export class UserTransactionComponent {
  private userService: UserService = inject(UserService)
  private bookService: BookService = inject(BookService)
  userTransactions:UserBookTransactionDto[] =[]

  getAllUserTransactions(username:string){
    this.bookService.getAllUserTransaction(username).subscribe({
      next:response=> {
        console.log(response)
        this.userTransactions = response.responseBody as UserBookTransactionDto[]
      },
      error:err => {
        console.log(err)
      }
    })
  }

}
