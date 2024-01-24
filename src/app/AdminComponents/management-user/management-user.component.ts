import {Component, inject, OnInit} from '@angular/core';
import {ManageUserService} from "../services/ManageUserService";
import {ManageUserDto} from "../admin-modals/Dtos/ManageUserDto";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponse} from "../admin-modals/responses/DefaultResponse";
import {LockUserReq} from "../admin-modals/requests/LockUserReq";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrl: './management-user.component.css'
})
export class ManagementUserComponent implements OnInit {
  userService: ManageUserService = inject(ManageUserService)
   router:Router = inject(Router)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  userList: ManageUserDto[] = []
  searchUsername: string = ''
  selectedUser: ManageUserDto = {};
  showToast: boolean = false;
  toastMessage: string = '';
  remark: string = '';
  showRemark: boolean=false;
  lockedUserButton:boolean = false
  allUserButton: boolean = true;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data)=>{
        const response:DefaultResponse = data['userList'];
        this.userList = response.responseBody as ManageUserDto[]
      }
    )
    // this.getAllUsers()
  }


  confirmLockUser() {
    let lockUserReq:LockUserReq={username:this.selectedUser.username, remark:this.selectedUser.remark}
    this.userService.lockUser(lockUserReq).subscribe({
      next:response=>{
        this.getAllUsers()
        this.toastMessage= response.message as string
        this.showToast =true
        this.ngOnInit()
      },error:err => {
        console.log(err)
        let error: HttpErrorResponse = err
        let defaultRes: DefaultResponse = error.error
        this.toastMessage = defaultRes.message as string
        this.showToast = true
      }
    })
  }
  lockUser(user:ManageUserDto){
    this.selectedUser = user;
  }


  confirmUnlockUser(){
    this.userService.unlockUser(this.selectedUser.username as string).subscribe({
      next:response=>{
        this.toastMessage= response.message as string
        this.showToast =true
        if(this.userList.length==1){
          this.showRemark = false
          this.toastMessage = 'user unlocked'
          this.showToast = true
        }
        if(this.showRemark){
          this.getLockedUsers()
        }
        if(!this.showRemark){
          this.getAllUsers()
        }


      },error:err => {
        console.log(err)
        this.getLockedUsers()
        let error: HttpErrorResponse = err
        let defaultRes: DefaultResponse = error.error
        this.toastMessage = defaultRes.message as string
        this.showToast = true
      }
    })
  }
  unlockUser(user: ManageUserDto) {
    this.selectedUser = user
  }

  disableUser(user: ManageUserDto) {
    this.selectedUser = user;

  }

  enableUser(user: ManageUserDto) {
    this.selectedUser = user;
  }



  searchUser() {
    this.userService.searchUser(this.searchUsername).subscribe({
      next: response => {
        this.userList = response.responseBody as ManageUserDto[]
        this.allUserButton = true
        this.lockedUserButton = true
      }, error: err => {
        console.log(err)
        let error: HttpErrorResponse = err
        let defaultRes: DefaultResponse = error.error
        this.toastMessage = defaultRes.message as string
        this.showToast = true
      }
    })
  }



  addRemark($event: string) {
    console.log($event)
    this.selectedUser.remark = $event
    this.confirmLockUser()
  }

  getAllUsers() {
    this.showRemark=false
    this.userService.getAllUsers().subscribe({
      next: response => {
        this.userList = response.responseBody as ManageUserDto[]
        this.allUserButton = false
        this.lockedUserButton = true
      }, error: err => {
        let error: HttpErrorResponse = err
        let defaultRes: DefaultResponse = error.error
        this.toastMessage = defaultRes.message as string
        this.showToast = true
      }
    })
  }

  getLockedUsers() {
    this.userService.getLockedUsers().subscribe({
      next: response => {
        this.userList = response.responseBody as ManageUserDto[]
        this.showRemark=true
        this.lockedUserButton = false
        this.allUserButton = true
      }, error: err => {
        let error: HttpErrorResponse = err
        let defaultRes: DefaultResponse = error.error
        this.getAllUsers()
        this.toastMessage = defaultRes.message as string
        this.showToast = true
        this.showRemark=false
      }
    })
  }


}
