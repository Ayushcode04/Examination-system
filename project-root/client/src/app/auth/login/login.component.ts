import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username_or_email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.routeToDashboard(this.authService.user()?.role);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post(environment.baseURL + 'accounts/login/', loginData).subscribe({
        next: (response: any) => {
          const user = response.user;
          this.authService.user.set(user);
          this.routeToDashboard(user.role);
        },
        error: (err: any) => {
          this.errorMessage = err.error.error;
        }
      });
    }
  }

  routeToDashboard(role = '') {
    if (role === 'super_admin') {
      this.router.navigate(['/super-admin']);
    } else if (role === 'college_admin') {
      this.router.navigate(['/college-admin']);
    } else if (role === 'student') {
      this.router.navigate(['/student']);
    }
  }
}