import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private service: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {}

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const resp = await this.service.authenticate(this.loginForm.value);
        this.router.navigate(['/']);
        this, this.alertService.presentToast('Welcome!');
      } catch (e) {
        console.error(e);
        this.alertService.presentToast('Invalid Credentials');
      }
    }
  }
}
