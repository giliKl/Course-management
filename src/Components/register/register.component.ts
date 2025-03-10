import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { role, User } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatRadioModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() formClose = new EventEmitter<void>();
  registerForm!: FormGroup;
  user: User | undefined;
  role: role | null = null;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['',  [Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.minLength(3)]],
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
        this.formClose.emit();
      }
    }
  }

}
