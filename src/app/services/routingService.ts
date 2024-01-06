import {AuthenticationService} from "./authentication.service";
import {inject} from "@angular/core";
import {ActivatedRoute, Route, Router, RouterModule} from "@angular/router";

export const canActivate = ()=>{
   let authService:AuthenticationService = inject(AuthenticationService);
   let router:Router = inject(Router)
   if(authService.isAuthenticated()){
     return true
   }else {
     router.navigate(['/login']).then()
     return false;
   }
  }
