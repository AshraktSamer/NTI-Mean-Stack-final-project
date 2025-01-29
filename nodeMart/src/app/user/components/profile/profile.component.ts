import { Component, inject } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  LoginService = inject(LoginService)
  constructor() { }

  Logout() {
    this.LoginService.logout()
  }

}
