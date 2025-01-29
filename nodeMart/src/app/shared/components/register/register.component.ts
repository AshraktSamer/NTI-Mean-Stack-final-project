import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerService = inject(RegisterService)

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      re_password: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]),
      email: new FormControl('', [Validators.required , Validators.email]) ,
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      adress: new FormControl('', [Validators.required]),
    });

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('re_password')?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    
  }

  onSumbit(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      this.registerService.Register(this.registerForm.value).subscribe({
        next: (response)=>{
          this.router.navigate(['/login'])
          console.log(response)
        }
      })  }
  
  }

}
