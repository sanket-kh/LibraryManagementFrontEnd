import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../UserComponents/services/authentication.service";

@Component({
  selector: 'app-admin-refresh-page',
  templateUrl: './admin-refresh-page.component.html',
  styleUrl: './admin-refresh-page.component.css'
})
export class AdminRefreshPageComponent implements OnInit{
  router:Router = inject(Router)
  authService:AuthenticationService = inject(AuthenticationService)
    ngOnInit(): void {
    if ( !this.authService.getAuthToken())
        this.router.navigate(['']).then()
    }
}
