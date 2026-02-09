import { Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <button class="menu-btn" (click)="toggleMenu()" *ngIf="currentUser()">
            <span class="menu-icon">☰</span>
          </button>
          <div class="logo-container" [routerLink]="currentUser() ? ['/dashboard'] : ['/']">
            <div class="logo">
              <img src="assets/img/baimsfarmerhub-logo-white.png" alt="Logo" style="width:60px;" />
              <!-- <span class="logo-icon">🌾</span>
               <div class="logo-text">
                <span class="logo-main">BAIMS</span>
                <span class="logo-sub">Farmer Hub</span>
              </div> -->
            </div>
          </div>
        </div>
        <div class="header-right" *ngIf="currentUser()">
          <button class="notification-btn">
            <span class="bell-icon">🔔</span>
            <span class="notification-badge" *ngIf="unreadCount() > 0">{{ unreadCount() }}</span>
          </button>
          <button class="logout-btn" (click)="logout()">Logout</button>
        </div>
        <div class="header-right" *ngIf="!currentUser()">
          <button class="login-btn" routerLink="/login">Login</button>
        </div>
      </div>
    </header>

    <nav class="mobile-nav" [class.open]="menuOpen" *ngIf="currentUser()">
      <div class="nav-header">
        <div class="user-info">
          <div class="user-avatar">{{ userInitials() }}</div>
          <div class="user-details">
            <div class="user-name">{{ currentUser()?.name }}</div>
            <div class="user-status" [class]="'status-' + currentUser()?.status">
              {{ currentUser()?.status }}
            </div>
          </div>
        </div>
        <button class="close-btn" (click)="toggleMenu()">✕</button>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/dashboard" (click)="closeMenu()">🏠 Dashboard</a></li>
        <li><a routerLink="/profile" (click)="closeMenu()">👤 My Profile</a></li>
        <li *ngIf="currentUser()?.status === 'verified'"><a routerLink="/farmer-id" (click)="closeMenu()">🪪 Farmer ID</a></li>
        <li *ngIf="currentUser()?.status === 'verified'"><a routerLink="/farm-records" (click)="closeMenu()">📊 Farm Records</a></li>
        <li><a routerLink="/notifications" (click)="closeMenu()">🔔 Notifications</a></li>
        <li class="nav-divider"></li>
        <li><a routerLink="/calendar" (click)="closeMenu()">📅 Planting Calendar</a></li>
        <li><a routerLink="/weather" (click)="closeMenu()">🌤️ Weather</a></li>
        <li><a routerLink="/resources" (click)="closeMenu()">📚 Resources</a></li>
      </ul>
    </nav>

    <div class="nav-overlay" [class.open]="menuOpen" (click)="closeMenu()"></div>
  `,
  styles: [`
    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 1000;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .menu-btn {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .menu-btn:hover {
      background: rgba(255,255,255,0.1);
    }

    .menu-icon {
      display: block;
      width: 24px;
      height: 24px;
      line-height: 24px;
    }

    .logo-container {
      cursor: pointer;
      user-select: none;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      font-size: 32px;
      line-height: 1;
      animation: sway 3s ease-in-out infinite;
    }

    @keyframes sway {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .logo-main {
      font-size: 24px;
      font-weight: 900;
      color: white;
      letter-spacing: 1px;
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .logo-sub {
      font-size: 11px;
      font-weight: 600;
      color: rgba(255,255,255,0.95);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .notification-btn {
      position: relative;
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .notification-btn:hover {
      background: rgba(255,255,255,0.1);
    }

    .notification-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background: #f44336;
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 10px;
      min-width: 16px;
      text-align: center;
    }

    .logout-btn, .login-btn {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .logout-btn:hover, .login-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: translateY(-1px);
    }

    .mobile-nav {
      position: fixed;
      top: 0;
      left: -300px;
      width: 280px;
      height: 100vh;
      background: white;
      box-shadow: 2px 0 8px rgba(0,0,0,0.15);
      z-index: 1100;
      transition: left 0.3s ease;
      overflow-y: auto;
    }

    .mobile-nav.open {
      left: 0;
    }

    .nav-header {
      background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
      padding: 20px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .user-info {
      display: flex;
      gap: 12px;
      flex: 1;
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
    }

    .user-details {
      flex: 1;
    }

    .user-name {
      font-size: 16px;
      font-weight: 600;
      color: white;
      margin-bottom: 4px;
    }

    .user-status {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-verified {
      background: #4caf50;
      color: white;
    }

    .status-pending {
      background: #ff9800;
      color: white;
    }

    .status-unverified {
      background: #9e9e9e;
      color: white;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
    }

    .nav-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-links li {
      border-bottom: 1px solid #f0f0f0;
    }

    .nav-links li.nav-divider {
      height: 8px;
      background: #f5f5f5;
      border-bottom: none;
      margin: 8px 0;
    }

    .nav-links a {
      display: block;
      padding: 16px 20px;
      color: #333;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .nav-links a:hover {
      background: #f5f5f5;
    }

    .nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1050;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .nav-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: 767px) {
      .app-header {
        display: none;
      }

      .mobile-nav {
        display: none;
      }

      .nav-overlay {
        display: none;
      }
    }

    @media (max-width: 400px) {
      .logo-main {
        font-size: 20px;
      }

      .logo-sub {
        font-size: 10px;
        letter-spacing: 1.5px;
      }

      .logo-icon {
        font-size: 28px;
      }
    }

    @media (min-width: 768px) {
      .logo-main {
        font-size: 28px;
      }

      .logo-sub {
        font-size: 12px;
        letter-spacing: 2.5px;
      }

      .logo-icon {
        font-size: 36px;
      }
    }
  `]
})
export class HeaderComponent {
  menuOpen = false;
  currentUser = this.authService.currentUser;
  unreadCount = computed(() => 2);
  userInitials = computed(() => {
    const name = this.currentUser()?.name || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
