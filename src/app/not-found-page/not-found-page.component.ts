import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../UserComponents/services/authentication.service";

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent implements OnInit {
  route!: string
  router: Router = inject(Router)
  authService:AuthenticationService = inject(AuthenticationService)

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.route = '/admin/home'
    }else if (this.authService.isUser()){
      this.route = '/user/home'
    }
  }
}
