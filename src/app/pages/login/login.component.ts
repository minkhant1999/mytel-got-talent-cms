import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CmsServiceService } from 'src/app/services/cms-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error = '';
  form!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cmsService: CmsServiceService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/registered-users']);
    }

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.error = '';

    const loginV = this.form.getRawValue(); // ✅ safer than value
    console.log(loginV, 'log from form');

    this.cmsService.login_service(loginV).subscribe({
      next: (data: any) => {
        console.log(data, 'data from api');

        this.authService.saveTokens(data.result?.token);

        this.router.navigate(['/registered-users']);
      },
      error: () => {
        this.error = 'Invalid username or password';
      },
    });
  }
}
