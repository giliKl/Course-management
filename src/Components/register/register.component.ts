import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { role, User } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router);
  registerForm!: FormGroup;
  user: User | undefined;
  role!: role;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['',  Validators.email],
      password: ['',Validators.required],
      name: ['',Validators.required ],
      role: ['',Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm?.valid) {
      this.user = this.registerForm.value;
      if (this.user) {
        this.authService.register(this.user).subscribe({
          next: (res) => {
            this.authService.saveToken(res.token);
            this.authService.isAuth = true;
            this.authService.role = res.role;
            this.authService.userId = res.userId;
            alert('Register successful!');
            this.router.navigate(['/']);
          },
          error: (err) => alert('Register failed: ' + err.error.message)
        });
        this.registerForm?.reset();
      }
    }
  }

}
