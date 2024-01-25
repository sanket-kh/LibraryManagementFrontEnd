import {Component, inject, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel} from "@angular/router";
import {AuthenticationService} from "./UserComponents/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'library-application';
  modalService:NgbModal = inject(NgbModal)
  showLoader:boolean =false
  router:Router = inject(Router)
  headerColor!:string
  footerColor!:string
  userService:AuthenticationService = inject(AuthenticationService)
  public open(modal:any){
    this.modalService.open(modal)
  }

  ngOnInit(): void {
  this.router.events.subscribe((routerEvent:Event)=>{
  if (routerEvent instanceof NavigationStart){
    this.showLoader = true
  }
  if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel){
    if(this.userService.isAdmin()){
      this.headerColor = '#99BC85'
      this.footerColor ='#d4e7c6'
    }else {
      this.headerColor = '#0d6efd'
      this.footerColor = '#9bc2ff'
    }
    this.showLoader = false
  }
  })
  }
}
