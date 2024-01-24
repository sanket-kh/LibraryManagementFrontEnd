import {Component, inject, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel} from "@angular/router";

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
  public open(modal:any){
    this.modalService.open(modal)
  }

  ngOnInit(): void {
  this.router.events.subscribe((routerEvent:Event)=>{
  if (routerEvent instanceof NavigationStart){
    this.showLoader = true
  }
  if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel){
    this.showLoader = false
  }
  })
  }
}
