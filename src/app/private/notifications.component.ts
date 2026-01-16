import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { Notification } from '../models/user.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">🔔 Notifications</h1>
        <p class="page-subtitle" *ngIf="unreadCount > 0">
          {{ unreadCount }} unread notification{{ unreadCount > 1 ? 's' : '' }}
        </p>
      </div>

      <div class="filter-tabs">
        <button class="filter-tab"
                [class.active]="filter === 'all'"
                (click)="filter = 'all'; filterNotifications()">
          All
        </button>
        <button class="filter-tab"
                [class.active]="filter === 'unread'"
                (click)="filter = 'unread'; filterNotifications()">
          Unread ({{ unreadCount }})
        </button>
      </div>

      <div class="notifications-list" *ngIf="filteredNotifications.length > 0">
        <div class="notification-card card"
             *ngFor="let notif of filteredNotifications"
             [class.unread]="!notif.read"
             [class]="'notif-' + notif.type"
             (click)="markAsRead(notif)">
          <div class="notif-header">
            <div class="notif-icon">{{ getNotifIcon(notif.type) }}</div>
            <div class="notif-meta">
              <span class="notif-type">{{ notif.type }}</span>
              <span class="notif-date">{{ getTimeAgo(notif.date) }}</span>
            </div>
            <div class="unread-indicator" *ngIf="!notif.read"></div>
          </div>

          <div class="notif-content">
            <h3 class="notif-title">{{ notif.title }}</h3>
            <p class="notif-message">{{ notif.message }}</p>
          </div>

          <div class="notif-actions" *ngIf="notif.type === 'info' || notif.type === 'success'">
            <button class="action-link">Learn More →</button>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="filteredNotifications.length === 0">
        <div class="empty-icon">📭</div>
        <div class="empty-title">No notifications</div>
        <div class="empty-text" *ngIf="filter === 'unread'">
          You're all caught up!
        </div>
        <div class="empty-text" *ngIf="filter !== 'unread'">
          You don't have any notifications yet.
        </div>
      </div>

      <div class="notification-settings card">
        <h3 class="settings-title">🔕 Notification Preferences</h3>
        <p class="settings-note">Configure what notifications you want to receive</p>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-name">Weather Alerts</div>
              <div class="setting-description">Receive important weather warnings</div>
            </div>
            <label class="toggle">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-name">Program Updates</div>
              <div class="setting-description">New support programs and opportunities</div>
            </div>
            <label class="toggle">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-name">Agricultural Tips</div>
              <div class="setting-description">Seasonal farming advice and best practices</div>
            </div>
            <label class="toggle">
              <input type="checkbox" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-name">Market Prices</div>
              <div class="setting-description">Updates on commodity prices</div>
            </div>
            <label class="toggle">
              <input type="checkbox">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 26px;
      font-weight: 700;
      color: #333;
      margin: 0 0 8px 0;
    }

    .page-subtitle {
      font-size: 15px;
      color: #666;
      margin: 0;
    }

    .filter-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
    }

    .filter-tab {
      padding: 12px 20px;
      background: none;
      border: none;
      color: #666;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
      margin-bottom: -2px;
    }

    .filter-tab.active {
      color: #2e7d32;
      border-bottom-color: #2e7d32;
    }

    .notifications-list {
      display: grid;
      gap: 12px;
      margin-bottom: 24px;
    }

    .notification-card {
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 4px solid transparent;
    }

    .notification-card:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .notification-card.unread {
      background: #e3f2fd;
      border-left-color: #2196f3;
    }

    .notification-card.notif-warning {
      border-left-color: #ff9800;
    }

    .notification-card.notif-success {
      border-left-color: #4caf50;
    }

    .notification-card.notif-alert {
      border-left-color: #f44336;
    }

    .notif-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .notif-icon {
      font-size: 28px;
      flex-shrink: 0;
    }

    .notif-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .notif-type {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #666;
    }

    .notif-date {
      font-size: 12px;
      color: #999;
    }

    .unread-indicator {
      width: 10px;
      height: 10px;
      background: #2196f3;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .notif-content {
      margin-bottom: 12px;
    }

    .notif-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 6px 0;
    }

    .notif-message {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin: 0;
    }

    .notif-actions {
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }

    .action-link {
      background: none;
      border: none;
      color: #2196f3;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
    }

    .empty-state {
      text-align: center;
      padding: 48px 20px;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .empty-title {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
    }

    .empty-text {
      font-size: 15px;
      color: #666;
    }

    .notification-settings {
      padding: 20px;
    }

    .settings-title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0 0 6px 0;
    }

    .settings-note {
      font-size: 13px;
      color: #666;
      margin: 0 0 20px 0;
    }

    .settings-list {
      display: grid;
      gap: 16px;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .setting-item:last-child {
      border-bottom: none;
    }

    .setting-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .setting-description {
      font-size: 12px;
      color: #666;
    }

    .toggle {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 26px;
      flex-shrink: 0;
    }

    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.3s;
      border-radius: 26px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }

    .toggle input:checked + .toggle-slider {
      background-color: #2e7d32;
    }

    .toggle input:checked + .toggle-slider:before {
      transform: translateX(22px);
    }
  `]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  filter: 'all' | 'unread' = 'all';
  unreadCount = 0;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      this.notifications = this.dataService.getNotifications(user.id);
      this.filterNotifications();
      this.unreadCount = this.notifications.filter(n => !n.read).length;
    }
  }

  filterNotifications() {
    if (this.filter === 'unread') {
      this.filteredNotifications = this.notifications.filter(n => !n.read);
    } else {
      this.filteredNotifications = this.notifications;
    }
  }

  markAsRead(notification: Notification) {
    if (!notification.read) {
      notification.read = true;
      this.unreadCount--;
    }
  }

  getNotifIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'info': 'ℹ️',
      'warning': '⚠️',
      'success': '✅',
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
