import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ValidationRules } from '../../shared/validation-rules';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errMsg: string = "";
  isLoading: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {
 
    this.loginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.pattern(ValidationRules.EmailRegex)]],
      password: ['', [Validators.required, Validators.pattern(ValidationRules.PasswordRegex)]]
    });
  }


  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${this.toLabel(field)} is required.`;
    if (control.errors['pattern']) {
      switch (field) {
        case 'email': return 'Enter a valid email.';
        case 'password': return 'Password must be 5-20 characters (letters, numbers, underscore).';
        default: return 'Invalid input.';
      }
    }
    return '';
  }


  private toLabel(field: string) {
    return field.charAt(0).toUpperCase() + field.slice(1);
  }

  handleForm(): void {
    if (!this.loginForm.valid) {
      this.errMsg = "Please fill in all required fields correctly.";
      return;
    }

    const userData = this.loginForm.value;
    this.isLoading = true;
    this.errMsg = "";

    this._AuthService.Login(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response?.data?.accessToken) {
          localStorage.setItem('etoken', response.data.accessToken);
          this._AuthService.decodeUser();
          this._Router.navigate(['/home']);
        } else {
          this.errMsg = response?.message || "Login failed. Please try again.";
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 400) {
          this.errMsg = err.error?.message || "Invalid email or password.";
        } else if (err.status === 401) {
          this.errMsg = "Unauthorized. Please check your credentials.";
        } else if (err.status === 0) {
          this.errMsg = "Cannot connect to the server. Please try again later.";
        } else {
          this.errMsg = err.error?.message || "An unexpected error occurred.";
        }
      }
    });
  }
}
