import {Component, inject, OnInit} from '@angular/core';
import {UserDto} from "../../UserComponents/UserModals/dtos/UserDto";
import {UserService} from "../../UserComponents/services/userService";
import {DefaultResponse} from "../../UserComponents/UserModals/responses/DefaultResponse";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-management-profile',
  templateUrl: './management-profile.component.html',
  styleUrl: './management-profile.component.css'
})
export class ManagementProfileComponent implements OnInit{
  user: UserDto ={};
  private userService: UserService = inject(UserService)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  private router:Router = inject(Router)
  defaultResponse?:DefaultResponse;
  returned?:boolean;
  showToast:boolean = false;
  ngOnInit(): void {

    this.activatedRoute.data.subscribe(
      (data)=>{
        const response:DefaultResponse = data['adminDetails'];
        this.user = response.responseBody as UserDto
        this.userService.userDetails = this.user
        this.userService.userDetailsEmpty=false
        this.returned=response.success;
      }
    )
    // this.getUserDetails()
  }

  // getUserDetails() {
  //   this.userService.getUserDetails().subscribe({
  //     next: response => {
  //       console.log(response)
  //       this.user = response.responseBody as UserDto
  //       this.userService.userDetails = this.user
  //       this.userService.userDetailsEmpty=false
  //       this.returned=response.success;
  //     },
  //     error: err => {
  //       console.log(err)
  //     }
  //   })
  // }
  navigateToAdminDetails(){
    this.router.navigate(['admin','edit-details']).then();
  }
  navigateToChangePassword(){
    this.router.navigate(['admin', 'change-password']).then();
  }



}
