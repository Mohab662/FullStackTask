import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpasswordService } from './../../services/forgetpassword.service';
import { ValidationRules } from '../../shared/validation-rules';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  // Steps
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;

  // Forms
  forgetPassForm!: FormGroup;
  resetCodeForm!: FormGroup;
  resetPassForm!: FormGroup;


  email: string = '';
  userMes: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forgetService: ForgetpasswordService
  ) {}

  ngOnInit(): void {
    this.forgetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(ValidationRules.EmailRegex)]]
    });

    this.resetCodeForm = this.fb.group({
      resetCode: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.resetPassForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(ValidationRules.PasswordRegex)]]
    });
  }

  // 1- إرسال الكود
  forgetPassword(): void {
    if (this.forgetPassForm.invalid) return;

    this.loading = true;
    this.email = this.forgetPassForm.value.email;

    this.forgetService.forgetPassword({ email: this.email }).subscribe({
      next: (res) => {
        this.userMes = res.message || 'Code sent';
        this.step1 = false;
        this.step2 = true;
        this.loading = false;
      },
      error: (err) => {
        this.userMes = err.error.message || 'Something went wrong';
        this.loading = false;
      }
    });
  }

  // 2- التحقق من الكود
  resetCode(): void {
    if (this.resetCodeForm.invalid) return;

    this.loading = true;
    let resetData = {
      email: this.email,
      resetCode: this.resetCodeForm.value.resetCode
    };

    this.forgetService.resetCode(resetData).subscribe({
      next: (res) => {
        this.userMes = res.message || 'Code verified successfully';
        this.step2 = false;
        this.step3 = true;
        this.loading = false;
      },
      error: (err) => {
        this.userMes = err.error.message || 'Invalid code';
        this.loading = false;
      }
    });
  }

  // 3- تعيين باسورد جديد
  newPassword(): void {
    if (this.resetPassForm.invalid) return;

    this.loading = true;
    let newPassData = {
      email: this.email,
      newPassword: this.resetPassForm.value.newPassword
    };

    this.forgetService.newPassword(newPassData).subscribe({
      next: (res) => {
        this.userMes = res.message || 'Password reset successful';
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.userMes = err.error.message || 'Failed to reset password';
        this.loading = false;
      }
    });
  }
}
