import {Component, inject} from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class NavbarComponent {
  router: Router = inject(Router)
  authService: AuthenticationService = inject(AuthenticationService)

  logOut() {
    this.authService.logOut()
    this.router.navigate(['']).then()
  }
}
