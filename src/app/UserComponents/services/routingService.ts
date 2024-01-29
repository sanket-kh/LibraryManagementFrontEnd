import {AuthenticationService} from "./authentication.service";
import {inject} from "@angular/core";
import {CanActivateFn, ResolveFn, Router} from "@angular/router";
import {UserService} from "./userService";
import {ManageBookService} from "../../AdminComponents/services/ManageBookService";
import {AdminAccService} from "../../AdminComponents/services/AdminAccService";
import {BookService} from "./book.service";
import {DefaultResponse} from "../UserModals/responses/DefaultResponse";
import {ManageUserService} from "../../AdminComponents/services/ManageUserService";
import {ManageFineService} from "../../AdminComponents/services/ManageFineService";
import {catchError, map, of} from "rxjs";
import {FineService} from "./FineService";

export const canActivateUserView =async  () => {
  let authService: AuthenticationService = inject(AuthenticationService);
  let router: Router = inject(Router)
  if ( authService.isAuthenticated() && authService.isUser()) {
    return true
  } else {
    router.navigate(['user','refresh']).then()
    return false;
  }
}
 export  const canActivateAdminView =  ()=> {
  let authService: AuthenticationService = inject(AuthenticationService)
   let router: Router = inject(Router)
   return authService.canActivateAdmin().subscribe((auth)=>{
     if(auth ){
       return of(true)
     }else {
       router.navigate(['admin', 'refresh'])
       return of(false)
     }
   })
}

export const canActivateEditUserDetailsUser =async () => {
  let authService: AuthenticationService = inject(AuthenticationService);
  let router: Router = inject(Router)
  let userService = inject(UserService)
  if (!userService.userDetailsEmpty && authService.isUser()) {
    return true
  } else {
    router.navigate(['user', 'profile']).then()
    return false;

  }
}
export const canActivateEditAdminDetailsUser =async () => {
  let authService: AuthenticationService = inject(AuthenticationService);
  let router: Router = inject(Router)
  let userService = inject(UserService)
  if (!userService.userDetailsEmpty && await authService.isAdmin()) {
    return true
  } else {
    router.navigate(['admin', 'profile']).then()
    return false;

  }
}
export const canActivateEditBookDetails =async () => {
  let router: Router = inject(Router)
  let bookService: ManageBookService = inject(ManageBookService)
  if (bookService.bookDto) {
    return true
  } else {
    router.navigate(['admin', 'manage-books']).then()
    return false
  }
}
export const canActivateEditAccDetails =async () => {
  let authService: AuthenticationService = inject(AuthenticationService);
  let router: Router = inject(Router)
  let adminAccService = inject(AdminAccService)
  if (adminAccService.adminAccDetails && authService.isAuthenticated()) {
    return true
  } else {
    router.navigate(['admin', 'acc-details']).then()
    return false
  }
}
export const userTransactionResolver: ResolveFn<DefaultResponse> = (route, state) => {
  let userService: UserService = inject(UserService)
  return inject(BookService).getAllUserTransaction(userService.getUsername())
}
export const userBookListResolver: ResolveFn<DefaultResponse> = (route, state) => {
  return inject(BookService).getAllBooks(0)
}
export const userFineListResolver: ResolveFn<DefaultResponse> = (route, state) => {
  return inject(FineService).getUserFined().pipe(catchError((err)=>{
    return of(err.error.responseBody)
  }))
}
export const adminTransactionResolver: ResolveFn<DefaultResponse> = (route, state) => {
  return inject(ManageBookService).getAllTransactions()
}
export const adminManageBooks: ResolveFn<DefaultResponse> = (route, state) => {
  return inject(ManageBookService).getAllBooksLibrarian(0)
}
export const adminManageUser: ResolveFn<DefaultResponse> = (route, state) => {
  return inject(ManageUserService).getAllUsers()
}

export const adminManageFine: ResolveFn<DefaultResponse> = (route, state) => {
  return inject(ManageFineService).getAllFineTransaction()
}

export const adminAccount: ResolveFn<DefaultResponse> = (route, state) => {
 return  inject(AdminAccService).getAccDetails().pipe(
   catchError(err => {
     return of(err.error.responseBody)
   } )
 )
 }

export const adminProfile: ResolveFn<DefaultResponse> = (route, state) => {
  return inject(UserService).getUserDetails()
}

// export const canDeactivateBookForm: CanDeactivateFn<ModifyBookComponent> = (component, currentRoute, currentState, nextState) => {
//   return component.canExit()
// }
