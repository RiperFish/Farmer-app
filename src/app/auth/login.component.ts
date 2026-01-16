import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-header">
        <div class="logo">🌾</div>
        <h1 class="login-title">Belize Farmer Portal</h1>
        <p class="login-subtitle">Login to access your farmer account</p>
      </div>

      <div class="login-card card">
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label class="form-label">Email or Phone</label>
            <input
              type="text"
              class="form-control"
              [(ngModel)]="credentials.email"
              name="email"
              placeholder="Enter your email or phone"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              [(ngModel)]="credentials.password"
              name="password"
              placeholder="Enter your password"
              required
            >
          </div>

          <div class="form-help">
            <a href="#" class="help-link">Forgot password?</a>
          </div>

          <button type="submit" class="login-btn" [disabled]="!loginForm.valid">
            Login
          </button>
        </form>

        <div class="demo-info">
          <div class="demo-title">Demo Credentials</div>
          <div class="demo-note">Use any email and password to login</div>
          <div class="demo-accounts">
            <div class="demo-account">
              <strong>Verified Farmer:</strong> john@example.com
            </div>
            <div class="demo-account">
              <strong>Pending Verification:</strong> maria@example.com
            </div>
          </div>
        </div>
      </div>

      <div class="login-footer">
        <div class="footer-text">Don't have an account?</div>
        <a routerLink="/register" class="register-link">Register as a Farmer</a>
      </div>

      <div class="public-access">
        <a routerLink="/" class="public-link">← Browse as Public User</a>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .logo {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .login-title {
      font-size: 28px;
      font-weight: 700;
      color: #2e7d32;
      margin: 0 0 8px 0;
    }

    .login-subtitle {
      font-size: 15px;
      color: #666;
      margin: 0;
    }

    .login-card {
      max-width: 440px;
      margin: 0 auto;
      padding: 32px 24px;
      width: 100%;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .form-control {
      width: 100%;
      padding: 14px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 15px;
      transition: border-color 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #2e7d32;
    }

    .form-help {
      text-align: right;
      margin-bottom: 24px;
    }

    .help-link {
      font-size: 13px;
      color: #2e7d32;
      text-decoration: none;
      font-weight: 600;
    }

    .login-btn {
      width: 100%;
      padding: 16px;
      background: #2e7d32;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .login-btn:hover:not(:disabled) {
      background: #1b5e20;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(46,125,50,0.3);
    }

    .login-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .demo-info {
      margin-top: 24px;
      padding: 16px;
      background: #fff3e0;
      border-radius: 8px;
      border: 1px solid #ffb74d;
    }

    .demo-title {
      font-size: 13px;
      font-weight: 700;
      color: #f57c00;
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    .demo-note {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
    }

    .demo-accounts {
      display: grid;
      gap: 8px;
    }

    .demo-account {
      font-size: 13px;
      color: #666;
      padding: 8px;
      background: white;
      border-radius: 4px;
    }

    .demo-account strong {
      color: #333;
    }

    .login-footer {
      text-align: center;
      margin-top: 24px;
    }

    .footer-text {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }

    .register-link {
      font-size: 16px;
      font-weight: 600;
      color: #2e7d32;
      text-decoration: none;
    }

    .public-access {
      text-align: center;
      margin-top: 24px;
    }

    .public-link {
      font-size: 14px;
      color: #666;
      text-decoration: none;
    }

    @media (min-width: 768px) {
      .login-card {
        padding: 40px;
      }
    }
  `]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.login(this.credentials.email, this.credentials.password)) {
      this.router.navigate(['/dashboard']);
    }
  }
}
