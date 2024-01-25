import {Component, Inject, inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {UserService} from "../UserComponents/services/userService";
import {AuthenticationService} from "../UserComponents/services/authentication.service";
import {fromEvent, Observable, Subscription} from "rxjs";
import {DOCUMENT, isPlatformBrowser, Location} from "@angular/common";

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
      console.log('Online...');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = "Connection lost! Looks like you're offline";
      this.connectionStatus = 'offline';
      this.showConnectionStatus = true
      console.log('Offline...');
    }));
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
