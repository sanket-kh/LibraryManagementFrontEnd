import {NgModule} from '@angular/core';
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
import {UserHomeComponent} from './user-home/user-home.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {authInterceptor} from "./interceptors/AuthInterceptor";
import {ProfileComponent} from './profile/profile.component';
import {UserTransactionComponent} from './user-transaction/user-transaction.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ModalComponent} from './modal/modal.component';
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

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
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgbToast
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch())

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
