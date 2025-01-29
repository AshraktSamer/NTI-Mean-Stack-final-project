import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginService= inject(LoginService)
  if(loginService.isLoggedIn()){
    router.navigate(['/user/profile'])
  }
  return true;
};
