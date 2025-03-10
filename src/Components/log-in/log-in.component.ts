import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { partOfUser } from '../../Models/user';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterLink,MatInputModule,MatCardModule
    ,MatFormFieldModule,MatButtonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  router = inject(Router);
  logInForm!: FormGroup;
  email: string = '';
  password: string = '';
  user:partOfUser={};
  @Output() formClose = new EventEmitter<void>();
  @Input() showForm = false;

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
            this.authService.userId = res.userId;
            alert('Login successful!');
            this.router.navigate(['/']);
          },
          error: (err) => alert('Login failed: ' + err.error.message)
        });
        this.logInForm?.reset();
        this.formClose.emit();
      }
    }   
  }
}