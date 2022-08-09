import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { environment } from 'src/environments/environment';
import { RegistrationRequest } from '../models/RegistrationRequest';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userBehaviorSubject = new BehaviorSubject<LoginResponse>(null);

  constructor(private http: HttpClient, private storage: Storage) {}

  async init() {
    try {
      await this.storage.create();
      const user = await this.storage.get('user');
      this.userBehaviorSubject.next(user);
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async authenticate(form: LoginRequest) {
    try {
      const { email, password } = form;
      const response = await this.http
        .post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
          email,
          password,
        })
        .toPromise();
      const user = response;
      this.userBehaviorSubject.next(user);
      await this.storage.set('user', user);
      return user;
    } catch (e) {
      // TODO: better error handling
      console.error(e);
      throw e;
    }
  }

  async register(form: RegistrationRequest) {
    try {
      const { email, fullName, password } = form;
      const response = await this.http
        .post(`${environment.apiUrl}/auth/register`, {
          email,
          fullName,
          password,
        })
        .toPromise();
    } catch (e) {
      // TODO: better error handling
      console.error(e);
      throw e;
    }
  }

  async getUserToken() {
    if (this.userBehaviorSubject.value) {
      return this.userBehaviorSubject.value.accessToken;
    }
    return null;
  }

  async isAuthenticated() {
    return this.userBehaviorSubject.value !== null;
  }

  async logout() {
    await this.storage.set('user', null);
    this.userBehaviorSubject.next(null);
  }

  getToken() {
    if (this.userBehaviorSubject.value) {
      return this.userBehaviorSubject.value.accessToken;
    } else {
      return null;
    }
  }
}
