import { Component, inject } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  loginService = inject(LoginService)
  constructor(){}

  Logout(){
    this.loginService.logout()
  }


}
