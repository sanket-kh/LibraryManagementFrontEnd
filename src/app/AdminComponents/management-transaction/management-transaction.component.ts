import {Component, HostListener, inject, OnInit} from '@angular/core';
import {ManageBookTransactionDto} from "../admin-modals/Dtos/ManageBookTransactionDto";
import {ManageBookService} from "../services/ManageBookService";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {SearchTransactionReq} from "../admin-modals/requests/SearchTransactionReq";
import {DateDto} from "../admin-modals/Dtos/DateDto";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import dayjs from "dayjs";
import { DOCUMENT, ViewportScroller, NgIf, DatePipe } from "@angular/common";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApwDaterangepickerBsModule } from 'apw-daterangepicker-bs';
import { MaxLengthDirective } from '../../directives/max-length.directive';
import { NoSpecialCharDirective } from '../../directives/no-special-char.directive';
import { NoAlphabetsDirective } from '../../directives/no-alphabets.directive';
import { ManagementNav } from '../management-nav/navbar.component';

@Component({
    selector: 'app-management-transaction',
    templateUrl: './management-transaction.component.html',
    styleUrl: './management-transaction.component.css',
    standalone: true,
    imports: [ManagementNav, FormsModule, ReactiveFormsModule, NoAlphabetsDirective, NoSpecialCharDirective, MaxLengthDirective, ApwDaterangepickerBsModule, InfiniteScrollModule, NgIf, NgbToast, DatePipe]
})
export class ManagementTransactionComponent implements OnInit {
  transactionList: ManageBookTransactionDto[] = []
  manageBookService: ManageBookService = inject(ManageBookService)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  document: Document = inject(DOCUMENT)
  router: Router = inject(Router)
  viewPort = inject(ViewportScroller)
  currentPage: number = 0
  showToTopButton!: boolean
  searchFilter: FormGroup = new FormGroup<any>({})
  searchTransactionReq!: SearchTransactionReq
  showToast: boolean = false;
  toastMessage: string = '';
  datePickerConfig: any = {
    format: 'YYYY-MM-DD',
    separator: ' to ',
  };

  ngOnInit(): void {
    this.currentPage = 0
    this.activatedRoute.data.subscribe(
      (data) => {
        const response: DefaultResponse = data['transactionList'];
        this.transactionList = response.responseBody as ManageBookTransactionDto[]
      }
    )
    this.searchFilter = new FormGroup<any>({
      isbn: new FormControl<string>(''),
      username: new FormControl<string>(''),
      date: new FormControl<string>(''),
    })
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (scrollPosition > 100) {
      this.showToTopButton = true
    } else {
      this.showToTopButton = false
    }
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

  goToTop() {
    this.viewPort.scrollToPosition([0, 0])
  }

  setDate(date: DateDto) {
    if (date.fromDate !== null && date.toDate !== null) {
      this.searchTransactionReq.fromDate = date.fromDate.set("hour", 0).set("minute", 0).set("second", 0).format('YYYY-MM-DD HH:mm:ss')
      this.searchTransactionReq.toDate = date.toDate.set("hour", 23).set("minute", 59).set("second", 59).format('YYYY-MM-DD HH:mm:ss')
      if (this.searchTransactionReq.fromDate.substring(0, 10) === this.searchTransactionReq.toDate.substring(0, 10)) {
        this.searchTransactionReq.toDate = null
      }
    }
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

    if (!this.searchFilter.dirty) {
      this.getAllTransactions()
      return;
    }
    console.log(this.isbn?.value)
    this.searchTransactionReq = this.searchFilter.value
    if (this.searchTransactionReq.isbn == null && this.searchTransactionReq.username == '' &&
      this.searchTransactionReq.fromDate === null) {
      console.log('here')
      this.getAllTransactions();
      return
    }
    console.log(this.date?.value)
    if (this.date?.value) {
      this.setDate(this.date?.value)
    }
    console.log(this.searchTransactionReq)
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
    this.searchFilter.markAsPristine()

  }

  getTodayDate() {
    return dayjs();
  }

  protected readonly dayjs = dayjs;
}
