import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-header">
        <img src="assets/img/baimsfarmerhub-logo.png" alt="Logo"  style="width:100px;"/>
        <h1 class="register-title">Register as a Farmer</h1>
        <p class="register-subtitle">Join the National Farmer Registry</p>
      </div>

      <div class="register-card card">
        <div class="progress-steps" style="display:none;">
          <div class="step" [class.active]="true">
            <div class="step-number">1</div>
            <div class="step-label">Personal Info</div>
          </div>
          <div class="step-line"></div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-label">Verification</div>
          </div>
          <div class="step-line"></div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-label">Complete</div>
          </div>
        </div>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              [(ngModel)]="formData.name"
              name="name"
              placeholder="Enter your full name"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input
              type="email"
              class="form-control"
              [(ngModel)]="formData.email"
              name="email"
              placeholder="your@email.com"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input
              type="tel"
              class="form-control"
              [(ngModel)]="formData.phone"
              name="phone"
              placeholder="501-xxx-xxxx"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label">District</label>
            <select
              class="form-control"
              [(ngModel)]="formData.district"
              name="district"
              required
            >
              <option value="">Select your district</option>
              <option value="Belize">Belize</option>
              <option value="Cayo">Cayo</option>
              <option value="Corozal">Corozal</option>
              <option value="Orange Walk">Orange Walk</option>
              <option value="Stann Creek">Stann Creek</option>
              <option value="Toledo">Toledo</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Village/Town</label>
            <input
              type="text"
              class="form-control"
              [(ngModel)]="formData.village"
              name="village"
              placeholder="Enter your village or town"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              [(ngModel)]="formData.password"
              name="password"
              placeholder="Create a password"
              required
            >
          </div>

          <div class="form-checkbox">
            <input
              type="checkbox"
              id="terms"
              [(ngModel)]="agreeToTerms"
              name="terms"
              required
            >
            <label for="terms" class="checkbox-label">
              I agree to the terms and conditions and authorize the Ministry of Agriculture to process my information
            </label>
          </div>

          <button type="submit" class="register-btn" [disabled]="!registerForm.valid || !agreeToTerms">
            Register Now
          </button>
        </form>

        <div class="info-box">
          <div class="info-icon">ℹ️</div>
          <div class="info-content">
            <strong>Next Steps:</strong> After registration, an extension officer will verify your information.
            You'll receive a notification once verified and can access your full farmer profile.
          </div>
        </div>
      </div>

      <div class="register-footer">
        <div class="footer-text">Already have an account?</div>
        <a routerLink="/login" class="login-link">Login Here</a>
      </div>

      <div class="public-access">
        <a routerLink="/" class="public-link">← Back to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    }

    .register-header {
      text-align: center;
      margin-bottom: 32px;
      padding-top: 20px;
    }

    .logo {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .register-title {
      font-size: 28px;
      font-weight: 700;
      color: #2e7d32;
      margin: 0 0 8px 0;
    }

    .register-subtitle {
      font-size: 15px;
      color: #666;
      margin: 0;
    }

    .register-card {
      max-width: 540px;
      margin: 0 auto;
      padding: 32px 24px;
      width: 100%;
    }

    .progress-steps {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .step-number {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #e0e0e0;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }

    .step.active .step-number {
      background: #2e7d32;
      color: white;
    }

    .step-label {
      font-size: 11px;
      color: #999;
      font-weight: 600;
    }

    .step.active .step-label {
      color: #2e7d32;
    }

    .step-line {
      width: 40px;
      height: 2px;
      background: #e0e0e0;
      margin: 0 8px;
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

    .form-checkbox {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 24px;
    }

    .form-checkbox input[type="checkbox"] {
      margin-top: 4px;
      width: 18px;
      height: 18px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .checkbox-label {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
      cursor: pointer;
    }

    .register-btn {
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

    .register-btn:hover:not(:disabled) {
      background: #1b5e20;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(46,125,50,0.3);
    }

    .register-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .info-box {
      margin-top: 24px;
      padding: 16px;
      background: #e3f2fd;
      border-radius: 8px;
      border: 1px solid #90caf9;
      display: flex;
      gap: 12px;
    }

    .info-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .info-content {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }

    .info-content strong {
      color: #1976d2;
    }

    .register-footer {
      text-align: center;
      margin-top: 24px;
    }

    .footer-text {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }

    .login-link {
      font-size: 16px;
      font-weight: 600;
      color: #2e7d32;
      text-decoration: none;
    }

    .public-access {
      text-align: center;
      margin-top: 24px;
      padding-bottom: 40px;
    }

    .public-link {
      font-size: 14px;
      color: #666;
      text-decoration: none;
    }

    @media (min-width: 768px) {
      .register-card {
        padding: 40px;
      }
    }
    @media (max-width: 480px) {
      .progress-steps {
        justify-content: space-between;
      }
      .step-line {
        display: none;
      }
    }
  `]
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    district: '',
    village: '',
    password: ''
  };
  agreeToTerms = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.agreeToTerms) {
      this.authService.register(this.formData);
      alert('Registration successful! Please login with your credentials. An extension officer will verify your account.');
      this.router.navigate(['/login']);
    }
  }
}
