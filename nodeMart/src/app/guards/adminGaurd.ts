import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserAuthService } from '../services/userAuthService';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private authService : UserAuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole(); // Retrieve the user role from the auth service or JWT token

    if (userRole === 'admin') {
      return true;
    } else {
      this.router.navigate(['/not-authorized']);
      return false;
    }
  }
}
