import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RegisterComponent} from './register/register.component';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {NgbAccordionModule, NgbDatepickerModule, NgbModalModule, NgbModule, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {ManagementHomeComponent} from './AdminComponents/management-home/management-home.component';
import {UserHomeComponent} from "./UserComponents/user-home/user-home.component";
import {UserTransactionComponent} from "./UserComponents/user-transaction/user-transaction.component";
import {NavbarComponent} from "./UserComponents/navbar/navbar.component";
import {ModalComponent} from "./UserComponents/modal/modal.component";
import {UserDetailsFormComponent} from "./UserComponents/user-details-form/user-details-form.component";
import {ChangePasswordComponent} from "./UserComponents/change-password/change-password.component";
import {UserFineComponent} from "./UserComponents/user-fine/user-fine.component";
import {authInterceptor} from "./UserComponents/interceptors/AuthInterceptor";
import {ProfileComponent} from "./UserComponents/profile/profile.component";
import {ManagementNav} from "./AdminComponents/management-nav/navbar.component";
import {ManagementFineComponent} from './AdminComponents/management-fine/management-fine.component';
import {
  ManagementTransactionComponent
} from "./AdminComponents/management-transaction/management-transaction.component";
import {ManagementProfileComponent} from './AdminComponents/management-profile/management-profile.component';
import {ManagementBookComponent} from './AdminComponents/management-book/management-book.component';
import {ManagementUserComponent} from './AdminComponents/management-user/management-user.component';
import {ModifyBookComponent} from './AdminComponents/modify-book/modify-book.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {
  ManagementAddExistingComponent
} from './AdminComponents/management-add-existing/management-add-existing.component';
import {ManagementFormModalComponent} from './AdminComponents/management-form-modal/management-form-modal.component';
import {
  ManagementEditDetailsComponent
} from './AdminComponents/management-edit-details/management-edit-details.component';
import {
  ManagementChangePasswordComponent
} from './AdminComponents/management-change-password/management-change-password.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminAccordionComponent} from './AdminComponents/admin-accordion/admin-accordion.component';
import {
  ManagementUserDetailsComponent
} from './AdminComponents/management-user-details/management-user-details.component';
import {AdminAccSetupComponent} from './AdminComponents/admin-acc-setup/admin-acc-setup.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {AdminAccDetailsComponent} from './AdminComponents/admin-acc-details/admin-acc-details.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {AdminSetupNewComponent} from './AdminComponents/admin-setup-new/admin-setup-new.component';
import {NoSpecialCharDirective} from "./directives/no-special-char.directive";
import {LoadingPageComponent} from './loading-page/loading-page.component';
import {QRCodeModule} from "angularx-qrcode";
import {MaxLengthDirective} from "./directives/max-length.directive";
import {NoAlphabetsDirective} from './directives/no-alphabets.directive';
import {OnlineStatusComponent} from './online-status/online-status.component';
import {canActivateUserView} from "./UserComponents/services/routingService";
import {AuthenticationService} from "./UserComponents/services/authentication.service";
import { AdminRefreshPageComponent } from './AdminComponents/admin-refresh-page/admin-refresh-page.component';
import { UserRefreshPageComponent } from './UserComponents/user-refresh-page/user-refresh-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    UserHomeComponent,
    ProfileComponent,
    UserTransactionComponent,
    NavbarComponent,
    ManagementNav,
    ModalComponent,
    UserDetailsFormComponent,
    ChangePasswordComponent,
    UserFineComponent,
    ManagementHomeComponent,
    ManagementTransactionComponent,
    ManagementFineComponent,
    ManagementProfileComponent,
    ManagementBookComponent,
    ManagementUserComponent,
    ModifyBookComponent,
    ManagementAddExistingComponent,
    ManagementFormModalComponent,
    ManagementEditDetailsComponent,
    ManagementChangePasswordComponent,
    AdminAccordionComponent,
    ManagementUserDetailsComponent,
    AdminAccSetupComponent,
    AdminAccDetailsComponent,
    AdminSetupNewComponent,
    NoSpecialCharDirective,
    LoadingPageComponent,
    MaxLengthDirective,
    NoAlphabetsDirective,
    OnlineStatusComponent,
    AdminRefreshPageComponent,
    UserRefreshPageComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgbModule,
    NgbToast,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    NgbAccordionModule,
    NgSelectModule,
    InfiniteScrollModule,
    NgbDatepickerModule,
    AccordionModule,
    QRCodeModule,
    NgbModalModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
