import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/registered-users']);
    }
  }

  onSubmit(): void {
    this.error = '';
    this.username = 'cms-admin-new-got-talent';
    this.password = 'CmsGotTalent2026@AdmiNnew';
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/registered-users']);
    } else {
      this.error = 'Invalid username or password.';
    }
  }
}
