import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../UserComponents/services/authentication.service";

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent implements OnInit {
  router: Router = inject(Router)
  authService:AuthenticationService = inject(AuthenticationService)

  ngOnInit() {

  }

  navigateToHome() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['admin','home']).then()
    }else if (this.authService.isUser()){
      this.router.navigate(['user','home']).then()
    }else {
      this.router.navigate(['']).then()
    }
  }
}
