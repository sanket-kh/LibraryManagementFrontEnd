import {Component, inject, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {AuthenticationService} from "./UserComponents/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'library-application';
  modalService: NgbModal = inject(NgbModal)
  showLoader: boolean = false
  router: Router = inject(Router)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  headerColor!: string
  footerColor!: string
  userService: AuthenticationService = inject(AuthenticationService)

  public open(modal: any) {
    this.modalService.open(modal)
  }

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart && routerEvent.url.startsWith('/admin')) {
        this.showLoader = true

        this.headerColor = '#99BC85'
        this.footerColor = '#d4e7c6'

      }
      if ((routerEvent instanceof NavigationStart && !routerEvent.url.startsWith('/admin'))) {
        this.showLoader = true
        this.headerColor = '#0d6efd'
        this.footerColor = '#9bc2ff'
      }


      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel) {

        this.showLoader = false
      }
    })
  }
}
