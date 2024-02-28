import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../UserComponents/services/book.service";
import {BorrowedBookDto} from "../../UserComponents/UserModals/dtos/BorrowedBookDto";
import {UserDto} from "../../UserComponents/UserModals/dtos/UserDto";
import {DefaultResponse} from "../../UserComponents/UserModals/responses/DefaultResponse";
import {ManageUserService} from "../services/ManageUserService";
import {ManageUserDto} from "../admin-modals/Dtos/ManageUserDto";
import {UserFineDto} from "../../UserComponents/UserModals/dtos/UserFineDto";
import {FineService} from "../../UserComponents/services/FineService";
import {AdminAccService} from "../services/AdminAccService";
import {AdminAccDetailsDto} from "../admin-modals/Dtos/AdminAccDetailsDto";
import {ClearFineReq} from "../admin-modals/requests/ClearFineReq";
import {HttpErrorResponse} from "@angular/common/http";
import {ManageFineService} from "../services/ManageFineService";
import {AccountTypes} from "../admin-modals/Dtos/AccountTypes";

@Component({
  selector: 'app-management-user-details',
  templateUrl: './management-user-details.component.html',
  styleUrl: './management-user-details.component.css'
})
export class ManagementUserDetailsComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private userService: ManageUserService = inject(ManageUserService)
  private bookService: BookService = inject(BookService)
  private router: Router = inject(Router)
  private manageFines: ManageFineService = inject(ManageFineService)
  private fineService: FineService = inject(FineService)
  protected userFineDtos: UserFineDto[] = []
  borrowedBookList: BorrowedBookDto[] = [];
  user: ManageUserDto = {};
  private adminAccService = inject(AdminAccService)
  defaultResponse?: DefaultResponse;
  username?: string;
  accTypes?: string[];
  selectedAccType?: string;
  selectedBook?:string;
  accDetails?: AdminAccDetailsDto;
  qrDetails: string = '';
  clearFineReq: ClearFineReq = {}
  protected toastMessages: string = '';
  protected showToast: boolean = false;


  ngOnInit() {
    this.getUsername()
    this.getUserDetails()
    this.getBorrowedBooksByUser()
    this.getFinesOwed()
    this.getAccountTypes()
  }

  getFinesOwed() {
    this.fineService.getUserFineByUsername(this.username as string).subscribe({
      next: response => {
        console.log(response)
        this.userFineDtos = response.responseBody as UserFineDto []
      },error:err => {
        this.userFineDtos = []
      }
    })
  }

  getAccountTypes() {
    this.adminAccService.getAllAccTypes().subscribe({
      next: response => {
        let accountTypes:AccountTypes  = response.responseBody as AccountTypes
        this.accTypes = accountTypes.accountTypeNames as string[]
        console.log(this.accTypes)
      }
    })
  }

  getUsername() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username') as string
    console.log(this.username)
  }

  getBorrowedBooksByUser() {
    this.bookService.getBorrowedBooksByUser(this.username as string).subscribe({
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
    this.userService.getUserByUsername(this.username as string).subscribe({
      next: response => {
        console.log(response)
        this.user = response.responseBody as UserDto;

      },
      error: err => {
        console.log('some error occurred')
        console.log(err)

      }
    })
  }

  onSelect() {
    this.adminAccService.getClearFineAccountByAccountType(this.selectedAccType as string).subscribe({
      next: response => {
        this.accDetails = response.responseBody as AdminAccDetailsDto
        this.qrDetails = this.toQrDetails(this.accDetails)
      },error:err => {
      console.log(err)
    }
    })
  }


  private toQrDetails(accDetails: AdminAccDetailsDto) {
    return '{' +
      ' accountType:' + accDetails.accountTypeName +
      ' associatedOrg:' + accDetails.accountAssociatedOrganizationName +
      ' accountName:' + accDetails.accountName +
      ' accountNumber:' + accDetails.accountNumber +
      ' }';
  }

  onConfirmPayment() {
    console.log('here')
    this.manageFines.clearFineByUserAndBook(this.clearFineReq).subscribe({
      next: response => {
        this.toastMessages = response.message as string
        this.showToast = true
        this.getFinesOwed()
      }, error: err => {
        let error = err as HttpErrorResponse
        let response: DefaultResponse = error.error
        this.toastMessages = response.message as string
        this.showToast = true
      }
    })
  }

  onClearClick(fine: UserFineDto) {
    this.clearFineReq.amount = fine.amount
    this.clearFineReq.isbn = fine.isbn
    this.clearFineReq.username = this.username
    this.selectedBook = fine.title
  }

  onClose() {
    this.clearFineReq = {}
    this.qrDetails = ''
    this.accDetails = undefined
    this.selectedAccType=''
  }
  goBack() {
    this.router.navigate(['admin', 'manage-users']).then()
  }
}
