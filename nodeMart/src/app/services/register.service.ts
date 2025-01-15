import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


    private API_URL = `${environment.apiBaseUrl}/users/register`; 

    constructor(private http: HttpClient) {}
  
    registerUser(userData: User): Observable<UserResponse> {
      return this.http.post<UserResponse>(this.API_URL, userData);
    }
  }

