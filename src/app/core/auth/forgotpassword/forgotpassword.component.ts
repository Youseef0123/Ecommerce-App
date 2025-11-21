import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  newPassword!: FormGroup;
  step: number = 1;
  userEmail: string = '';
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });

    this.newPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  onSubmitEmail() {
    if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (response) => {
          this.userEmail = this.verifyEmail.value.email;
          this.step = 2;
        },
      });
    }
  }

  onSubmitCode() {
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (response) => {
          this.step = 3;
        },
      });
    }
  }

  onSubmitNewPassword() {
    if (this.newPassword.valid) {
      this.newPassword.patchValue({
        email: this.userEmail,
      });
      this.authService.submitNewPassword(this.newPassword.value).subscribe({
        next: (response) => {
          console.log(response);
          this.cookieService.set('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
