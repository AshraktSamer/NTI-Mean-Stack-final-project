import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/userModel';
import { environment } from '../../../enviroment/enviroment';



@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private currentUser!: any;
  private tokenSubject: BehaviorSubject<string | null>;
  APIURL =`${environment.apiBaseUrl}/users/login`


  constructor( private _http:HttpClient , private _router:Router) { 
    const token = localStorage.getItem('accessToken')
    
      this.tokenSubject = new BehaviorSubject<string | null>(token);
      if(token){
        this.decodeAndSetCurrentUser(token);

    }
  }



  private decodeAndSetCurrentUser(token: string): void {
    const decoded: any = jwtDecode(token);
    this.currentUser = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.userRole,
    };
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }



 login(loginData: any): Observable<any> {
  return this._http.post<any>(this.APIURL, loginData).pipe(
    tap({
      next: (res) => {
        const token =res?.data?.token
        if(token){
          localStorage.setItem('accessToken', token);
          this.tokenSubject.next(token);
          this.decodeAndSetCurrentUser(token);
        }
        console.log('Full Response:', res); 
        console.log('Status:', res.Status); 
        console.log('Message:', res.msg); 
        console.log('Token:', res?.data?.token);
      },
      error: (err) => console.error('Login Error:', err)
    })
  );
}
getUserRole(): string {
  return this.currentUser?.role || '';
}

logout(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('currentUser');
  this.tokenSubject.next(null);
  this._router.navigate(['/login']);
}
isAuthenticated(): boolean {
  const token = this.tokenSubject.value;
  if (token) {
    const decoded: any = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now; // Check token expiration
  }
  return false;
}


// getUserRole(): string {
//   if (this.currentUser) {
//     return this.currentUser.role;
//   }
//   const storedUser = localStorage.getItem('currentUser');
//   if (storedUser) {
//     this.currentUser = JSON.parse(storedUser);
//     return this.currentUser.role;
//   }
//   return '';
// }




// getAccessToken():Observable<string | null>{
//   return this.tokenSubject.asObservable();
// }




// isAuthunticated(): boolean{
//   return this.tokenSubject.value !== null;
// }

// decodeAccessToken(): any {
//   const token = this.tokenSubject.value;
//   console.log('Token to Decode:', token); 
//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       console.log('Decoded Token:', decoded); 
//       return decoded;
//     } catch (error) {
//       console.error('Decoding Error:', error);
//       return null;
//     }
//   }
//   return null;
// }



// get isUserLogin(): boolean {
//   const loggedIn = this.tokenSubject.value !== null;
//   console.log('Is User Logged In:', loggedIn); 
//   return loggedIn;
// }


}