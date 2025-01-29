import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { loginPayload, UserApiResponse } from '../models/userModel';
import { environment } from '../../../enviroment/enviroment';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  isLoggedIn = signal<boolean>(false)
  isAdmin = signal<boolean>(false)
  isUser = signal<boolean>(false)

  private API_URL = `${environment.apiBaseUrl}/users/login`;

  constructor(private _http: HttpClient, private router: Router) {
    if (this.getUserToken()) {
      this.isLoggedIn.update(() => true)
    }

    if (this.ifAdmin()) {
      this.isAdmin.update(() => true)
    }
    if (this.ifUser()) {
      this.isUser.update(() => true)
    }
  }

  login(payload: loginPayload) {
    return this._http.post<UserApiResponse<any>>(this.API_URL, payload).pipe(map((response) => {
      if (response.Status === 'success' && response.Token && response.Role) {
        localStorage.setItem("Token", response.Token);
        this.isLoggedIn.update(() => true)
        // console.log(this.isLoggedIn())

        localStorage.setItem('Role', response.Role)


        if (response.Role === 'Admin') {
          this.isAdmin.update(() => true)
          // console.log(this.isAdmin())
        }

        else if (response.Role === 'User') {
          this.isUser.update(() => true)
          // console.log(this.isUser())
        }

      }
      return response
    }))
  }


  logout() {
    localStorage.removeItem('Token')
    localStorage.removeItem('Role')
    this.isLoggedIn.update(() => false)
    this.router.navigate(['/login'])

  }

  getUserToken() {
    return localStorage.getItem('Token')
  }

  ifAdmin() {
    return localStorage.getItem("Role") === "Admin";
  }
  ifUser() {
    return localStorage.getItem("Role") === "User";
  }

}
