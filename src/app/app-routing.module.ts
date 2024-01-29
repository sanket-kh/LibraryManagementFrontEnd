import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthenticationService} from "./UserComponents/services/authentication.service";
import {
  adminAccount,
  adminManageBooks, adminManageFine, adminManageUser, adminProfile,
  adminTransactionResolver,
  canActivateAdminView, canActivateEditAccDetails, canActivateEditAdminDetailsUser,
  canActivateEditBookDetails,
  canActivateEditUserDetailsUser,
  canActivateUserView, userBookListResolver, userFineListResolver, userTransactionResolver
} from "./UserComponents/services/routingService";
import {ManagementHomeComponent} from "./AdminComponents/management-home/management-home.component";
import {UserHomeComponent} from "./UserComponents/user-home/user-home.component";
import {UserTransactionComponent} from "./UserComponents/user-transaction/user-transaction.component";
import {UserDetailsFormComponent} from "./UserComponents/user-details-form/user-details-form.component";
import {ChangePasswordComponent} from "./UserComponents/change-password/change-password.component";
import {UserFineComponent} from "./UserComponents/user-fine/user-fine.component";
import {ProfileComponent} from "./UserComponents/profile/profile.component";
import {ManagementProfileComponent} from "./AdminComponents/management-profile/management-profile.component";
import {ManagementTransactionComponent} from "./AdminComponents/management-transaction/management-transaction.component";
import {ManagementFineComponent} from "./AdminComponents/management-fine/management-fine.component";
import {ManagementUserComponent} from "./AdminComponents/management-user/management-user.component";
import {ManagementBookComponent} from "./AdminComponents/management-book/management-book.component";
import {ModifyBookComponent} from "./AdminComponents/modify-book/modify-book.component";
import {
  ManagementAddExistingComponent
} from "./AdminComponents/management-add-existing/management-add-existing.component";
import {
  ManagementChangePasswordComponent
} from "./AdminComponents/management-change-password/management-change-password.component";
import {
  ManagementEditDetailsComponent
} from "./AdminComponents/management-edit-details/management-edit-details.component";
import {
  ManagementUserDetailsComponent
} from "./AdminComponents/management-user-details/management-user-details.component";
import {AdminAccSetupComponent} from "./AdminComponents/admin-acc-setup/admin-acc-setup.component";
import {AdminAccDetailsComponent} from "./AdminComponents/admin-acc-details/admin-acc-details.component";
import {AdminSetupNewComponent} from "./AdminComponents/admin-setup-new/admin-setup-new.component";
import {Home} from "@mui/icons-material";
import {AdminRefreshPageComponent} from "./AdminComponents/admin-refresh-page/admin-refresh-page.component";
import {UserRefreshPageComponent} from "./UserComponents/user-refresh-page/user-refresh-page.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'user', children: [
      {path: 'home', component: UserHomeComponent, canActivate: [canActivateUserView], resolve: {bookList:userBookListResolver}},
      {path: 'profile', component: ProfileComponent, canActivate: [canActivateUserView]},
      {path: 'transactions', component: UserTransactionComponent, canActivate: [canActivateUserView] , resolve:{transactionList:userTransactionResolver}},
      {path: 'edit-details', component: UserDetailsFormComponent, canActivate: [canActivateEditUserDetailsUser]},
      {path: 'change-password', component: ChangePasswordComponent, canActivate: [canActivateUserView]},
      {path: 'fines', component: UserFineComponent, canActivate: [canActivateUserView], resolve: {fineList:userFineListResolver}},
      {path: 'refresh', component: UserRefreshPageComponent}

    ]
  },
  {
    path: 'admin', children: [
      {path: 'home', component: ManagementHomeComponent, canActivate: [canActivateAdminView]},
      {path: 'profile', component: ManagementProfileComponent, canActivate: [canActivateAdminView], resolve: {adminDetails:adminProfile}},
      {path: 'transactions', component: ManagementTransactionComponent, canActivate:[canActivateAdminView], resolve: {transactionList:adminTransactionResolver}},
      {path: 'fines', component: ManagementFineComponent, canActivate: [canActivateAdminView], resolve: {fineList:adminManageFine}},
      {path: 'manage-users', component: ManagementUserComponent, canActivate:[canActivateAdminView], resolve: {userList:adminManageUser}},
      {path: 'manage-books', component: ManagementBookComponent, canActivate: [canActivateAdminView], resolve: {bookList:adminManageBooks}},
      {path: 'modify-books', component: ModifyBookComponent, canActivate: [canActivateEditBookDetails]},
      {path: 'new-book', component: ModifyBookComponent, canActivate: [canActivateAdminView]},
      {path: 'add-existing', component:ManagementAddExistingComponent , canActivate:[canActivateAdminView]},
      {path:'edit-details', component: ManagementEditDetailsComponent, canActivate: [canActivateEditAdminDetailsUser]},
      {path: 'change-password', component: ManagementChangePasswordComponent, canActivate: [canActivateAdminView]},
      {path: 'user-details/:username', component: ManagementUserDetailsComponent, canActivate: [canActivateAdminView]},
      {path: 'acc-details/setup' , component: AdminAccSetupComponent , canActivate: [canActivateAdminView]},
      {path: 'acc-details', component: AdminAccDetailsComponent, canActivate: [canActivateAdminView], resolve: {accDetails:adminAccount}},
      {path: 'acc-details/modify', component: AdminAccSetupComponent, canActivate: [canActivateEditAccDetails]},
      {path: 'setup-new', component: AdminSetupNewComponent, canActivate: [canActivateAdminView]},
      {path: 'refresh', component: AdminRefreshPageComponent}
    ]
  },
  {path:'', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule],
  providers:[

  ]
})
export class AppRoutingModule {

}
