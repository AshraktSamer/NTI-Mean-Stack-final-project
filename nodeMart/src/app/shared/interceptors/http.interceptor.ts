import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loginServive = inject(LoginService)
  const router = inject(Router)

  if(loginServive.isLoggedIn()){
  req = req.clone(
    { setHeaders:{
    Authorization : `Bearer ${loginServive.getUserToken()}`}}
  )}
  return next(req).pipe(
    retry(2),
    catchError((e: HttpErrorResponse )=>{
      if(e.status=== 401){
        localStorage.removeItem('Token')
        router.navigate(['/login'])
      }
      const error = e.error.message || e.statusText
      return throwError(()=> error)
    })
  );
};
