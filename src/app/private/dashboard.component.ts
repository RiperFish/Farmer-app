import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { Notification } from '../models/user.model';
import { WeatherData } from '../models/public.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="welcome-section">
        <h1 class="welcome-title">Welcome, {{ currentUser()?.name }}!</h1>
        <div class="status-badge" [class]="'status-' + currentUser()?.status">
          {{ getStatusText() }}
        </div>
      </div>

      <div class="quick-actions">
        <a routerLink="/profile" class="action-card card">
          <img src="assets/img/user-black.svg" style="width:44px"/>
          <div class="action-text">My Profile</div>
        </a>
        <a routerLink="/farmer-id" class="action-card card" *ngIf="currentUser()?.status === 'verified'">
          <img src="assets/img/id.svg" style="width:44px"/>
          <div class="action-text">Farmer ID</div>
        </a>
        <a routerLink="/farm-records" class="action-card card" *ngIf="currentUser()?.status === 'verified'">
         <img src="assets/img/chart.svg" style="width:44px"/>
          <div class="action-text">Farm Records</div>
        </a>
        <a routerLink="/notifications" class="action-card card">
          <img src="assets/img/bell.svg" style="width:44px"/>
          <div class="action-text">Notifications</div>
          <span class="action-badge" *ngIf="unreadCount > 0">{{ unreadCount }}</span>
        </a>
      </div>

      <div class="weather-widget card">
        <div class="widget-header">
         <h2 class="card-title">
            <img src="assets/img/weather.svg" style="width:25px"/> 
            Today's Weather
          </h2>
          <a routerLink="/weather" class="widget-link">Full Forecast →</a>
        </div>
        <div class="weather-display" *ngIf="weather">
          <div class="weather-icon">{{ weather.icon }}</div>
          <div class="weather-info">
            <div class="weather-temp">{{ weather.temperature.current }}°F</div>
            <div class="weather-condition">{{ weather.condition }}</div>
          </div>
        </div>
      </div>

      <div class="notifications-widget card" *ngIf="recentNotifications.length > 0">
        <div class="widget-header">
          <h2 class="card-title">
            <img src="assets/img/bell.svg"  style="width:25px"/>
            Recent Notifications
           </h2>
          <a routerLink="/notifications" class="widget-link">View All →</a>
        </div>
        <div class="notification-list">
          <div class="notification-item"
               *ngFor="let notif of recentNotifications"
               [class.unread]="!notif.read"
               [class]="'notif-' + notif.type">
            <div class="notif-icon"><img src="{{ getNotifIcon(notif.type) }}" style="width:20px;"/></div>
            <div class="notif-content">
              <div class="notif-title">{{ notif.title }}</div>
              <div class="notif-message">{{ notif.message }}</div>
              <div class="notif-time">{{ getTimeAgo(notif.date) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="resources-widget">
        <h2 class="widget-title">Quick Links</h2>
        <div class="links-grid">
          <a routerLink="/calendar" class="link-card card">
            <img src="assets/img/calendar.svg" style="width:44px"/> 
            <span class="link-text">Planting Calendar</span>
          </a>
          <a routerLink="/weather" class="link-card card">
            <img src="assets/img/weather.svg" style="width:44px"/> 
            <span class="link-text">Weather</span>
          </a>
          <a routerLink="/resources" class="link-card card">
            <img src="assets/img/resources.svg" style="width:44px"/> 
            <span class="link-text">Resources</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-section {
      text-align: center;
      margin-bottom: 24px;
    }

    .welcome-title {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin: 0 0 12px 0;
    }

    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
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

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .action-card {
      position: relative;
      padding: 24px;
      text-align: center;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .action-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .action-icon {
      font-size: 36px;
      margin-bottom: 8px;
    }

    .action-text {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    .action-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #f44336;
      color: white;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 7px;
      border-radius: 12px;
      min-width: 20px;
      text-align: center;
    }

    .weather-widget,
    .notifications-widget {
      margin-bottom: 24px;
      padding: 20px;
    }

    .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .widget-title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    .widget-link {
      font-size: 13px;
      color: #1976d2;
      text-decoration: none;
      font-weight: 600;
    }

    .weather-display {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .weather-icon {
      font-size: 56px;
    }

    .weather-temp {
      font-size: 32px;
      font-weight: 700;
      color: #2e7d32;
      line-height: 1;
    }

    .weather-condition {
      font-size: 16px;
      color: #666;
      margin-top: 4px;
    }

    .notification-list {
      display: grid;
      gap: 12px;
    }

    .notification-item {
      display: flex;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      background: #f9f9f9;
    }

    .notification-item.unread {
      background: #e3f2fd;
    }

    .notif-icon {
      font-size:18px;
      flex-shrink: 0;
    }

    .notif-content {
      flex: 1;
      min-width: 0;
    }

    .notif-title {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .notif-message {
      font-size: 13px;
      color: #666;
      line-height: 1.4;
      margin-bottom: 4px;
    }

    .notif-time {
      font-size: 12px;
      color: #999;
    }

    .resources-widget {
      margin-bottom: 24px;
    }

    .links-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 16px;
    }

    .link-card {
      padding: 20px;
      text-align: center;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .link-card:hover {
      transform: translateY(-2px);
    }

    .link-icon {
      font-size: 28px;
      display: block;
      margin-bottom: 6px;
    }

    .link-text {
      font-size: 12px;
      font-weight: 600;
      color: #333;
    }

    @media (min-width: 768px) {
      .quick-actions {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser = this.authService.currentUser;
  weather: WeatherData | null = null;
  recentNotifications: Notification[] = [];
  unreadCount = 0;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const forecast = this.dataService.getWeatherForecast();
    this.weather = forecast[0];

    const user = this.currentUser();
    if (user) {
      const allNotifications = this.dataService.getNotifications(user.id);
      this.recentNotifications = allNotifications.slice(0, 3);
      this.unreadCount = allNotifications.filter(n => !n.read).length;
    }
  }

  getStatusText(): string {
    const status = this.currentUser()?.status;
    if (status === 'verified') return 'Verified Farmer';
    if (status === 'pending') return 'Verification Pending';
    return 'Unverified';
  }

  getNotifIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'info': 'assets/img/warning.svg',
      'warning': 'assets/img/danger.svg',
      'success': 'assets/img/check.svg',
      'alert': '🚨'
    };
    return icons[type] || 'ℹ️';
  }

  getTimeAgo(date: Date): string {
    const now = new Date().getTime();
    const diff = now - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}
