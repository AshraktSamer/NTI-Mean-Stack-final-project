import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  imports: [ CommonModule , ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginService = inject(LoginService)
  form : FormGroup;


  constructor( private router : Router , private fb : FormBuilder){
    this.form= this.fb.group(
      {
        email : new FormControl('' , [Validators.required , Validators.email]),
        password : new FormControl('' , [Validators.required])
  
      }
    )


  }
  ngOnInit(): void {
  }
  
  
    onSumbit(){
      if(this.form.valid){
        console.log(this.form.value)
        this.loginService.login(this.form.value).subscribe({
          next: (response)=>{
            if(response.Role=='Admin'){
              this.router.navigate(['/admin'])
            }
            if(response.Role=='User'){
              this.router.navigate(['/user'])
            }
            console.log(response)
          }
        })  }
    
    }

}
