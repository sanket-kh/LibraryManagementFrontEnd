import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../services/userService";
import {BookService} from "../services/book.service";
import {UserBookTransactionDto} from "../UserModals/dtos/UserBookTransactionDto";
import {ActivatedRoute} from "@angular/router";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import { NgIf, DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-user-transaction',
    templateUrl: './user-transaction.component.html',
    styleUrl: './user-transaction.component.css',
    standalone: true,
    imports: [NavbarComponent, NgIf, DatePipe]
})
export class UserTransactionComponent implements OnInit{
  private userService: UserService = inject(UserService)
  private bookService: BookService = inject(BookService)
  userTransactions:UserBookTransactionDto[] =[]
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)

  getAllUserTransactions(){
    this.activatedRoute.data.subscribe(
    (data)=>{
      let response:DefaultResponse = data['transactionList']
      this.userTransactions = response.responseBody as UserBookTransactionDto[]
    }
    )
  }

  ngOnInit(): void {
    this.getAllUserTransactions();
  }

}
