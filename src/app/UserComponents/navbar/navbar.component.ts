import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router: Router = inject(Router)
  authService: AuthenticationService = inject(AuthenticationService)

  logOut() {
    this.authService.logOut()
    this.router.navigate(['']).then()
  }
}
