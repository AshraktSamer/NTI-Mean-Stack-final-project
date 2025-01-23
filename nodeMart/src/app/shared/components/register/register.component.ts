import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  roles = ['user', 'admin'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: RegisterService // Inject the user service
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      address: ['', Validators.required],
      role: ['user', Validators.required], 
      terms: [false, Validators.requiredTrue]
    });

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('re_password')?.updateValueAndValidity();
    });
  }

  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get re_password() {
    return this.registerForm.get('re_password');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get terms() {
    return this.registerForm.get('terms');
  }
  get role() {
    return this.registerForm.get('role');
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe(
        (response) => {
          console.log('User created successfully', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error creating user', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
