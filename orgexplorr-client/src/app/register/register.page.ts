import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  confirmPasswords: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    return password === confirmPassword ? null : { confirmPasswords: true };
  };

  registrationForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
    },
    { validators: [this.confirmPasswords] }
  );

  async onSubmit() {
    if (this.registrationForm.valid) {
      const { email, password, fullName } = this.registrationForm.value;
      await this.authService.register({ email, password, fullName });
    }
  }

  checkErrors() {
    if (this.registrationForm.errors) {
      return true;
    }
  }
}
