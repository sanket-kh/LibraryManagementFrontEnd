import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";


export const authInterceptor:HttpInterceptorFn =(
  req:HttpRequest<unknown>,
  next: HttpHandlerFn
)=>{
  let authService = inject(AuthenticationService);
  let accessToken = authService.getAuthToken() as string
  accessToken = "Bearer "+accessToken;
  const authReq = req.clone({
    setHeaders: {Authorization: accessToken}
  })

  console.log('appending header')
  console.log(authReq)
  return next(authReq)
}

