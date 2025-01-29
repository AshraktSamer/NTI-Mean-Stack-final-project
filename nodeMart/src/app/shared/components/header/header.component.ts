import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  loginService = inject(LoginService)


  constructor() { }
  ngOnInit(): void {}
    isLoggedIn = this.loginService.isLoggedIn()
    isUser = this.loginService.isUser()



}

