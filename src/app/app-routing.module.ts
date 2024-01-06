import {inject, NgModule} from '@angular/core';
import {CanActivateFn, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserHomeComponent} from "./user-home/user-home.component";
import {AuthenticationService} from "./services/authentication.service";
import {canActivate} from "./services/routingService";
import {ProfileComponent} from "./profile/profile.component";
import {UserTransactionComponent} from "./user-transaction/user-transaction.component";

const routes: Routes = [
  {path:'login' , component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user',  children:[
      {path:'home', component:UserHomeComponent , canActivate:[canActivate]},
      {path:'profile', component:ProfileComponent, canActivate:[canActivate]},
      {path:'transactions', component:UserTransactionComponent, canActivate:[canActivate]}
    ]},
  {path:'', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  authService:AuthenticationService = inject(AuthenticationService)

}
