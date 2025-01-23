import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/userAuthService';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const auth = inject(UserAuthService);
  const router = inject(Router);
  return new Observable<boolean>((observer) => {
    auth.getAccessToken().subscribe(token => {
      if (token) {
        observer.next(true);
      } else {
        alert('You must login first...');
        router.navigate(['/login']);
        observer.next(false);
      }
    });
  });
};