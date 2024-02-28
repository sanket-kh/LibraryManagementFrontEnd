import {Component, Inject, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../UserComponents/services/authentication.service";
import {fromEvent, Observable, Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  onlineEvent!: Observable<Event>;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];
  userService: AuthenticationService = inject(AuthenticationService)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  authService:AuthenticationService = inject(AuthenticationService)
  route!:string
  router = inject(Router)
  connectionStatusMessage!: string;
  connectionStatus!: string;
  showConnectionStatus!: boolean;
  @Input() headerColor!: string;

  constructor(@Inject(DOCUMENT) private document: Document) {

  }
  ngOnInit(): void {
    let window = this.document.defaultView?.window as Window
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connection restored';
      this.connectionStatus = 'online';
      setTimeout(()=> {
        this.showConnectionStatus = false
        document.defaultView?.location.reload()
      }, 600)
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = "Connection lost! Looks like you're offline";
      this.connectionStatus = 'offline';
      this.showConnectionStatus = true
    }));
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  navigateToHome() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['admin','home']).then()
    }else if (this.authService.isUser()){
      this.router.navigate(['admin','home']).then()
    }
  }
}
