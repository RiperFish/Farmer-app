import { Component, computed, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="top-nav" *ngIf="visible()">
      <button class="back-btn" (click)="goBack()" *ngIf="showBack()" aria-label="Go back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="back-btn-placeholder" *ngIf="!showBack()"></div>
      <h1 class="page-title">{{ pageTitle() }}</h1>
      <button class="menu-btn" (click)="toggleMenu()" aria-label="Open menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="mob-menu-overlay" [class.open]="menuOpen()" (click)="closeMenu()" *ngIf="visible()"></div>

    <nav class="mob-menu" [class.open]="menuOpen()" *ngIf="visible()">
      <div class="mob-menu-header">
        <div class="mob-menu-user" *ngIf="currentUser()">
          <div class="mob-menu-avatar">{{ userInitials() }}</div>
          <div class="mob-menu-user-info">
            <div class="mob-menu-name">{{ currentUser()?.name }}</div>
            <div class="mob-menu-status" [class]="'status-' + currentUser()?.status">{{ currentUser()?.status }}</div>
          </div>
        </div>
        <div class="mob-menu-brand" *ngIf="!currentUser()">
          <span class="mob-menu-brand-text">BAIMS Farmer Hub</span>
        </div>
        <button class="mob-menu-close" (click)="closeMenu()" aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <ul class="mob-menu-links" *ngIf="!currentUser()">
        <li><a routerLink="/" (click)="closeMenu()"><img src="assets/img/home.svg" alt=""> Home</a></li>
        <li><a routerLink="/weather" (click)="closeMenu()"><img src="assets/img/weather.svg" alt=""> Weather</a></li>
        <li><a routerLink="/calendar" (click)="closeMenu()"><img src="assets/img/calendar.svg" alt=""> Planting Calendar</a></li>
        <li><a routerLink="/resources" (click)="closeMenu()"><img src="assets/img/resources.svg" alt=""> Resources</a></li>
        <li class="mob-menu-divider"></li>
        <li><a routerLink="/login" (click)="closeMenu()"><img src="assets/img/user-black.svg" alt=""> Login</a></li>
        <li><a routerLink="/register" (click)="closeMenu()"><img src="assets/img/user-black.svg" alt=""> Register</a></li>
      </ul>

      <ul class="mob-menu-links" *ngIf="currentUser() && isVerified()">
        <li><a routerLink="/dashboard" (click)="closeMenu()"><img src="assets/img/home.svg" alt=""> Dashboard</a></li>
        <li><a routerLink="/profile" (click)="closeMenu()"><img src="assets/img/user-black.svg" alt=""> My Profile</a></li>
        <li><a routerLink="/farmer-id" (click)="closeMenu()"><img src="assets/img/id.svg" alt=""> Farmer ID</a></li>
        <li><a routerLink="/farm-records" (click)="closeMenu()"><img src="assets/img/chart.svg" alt=""> Farm Records</a></li>
        <li><a routerLink="/commodities" (click)="closeMenu()"><img src="assets/img/commodities.svg" alt=""> Commodities</a></li>
        <li><a routerLink="/notifications" (click)="closeMenu()"><img src="assets/img/bell.svg" alt=""> Notifications</a></li>
        <li class="mob-menu-divider"></li>
        <li><a routerLink="/calendar" (click)="closeMenu()"><img src="assets/img/calendar.svg" alt=""> Planting Calendar</a></li>
        <li><a routerLink="/weather" (click)="closeMenu()"><img src="assets/img/weather.svg" alt=""> Weather</a></li>
        <li><a routerLink="/resources" (click)="closeMenu()"><img src="assets/img/resources.svg" alt=""> Resources</a></li>
        <li class="mob-menu-divider"></li>
        <li><a class="logout-link" (click)="logout()">Logout</a></li>
      </ul>

      <ul class="mob-menu-links" *ngIf="currentUser() && !isVerified()">
        <li><a routerLink="/dashboard" (click)="closeMenu()"><img src="assets/img/home.svg" alt=""> Dashboard</a></li>
        <li><a routerLink="/profile" (click)="closeMenu()"><img src="assets/img/user-black.svg" alt=""> My Profile</a></li>
        <li><a routerLink="/notifications" (click)="closeMenu()"><img src="assets/img/bell.svg" alt=""> Notifications</a></li>
        <li class="mob-menu-divider"></li>
        <li><a routerLink="/calendar" (click)="closeMenu()"><img src="assets/img/calendar.svg" alt=""> Planting Calendar</a></li>
        <li><a routerLink="/weather" (click)="closeMenu()"><img src="assets/img/weather.svg" alt=""> Weather</a></li>
        <li><a routerLink="/resources" (click)="closeMenu()"><img src="assets/img/resources.svg" alt=""> Resources</a></li>
        <li class="mob-menu-divider"></li>
        <li><a class="logout-link" (click)="logout()">Logout</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .top-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      background: #2e7d32;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4px;
      z-index: 1000;
    }

    .back-btn {
      background: none;
      border: none;
      color: white;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.2s;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }

    .back-btn:active {
      background: rgba(255, 255, 255, 0.15);
    }

    .back-btn-placeholder {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
    }

    .page-title {
      flex: 1;
      text-align: center;
      font-size: 17px;
      font-weight: 600;
      color: white;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 4px;
      letter-spacing: 0.2px;
    }

    .menu-btn {
      background: none;
      border: none;
      color: white;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.2s;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }

    .menu-btn:active {
      background: rgba(255, 255, 255, 0.15);
    }

    .mob-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1050;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .mob-menu-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .mob-menu {
      position: fixed;
      top: 0;
      right: -300px;
      width: 280px;
      height: 100vh;
      height: 100dvh;
      background: white;
      z-index: 1100;
      transition: right 0.3s ease;
      overflow-y: auto;
      box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
    }

    .mob-menu.open {
      right: 0;
    }

    .mob-menu-header {
      background: #2e7d32;
      padding: 20px 16px;
      display: flex;
      justify-content: space-between;
    }

    .mob-menu-user {
      display: flex;
      gap: 12px;
      align-items: center;
      flex: 1;
      min-width: 0;
    }

    .mob-menu-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
    }

    .mob-menu-user-info {
      flex: 1;
      min-width: 0;
    }

    .mob-menu-name {
      font-size: 15px;
      font-weight: 600;
      color: white;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mob-menu-status {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-verified { background: #4caf50; color: white; }
    .status-pending { background: #ff9800; color: white; }
    .status-unverified { background: #9e9e9e; color: white; }

    .mob-menu-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }

    .mob-menu-brand-icon {
      font-size: 28px;
    }

    .mob-menu-brand-text {
      font-size: 18px;
      font-weight: 700;
      color: white;
    }

    .mob-menu-close {
      background: none;
      border: none;
      color: white;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.2s;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }

    .mob-menu-close:active {
      background: rgba(255, 255, 255, 0.15);
    }

    .mob-menu-links {
      list-style: none;
      padding: 8px 0;
      margin: 0;
    }

    .mob-menu-links li {
      border-bottom: 1px solid #f0f0f0;
    }

    .mob-menu-links li:last-child {
      border-bottom: none;
    }

    .mob-menu-divider {
      height: 1px;
      background: #e8e8e8;
      margin: 8px 0;
      border-bottom: none !important;
    }

    .mob-menu-links a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 20px;
      color: #333;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: background 0.15s;
      cursor: pointer;
    }

    .mob-menu-links a:active {
      background: #f5f5f5;
    }

    .mob-menu-links a img {
      width: 22px;
      height: 22px;
      opacity: 0.7;
    }

    .logout-link {
      color: #d32f2f !important;
    }

    @media (min-width: 768px) {
      .top-nav {
        display: none;
      }

      .mob-menu-overlay {
        display: none;
      }

      .mob-menu {
        display: none;
      }
    }
  `]
})
export class TopNavComponent {
  private currentPath = '';
  currentUser = this.authService.currentUser;
  menuOpen = signal(false);

  private routeTitleMap: Record<string, string> = {
    '/': 'BAIMS Farmer Hub',
    '/weather': 'Weather',
    '/calendar': 'Planting Calendar',
    '/resources': 'Resources',
    '/login': 'Login',
    '/register': 'Register',
    '/dashboard': 'Dashboard',
    '/profile': 'My Profile',
    '/farmer-id': 'Farmer ID',
    '/farm-records': 'Farm Records',
    '/notifications': 'Notifications',
    '/commodities': 'Commodities'
  };

  private rootPaths = ['/', '/dashboard'];

  userInitials = computed(() => {
    const name = this.currentUser()?.name || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  });

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.currentPath = this.router.url;
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentPath = e.urlAfterRedirects;
      this.closeMenu();
    });
  }

  visible(): boolean {
    return this.currentPath !== '/login' && this.currentPath !== '/register';
  }

  showBack(): boolean {
    if (this.currentUser()) {
      return this.currentPath !== '/dashboard';
    }
    return this.currentPath !== '/';
  }

  pageTitle(): string {
    return this.routeTitleMap[this.currentPath] || 'BAIMS Farmer Hub';
  }

  isVerified(): boolean {
    return this.authService.isVerified();
  }

  goBack(): void {
    this.location.back();
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
