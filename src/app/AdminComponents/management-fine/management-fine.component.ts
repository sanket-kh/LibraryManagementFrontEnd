import {Component, inject, OnInit} from '@angular/core';
import {ManageFineService} from "../services/ManageFineService";
import {PageResponse} from "../../UserComponents/UserModals/responses/PageResponse";
import {ManageUserFineDto} from "../admin-modals/Dtos/ManageUserFineDto";
import {ClearFineReq} from "../admin-modals/requests/ClearFineReq";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-management-fine',
  templateUrl: './management-fine.component.html',
  styleUrl: './management-fine.component.css'
})
export class ManagementFineComponent implements OnInit{
  fineService: ManageFineService = inject(ManageFineService)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  finesDto: ManageUserFineDto[] = []
  buttonActive:boolean =false
  selectedFine:ManageUserFineDto = {}
  showToast:boolean = false
  toastMessages:string=''

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data)=>{
        const response:DefaultResponse = data['fineList'];
        let pageResponse:PageResponse = response.responseBody as PageResponse
        this.finesDto = pageResponse.content as ManageUserFineDto[]
        this.buttonActive =false
      }
    )
  // this.getAllFines()
  }
  getAllFines(){
    this.fineService.getAllFineTransaction().subscribe({
      next:response=>{
       let pageResponse:PageResponse = response.responseBody as PageResponse
        this.finesDto = pageResponse.content
        this.buttonActive =false
      },error:err => {
        console.log(err)
      }
    })
  }
  getAllUnpaidFines(){
    this.fineService.getAllUnpaidFineTransaction().subscribe({
      next:response=>{
        let pageResponse:PageResponse = response.responseBody as PageResponse
        this.finesDto = pageResponse.content
        this.buttonActive = true
      },error:err => {
        console.log(err)
      }
    })
  }


  clearSelectedFine(fine: ManageUserFineDto) {
    this.selectedFine = fine
  }

  confirmClearFine() {
    let clearFineReq:ClearFineReq = {
      username:this.selectedFine.username,
      isbn:this.selectedFine.isbn,
      amount:this.selectedFine.amount
    }
    this.fineService.clearFineByUserAndBook(clearFineReq).subscribe({
      next:response=>{
        this.toastMessages = response.message as string
        this.showToast = true
        this.ngOnInit()
      },error:err => {
        let error = err as HttpErrorResponse
        let response:DefaultResponse = error.error
        this.toastMessages = response.message as string
        this.showToast = true
      }
    })
  }
}
