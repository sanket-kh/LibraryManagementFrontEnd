import {Component, inject, OnInit} from '@angular/core';
import {AdminAccDetailsDto} from "../admin-modals/Dtos/AdminAccDetailsDto";
import {AdminAccService} from "../services/AdminAccService";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";

@Component({
  selector: 'app-admin-acc-details',
  templateUrl: './admin-acc-details.component.html',
  styleUrl: './admin-acc-details.component.css'
})
export class AdminAccDetailsComponent implements OnInit {
  accDetails: AdminAccDetailsDto[] = []
  adminAccService: AdminAccService = inject(AdminAccService)
  router: Router = inject(Router)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  showToast: boolean = false
  toastMessage!: string

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data)=>{
        const response:any = data['accDetails'];
        this.accDetails = response.responseBody as AdminAccDetailsDto[]
      }
    )

  }

  clearAccInfo() {
    this.adminAccService.clearDetails().subscribe({
      next: response => {
        this.toastMessage = response.message as string
        this.showToast = true
        this.getAdminAccDetails()
        this.adminAccService.adminAccDetails = undefined
      }, error: err => {
        let response:DefaultResponse = err.error
        this.toastMessage = response.message as string
        this.showToast = true
      }
    })
  }
  getAdminAccDetails(){
    this.adminAccService.getAccDetails().subscribe({
      next:response=>{
        this.accDetails = response.responseBody as AdminAccDetailsDto[]
      },error:err => {
        console.log(err)
        this.accDetails = []
      }
    })
  }

  navigateToUpdateAcc() {
    this.adminAccService.adminAccDetails = this.accDetails as AdminAccDetailsDto[]
    console.log(this.accDetails)
    this.router.navigate(['admin', 'acc-details', 'modify']).then()
  }
}
