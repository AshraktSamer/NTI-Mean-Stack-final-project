import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService)
  const router = inject(Router)

  if(!loginService.isAdmin()){
    router.navigate(['/notAuthorized'])
  }
  return true;
};
