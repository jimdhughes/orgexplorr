import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated.next(value);
  }

  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.router.initialNavigation();
    this.authService.userBehaviorSubject.subscribe((next) => {
      console.log(next);
      console.log(this.isAuthenticated);
      if (next) {
        console.log('setting true');
        this.isAuthenticated = true;
      } else {
        console.log('setting false');
        this.isAuthenticated = false;
      }
    });
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
