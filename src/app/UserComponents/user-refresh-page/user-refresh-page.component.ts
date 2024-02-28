import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import { LoadingPageComponent } from '../../loading-page/loading-page.component';

@Component({
    selector: 'app-user-refresh-page',
    templateUrl: './user-refresh-page.component.html',
    styleUrl: './user-refresh-page.component.css',
    standalone: true,
    imports: [LoadingPageComponent]
})
export class UserRefreshPageComponent implements OnInit{
  router:Router = inject(Router)
  authService:AuthenticationService = inject(AuthenticationService)
  ngOnInit(): void {
    if ( !this.authService.getAuthToken())
      this.router.navigate(['']).then()
  }

}
