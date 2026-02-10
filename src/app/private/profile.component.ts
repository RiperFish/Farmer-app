import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <!-- <div class="page-header">
        <h1 class="page-title">👤 My Profile</h1>
      </div> -->

      <div class="profile-card card">
        <div class="mob-banner"></div>
        <div class="mob-profile-section">
          <div class="mob-avatar">
            <img
              *ngIf="currentUser()?.profileImageUrl && !imageError()"
              [src]="currentUser()!.profileImageUrl"
              alt="Profile photo"
              class="mob-avatar-img"
              (error)="onImageError()">
            <span
              *ngIf="!currentUser()?.profileImageUrl || imageError()"
              class="mob-avatar-initials">{{ getUserInitials() }}</span>
          </div>
          <div class="mob-name">{{ getUserInitials() }}</div>
        </div>

        <!-- <div class="profile-header">
          <div class="avatar">{{ getUserInitials() }}</div>
          <div class="profile-status">
            <div class="status-badge" [class]="'status-' + currentUser()?.status">
              {{ getStatusText() }}
            </div>
            <div class="farmer-id" *ngIf="currentUser()?.farmerId">
              ID: {{ currentUser()?.farmerId }}
            </div>
          </div>
        </div>
        -->
        <div class="profile-info">
          <div class="info-row">
            <span class="info-label">Full Name</span>
            <span class="info-value">{{ currentUser()?.name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">{{ currentUser()?.email }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Phone</span>
            <span class="info-value">{{ currentUser()?.phone }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">District</span>
            <span class="info-value">{{ currentUser()?.district }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Village</span>
            <span class="info-value">{{ currentUser()?.village }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Registration Date</span>
            <span class="info-value">{{ currentUser()?.registrationDate | date:'mediumDate' }}</span>
          </div>
          <div class="info-row" *ngIf="currentUser()?.verificationDate">
            <span class="info-label">Verification Date</span>
            <span class="info-value">{{ currentUser()?.verificationDate | date:'mediumDate' }}</span>
          </div>
        </div>

        <div class="profile-actions">
          <button class="action-btn primary" (click)="showUpdateForm = !showUpdateForm">
            {{ showUpdateForm ? 'Cancel' : 'Request Profile Update' }}
          </button>
        </div>
      </div>

      <div class="update-form card" *ngIf="showUpdateForm">
        <h3 class="form-title">Request Profile Update</h3>
        <p class="form-note">Submit a request to update your profile information. Changes require approval from an extension officer.</p>

        <div class="form-group">
          <label class="form-label">Field to Update</label>
          <select class="form-control" [(ngModel)]="updateField">
            <option value="">Select a field</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="phone">Phone Number</option>
            <option value="email">Email Address</option>
            <option value="village">Village</option>
          </select>
        </div>

        <div class="form-group" *ngIf="updateField">
          <label class="form-label">New Value</label>
          <input type="text" class="form-control" [(ngModel)]="updateValue" placeholder="Enter new value">
        </div>

        <button class="action-btn primary" (click)="submitUpdateRequest()" [disabled]="!updateField || !updateValue">
          Submit Request
        </button>
      </div>

      <div class="pending-requests card" *ngIf="pendingRequests.length > 0">
        <h3 class="section-title">Pending Update Requests</h3>
        <div class="request-list">
          <div class="request-item" *ngFor="let request of pendingRequests">
            <div class="request-header">
              <span class="request-field">{{ request.field }}</span>
              <span class="request-status" [class]="'status-' + request.status">{{ request.status }}</span>
            </div>
            <div class="request-details">
              <div class="detail-line">
                <span class="detail-label">Current:</span>
                <span class="detail-value">{{ request.oldValue }}</span>
              </div>
              <div class="detail-line">
                <span class="detail-label">Requested:</span>
                <span class="detail-value">{{ request.newValue }}</span>
              </div>
              <div class="detail-line">
                <span class="detail-label">Submitted:</span>
                <span class="detail-value">{{ request.requestDate | date:'short' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="verification-info card" *ngIf="currentUser()?.status !== 'verified'">
        <div class="info-icon">ℹ️</div>
        <div class="info-content">
          <h3 class="info-title">Verification Status</h3>
          <p class="info-text" *ngIf="currentUser()?.status === 'pending'">
            Your profile is currently under review by an extension officer. You will receive a notification once verified.
          </p>
          <p class="info-text" *ngIf="currentUser()?.status === 'unverified'">
            Please contact your local extension office to complete verification and access full features including your Farmer ID and farm records.
          </p>
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
      margin: 0;
    }

    .profile-card {
      padding: 24px;
      margin-bottom: 24px;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f0f0f0;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .profile-status {
      flex: 1;
    }

    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 8px;
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

    .farmer-id {
      font-size: 14px;
      font-weight: 600;
      color: #2e7d32;
    }

    .profile-info {
      display: grid;
      gap: 16px;
      margin-bottom: 24px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f5f5f5;
    }

    .info-label {
      font-size: 14px;
      font-weight: 600;
      color: #666;
    }

    .info-value {
      font-size: 14px;
      color: #333;
      text-align: right;
    }

    .profile-actions {
      display: flex;
      gap: 12px;
    }

    .action-btn {
      flex: 1;
      padding: 14px 24px;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn.primary {
      background: #2e7d32;
      color: white;
    }

    .action-btn.primary:hover:not(:disabled) {
      background: #1b5e20;
      transform: translateY(-1px);
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .update-form {
      padding: 24px;
      margin-bottom: 24px;
    }

    .form-title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0 0 8px 0;
    }

    .form-note {
      font-size: 13px;
      color: #666;
      margin: 0 0 20px 0;
      line-height: 1.5;
    }

    .form-group {
      margin-bottom: 16px;
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
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 15px;
    }

    .pending-requests {
      padding: 24px;
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0 0 16px 0;
    }

    .request-list {
      display: grid;
      gap: 16px;
    }

    .request-item {
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #ff9800;
    }

    .request-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .request-field {
      font-size: 15px;
      font-weight: 600;
      color: #333;
    }

    .request-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .request-details {
      display: grid;
      gap: 8px;
    }

    .detail-line {
      display: flex;
      gap: 8px;
      font-size: 13px;
    }

    .detail-label {
      font-weight: 600;
      color: #666;
    }

    .detail-value {
      color: #333;
    }

    .verification-info {
      padding: 20px;
      background: #e3f2fd;
      border: 1px solid #90caf9;
      display: flex;
      gap: 16px;
    }

    .info-icon {
      font-size: 32px;
      flex-shrink: 0;
    }

    .info-content {
      flex: 1;
    }

    .info-title {
      font-size: 16px;
      font-weight: 700;
      color: #1976d2;
      margin: 0 0 8px 0;
    }

    .info-text {
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      margin: 0;
    }
    @media (max-width: 480px) {
      .page-container {
        padding: 0px;
      }
      .profile-card{
        padding:0 ;
      }
      .profile-info,
      .profile-actions{
        margin-inline:20px;
      }
    }
  `]
})
export class ProfileComponent {
  currentUser = this.authService.currentUser;
  imageError = signal(false);
  showUpdateForm = false;
  updateField = '';
  updateValue = '';
  pendingRequests: any[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {
    const user = this.currentUser();
    if (user) {
      this.pendingRequests = this.dataService.getProfileUpdateRequests(user.id);
    }
  }

  getUserInitials(): string {
    const name = this.currentUser()?.name || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getStatusText(): string {
    const status = this.currentUser()?.status;
    if (status === 'verified') return 'Verified Farmer';
    if (status === 'pending') return 'Verification Pending';
    return 'Unverified';
  }

  onImageError() {
    this.imageError.set(true);
  }

  submitUpdateRequest() {
    if (this.updateField && this.updateValue) {
      alert('Update request submitted successfully! You will be notified once reviewed.');
      this.showUpdateForm = false;
      this.updateField = '';
      this.updateValue = '';
    }
  }
}
