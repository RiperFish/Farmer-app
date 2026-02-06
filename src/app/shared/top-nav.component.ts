import { Component, computed } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="top-nav" *ngIf="visible()">
      <button class="back-btn" (click)="goBack()" *ngIf="showBack()" aria-label="Go back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="back-btn-placeholder" *ngIf="!showBack()"></div>
      <h1 class="page-title">{{ pageTitle() }}</h1>
      <div class="right-placeholder"></div>
    </div>
  `,
  styles: [`
    .top-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      
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

    .right-placeholder {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
    }

    @media (min-width: 768px) {
      .top-nav {
        display: none;
      }
    }
  `]
})
export class TopNavComponent {
  private currentPath = '';
  private currentUser = this.authService.currentUser;

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

  goBack(): void {
    this.location.back();
  }
}
