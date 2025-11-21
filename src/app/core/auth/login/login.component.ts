import { Subscription } from 'rxjs';
import { FlowbiteService } from './../../services/flowbite.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  errMshg: string = '';

  subscription: Subscription = new Subscription();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.errMshg = '';
            setTimeout(() => {
              this.cookieService.set('token', response.token);
              console.log(this.authService.decodeToken());
              this.router.navigate(['/home']);
            }, 1000);
          }

          this.isLoading = false;
        },
        error: (error) => {
          this.errMshg = error.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
