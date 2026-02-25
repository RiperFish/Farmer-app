import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav" *ngIf="!isAuthPage()">
      <!-- Public Navigation -->
      <div class="nav-items" *ngIf="!currentUser()">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <img src="assets/img/home.svg" alt="Logo" style="width:28px"/>
           <span class="nav-label">Home</span>
        </a>
        <a routerLink="/weather" routerLinkActive="active" class="nav-item">
         <img src="assets/img/weather.svg" alt="Logo" style="width:28px"/>
         <span class="nav-label">Weather</span>
        </a>
        <a routerLink="/ongoing-projects" routerLinkActive="active" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:28px">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="nav-label">Projects</span>
        </a>
        <a routerLink="/resources" routerLinkActive="active" class="nav-item">
          <img src="assets/img/phone.svg" alt="Logo" style="width:28px"/>
           <span class="nav-label">Contact</span>
        </a>
        <a routerLink="/login" routerLinkActive="active" class="nav-item">
          <img src="assets/img/user-black.svg" alt="Login" style="width:28px"/>
          <span class="nav-label">Login</span>
        </a>
      </div>

      <!-- Verified Farmer Navigation -->
      <div class="nav-items" *ngIf="currentUser() && isVerified()">
        <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <img src="assets/img/home.svg" alt="Home" style="width:28px"/>
          <span class="nav-label">Home</span>
        </a>
        <a routerLink="/farmer-id" routerLinkActive="active" class="nav-item">
          <img src="assets/img/id.svg" alt="ID" style="width:28px"/>
          <span class="nav-label">ID</span>
        </a>
        <a routerLink="/farm-records" routerLinkActive="active" class="nav-item">
          <img src="assets/img/chart.svg" alt="Farm" style="width:28px"/>
          <span class="nav-label">Records</span>
        </a>
        <a routerLink="/commodities" routerLinkActive="active" class="nav-item">
          <img src="assets/img/commodities.svg" alt="Commodities" style="width:25px"/>
          <span class="nav-label">Commodities</span>
        </a>
        <a routerLink="/profile" routerLinkActive="active" class="nav-item">
          <img src="assets/img/user-black.svg" alt="Profile" style="width:28px"/>
          <span class="nav-label">Profile</span>
        </a>
      </div>

      <!-- Unverified/Pending Farmer Navigation -->
      <div class="nav-items" *ngIf="currentUser() && !isVerified()">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <img src="assets/img/home.svg" alt="Home" style="width:28px"/>
          <span class="nav-label">Home</span>
        </a>
        <a routerLink="/profile" routerLinkActive="active" class="nav-item">
          <img src="assets/img/user-black.svg" alt="Profile" style="width:28px"/>
          <span class="nav-label">Profile</span>
        </a>
        <a routerLink="/ongoing-projects" routerLinkActive="active" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:28px">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="nav-label">Projects</span>
        </a>
        <a routerLink="/resources" routerLinkActive="active" class="nav-item">
         <img src="assets/img/phone.svg" alt="Logo" style="width:28px"/>
           <span class="nav-label">Contact</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #e0e0e0;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
      z-index: 900;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }

    .nav-items {
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      max-width: 100%;
      margin: 0 auto;
    }

    .nav-item {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap:4px;
      padding: 8px 4px;
      min-height: 56px;
      text-decoration: none;
      color: #666;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
    }

    .nav-item:active {
      background: #f5f5f5;
    }

    .nav-icon {
      font-size: 22px;
      margin-bottom: 2px;
      display: block;
      transition: transform 0.2s;
    }

    .nav-label {
      font-size: 10px;
      font-weight: 500;
      text-align: center;
      line-height: 1.1;
    }

    .nav-item.active {
      color: #2e7d32;
    }

    .nav-item.active .nav-icon {
      transform: scale(1.1);
    }

    .nav-badge {
      position: absolute;
      top: 6px;
      right: 50%;
      transform: translateX(12px);
      background: #f44336;
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
      line-height: 1.2;
    }

    @media (min-width: 768px) {
      .bottom-nav {
        display: none;
      }
    }

    @media (max-width: 374px) {
      .nav-label {
        font-size: 10px;
      }

      .nav-icon {
        font-size: 20px;
      }

      .nav-item {
        min-height: 52px;
        padding: 6px 2px;
      }
    }
  `]
})
export class BottomNavComponent {
  currentUser = this.authService.currentUser;
  unreadCount = computed(() => 2);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isAuthPage(): boolean {
    const path = this.router.url;
    return path === '/login' || path === '/register';
  }

  isVerified(): boolean {
    return this.authService.isVerified();
  }
}
