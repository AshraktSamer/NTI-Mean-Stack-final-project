import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/userAuthService';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';


@Component({
  selector: 'app-login',
  imports: [ CommonModule , RouterLink , RouterLinkActive , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor( private authen:UserAuthService , private router : Router){}
  ngOnInit(): void {
  }
  
  login(loginform:NgForm){
    this.authen.login(loginform.value).subscribe({
      
      next: ()=>  {this.router.navigate([`/product/add`])

      },

      error: (err) => console.error('Login failed:', err)

      
    })
    console.log(loginform.value)

}

}
