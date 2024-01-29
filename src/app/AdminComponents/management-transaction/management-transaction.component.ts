import {Component, inject, OnInit} from '@angular/core';
import {ManageBookTransactionDto} from "../admin-modals/Dtos/ManageBookTransactionDto";
import {ManageBookService} from "../services/ManageBookService";
import {FormControl, FormGroup} from "@angular/forms";
import {SearchTransactionReq} from "../admin-modals/requests/SearchTransactionReq";
import {DateDto} from "../admin-modals/Dtos/DateDto";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";

@Component({
  selector: 'app-management-transaction',
  templateUrl: './management-transaction.component.html',
  styleUrl: './management-transaction.component.css'
})
export class ManagementTransactionComponent implements OnInit {
  transactionList: ManageBookTransactionDto[] = []
  manageBookService: ManageBookService = inject(ManageBookService)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  router:Router = inject(Router)
  currentPage: number = 0
  searchFilter: FormGroup = new FormGroup<any>({})
  searchTransactionReq: SearchTransactionReq = {}
  showToast: boolean = false;
  toastMessage: string = '';

  ngOnInit(): void {
    this.currentPage = 0
    console.log(this.currentPage)
     this.activatedRoute.data.subscribe(
       (data)=>{
         const response:DefaultResponse = data['transactionList'];
         this.transactionList = response.responseBody as ManageBookTransactionDto[]
       }
     )
    // this.getAllTransactions()
    this.searchFilter = new FormGroup<any>({
      isbn: new FormControl(null),
      username: new FormControl(''),
      date: new FormControl<Date|string>('')
    })
  }

  getAllTransactions() {
    this.manageBookService.getAllTransactions().subscribe({
      next: response => {
        this.transactionList = response.responseBody as ManageBookTransactionDto[]
      }, error: err => {
        console.log(err)
      }
    })
  }

  setDate(date: DateDto): string {
    let dateString = date.year as string
    return dateString = date.year + "-" + date.month + "-" + date.day
  }



  get isbn() {
    return this.searchFilter.get('isbn')
  }

  get username() {
    return this.searchFilter.get('username')
  }

  get date() {
    return this.searchFilter.get('date')
  }


  onScroll() {
    this.currentPage++
    console.log(this.currentPage)
    this.manageBookService.getScrolledTransactions(this.currentPage).subscribe({
      next: response => {
        console.log(response)
        this.transactionList.push(...response.responseBody as ManageBookTransactionDto[])
      }, error: err => {
        console.log(err)
      }
    })
  }

  searchTransactions(): void {
    if(!this.searchFilter.dirty){
      this.getAllTransactions()
      return;
    }
    this.searchTransactionReq = this.searchFilter?.value

    if (this.date?.value != ''){
      this.searchTransactionReq.date = this.setDate(this.date?.value)
    }

    if (this.searchTransactionReq.isbn == null && this.searchTransactionReq.username == '' && this.searchTransactionReq.date == '') {
      this.getAllTransactions();
      return
    }

    this.manageBookService.searchTransaction(this.searchTransactionReq).subscribe({
      next: response => {
        console.log(response)
        this.transactionList = response.responseBody as ManageBookTransactionDto[]
      }, error: err => {
        this.transactionList = []
        this.toastMessage = "No results found"
        this.showToast = true
        console.log(err)
      }
    })
  }

  onClear() {
    this.searchFilter.reset()
  }
}
