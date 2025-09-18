import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ValidationRules } from '../../shared/validation-rules';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errMsg: string = "";
  isLoading: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {
    this.registerForm = this._FormBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(ValidationRules.UserNameRegex)]],
      email: ['', [Validators.required, Validators.pattern(ValidationRules.EmailRegex)]],
      password: ['', [Validators.required, Validators.pattern(ValidationRules.PasswordRegex)]],
      rePassword: ['']
    }, { validators: this.confirmPassword } as FormControlOptions);
  }


  confirmPassword(group: FormGroup) {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (!rePassword?.value) {
      rePassword?.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    } else {
      rePassword?.setErrors(null);
    }
  }


  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${this.toLabel(field)} is required.`;
    if (control.errors['pattern']) {
      switch (field) {
        case 'userName': return 'User name must start with a letter and be 4-20 characters (letters, numbers, underscore).';
        case 'email': return 'Enter a valid email.';
        case 'password': return 'Password must be 5-20 characters (letters, numbers, underscore).';
        default: return 'Invalid input.';
      }
    }
    if (control.errors['mismatch']) return 'Passwords do not match.';
    return '';
  }

  private toLabel(field: string) {
    return field.charAt(0).toUpperCase() + field.slice(1);
  }

  handleForm(): void {
    if (!this.registerForm.valid) {
      this.errMsg = "Please fill in all required fields correctly.";
      return;
    }

    const { userName, email, password } = this.registerForm.value;
    const userData = { userName, email, password };

    this.isLoading = true;
    this.errMsg = "";

    this._AuthService.Register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response?.message) {
          this._Router.navigate(['/login']);
        } else {
          this.errMsg = 'Registration failed.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        const backendMsg = err?.error?.message || err?.message;
        this.errMsg = backendMsg ? `Registration failed: ${backendMsg}` : 'Registration failed. Please check your inputs and try again.';
      }
    });
  }
}
