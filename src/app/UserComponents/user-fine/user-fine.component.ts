import {Component, inject, OnInit} from '@angular/core';
import {FineService} from "../services/FineService";
import {UserFineDto} from "../UserModals/dtos/UserFineDto";
import {ActivatedRoute} from "@angular/router";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";

@Component({
  selector: 'app-user-fine',
  templateUrl: './user-fine.component.html',
  styleUrl: './user-fine.component.css'
})
export class UserFineComponent implements OnInit{
fineService:FineService = inject(FineService)
userFineDtos:UserFineDto[] = []
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  ngOnInit(){
  this.activatedRoute.data.subscribe({
    next:value => {
      if (value){
        let response:DefaultResponse = value['fineList']
        this.userFineDtos = response.responseBody as UserFineDto[]
      }

    },error:err => {
      this.userFineDtos = []
    }
  })
  // this.fineService.getUserFined().subscribe({
  //   next:response=>{
  //     console.log(response)
  //     this.userFineDtos = response.responseBody as UserFineDto []
  //
  //   }
  // })
  }
}
