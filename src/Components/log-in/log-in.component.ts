import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { partOfUser } from '../../Models/user';


@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  router = inject(Router);
  logInForm!: FormGroup;
  email: string = '';
  password: string = '';
  user:partOfUser={}

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit():void {
    this.logInForm = this.fb.group({
      email: ['',Validators.email],
      password: ['',Validators.required]
    });
  }
    
  onSubmit():void {
    if(this.logInForm?.valid)
    {
      this.user=this.logInForm.value;
      if(this.user)
      {
        this.authService.login(this.user).subscribe({
          next: (res) => {
            this.authService.saveToken(res.token);
            this.authService.isAuth=true;
            this.authService.role=res.role;
            this.authService.userId = res.id;
            alert('Login successful!');
            this.router.navigate(['/']);
          },
          error: (err) => alert('Login failed: ' + err.error.message)
        });
        this.logInForm?.reset();
      }
    }   
  }
}