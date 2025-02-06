import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { registerPayload, UserApiResponse } from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private API_URL = `${environment.apiBaseUrl}/users/register`;

  constructor(private _http: HttpClient) { }

  Register(payload: registerPayload) {
    return this._http.post<UserApiResponse<any>>(this.API_URL, payload)
  }

}

