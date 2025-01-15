import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../enviroment/enviroment';
import { User } from '../models/userModel';



@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private currentUser!: User;

  constructor( private _http:HttpClient , private _router:Router) { 
    const token = localStorage.getItem('accessToken')
    if(token){
      this.tokenSubject.next(token)
    }
  }
  private tokenSubject:BehaviorSubject<string |null> = new BehaviorSubject<string | null> (null);

 APIURL =`${environment.apiBaseUrl}/users/login`


 login(loginData: any): Observable<any> {
  return this._http.post<any>(this.APIURL, loginData).pipe(
    tap({
      next: (res) => {
        this.currentUser = res.user;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); 
        const token =res?.data?.token
        if(token){
        localStorage.setItem('accessToken' , res?.data?.token?.token)
        this.tokenSubject.next(token);
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
  if (this.currentUser) {
    return this.currentUser.role;
  }
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    this.currentUser = JSON.parse(storedUser);
    return this.currentUser.role;
  }
  return '';
}



getAccessToken():Observable<string | null>{
  return this.tokenSubject.asObservable();
}


logout(){
  this.tokenSubject.next(null)
  localStorage.removeItem('accessToken')
  this._router.navigate(['/login']); 

}

isAuthunticated(): boolean{
  return this.tokenSubject.value !== null;
}

decodeAccessToken(): any {
  const token = this.tokenSubject.value;
  console.log('Token to Decode:', token); 
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded); 
      return decoded;
    } catch (error) {
      console.error('Decoding Error:', error);
      return null;
    }
  }
  return null;
}



get isUserLogin(): boolean {
  const loggedIn = this.tokenSubject.value !== null;
  console.log('Is User Logged In:', loggedIn); 
  return loggedIn;
}


}