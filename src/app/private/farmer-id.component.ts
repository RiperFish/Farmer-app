import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-farmer-id',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="id-card-wrapper">
        <div class="id-card">

          <div class="id-card-header">
            <div class="header-content">
              <h1 class="belize-text">BELIZE</h1>
              <h2 class="card-title">FARMER IDENTIFICATION CARD</h2>
              <p class="ministry-text">Ministry of Agriculture, Fisheries, Forestry & Sustainable Development</p>
            </div>
          </div>

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
            <div class="mob-name">{{ getTitleCaseName() }}</div>
          </div>

          <div class="id-card-body">
            <div class="main-content">
              <div class="left-section">
                <div class="photo-container">
                  <div class="photo-frame">
                    <img
                      *ngIf="currentUser()?.profileImageUrl && !imageError()"
                      [src]="currentUser()!.profileImageUrl"
                      alt="Profile photo"
                      class="desktop-photo-img"
                      (error)="onImageError()">
                    <div
                      *ngIf="!currentUser()?.profileImageUrl || imageError()"
                      class="photo-initials">{{ getUserInitials() }}</div>
                  </div>
                  <div class="verified-badge">VERIFIED</div>
                </div>
              </div>

              <div class="right-section">
                <div class="info-row name-row">
                  <div class="info-label">FULL NAME</div>
                  <div class="info-value name-value">{{ currentUser()?.name?.toUpperCase() }}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">FARMER ID NUMBER</div>
                  <div class="info-value id-value">{{ currentUser()?.farmerId }}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">DISTRICT</div>
                  <div class="info-value">CAYO</div>
                </div>
                <div class="info-row">
                  <div class="info-label">VILLAGE/TOWN</div>
                  <div class="info-value">SAN IGNACIO</div>
                </div>
                <div class="info-row">
                  <div class="info-label">DATE VERIFIED</div>
                  <div class="info-value">{{ getFormattedDate() }}</div>
                </div>
              </div>
            </div>

            <div class="mob-info-grid">
              <div class="mob-cell">
                <div class="mob-cell-label">Farmer ID</div>
                <div class="mob-cell-value">{{ currentUser()?.farmerId }}</div>
              </div>
              <div class="mob-cell">
                <div class="mob-cell-label">District</div>
                <div class="mob-cell-value dark">{{ currentUser()?.district }}</div>
              </div>
              <div class="mob-cell">
                <div class="mob-cell-label">Village/Town</div>
                <div class="mob-cell-value dark">{{ currentUser()?.village }}</div>
              </div>
              <div class="mob-cell">
                <div class="mob-cell-label">Date Verified</div>
                <div class="mob-cell-value dark">{{ getFormattedDate() }}</div>
              </div>
            </div>

            <div class="bottom-section">
              <div class="qr-container">
                <div class="qr-label">
                  <span class="qr-label-desktop">SCAN TO VERIFY</span>
                  <span class="qr-label-mobile">Scan QR Code</span>
                </div>
                <div class="qr-code">
                  <svg viewBox="0 0 210 210" class="qr-svg">
                    <rect x="0" y="0" width="210" height="210" fill="white"/>
                    <rect x="10" y="10" width="60" height="60" fill="#1a3a52"/>
                    <rect x="20" y="20" width="40" height="40" fill="white"/>
                    <rect x="30" y="30" width="20" height="20" fill="#1a3a52"/>
                    <rect x="140" y="10" width="60" height="60" fill="#1a3a52"/>
                    <rect x="150" y="20" width="40" height="40" fill="white"/>
                    <rect x="160" y="30" width="20" height="20" fill="#1a3a52"/>
                    <rect x="10" y="140" width="60" height="60" fill="#1a3a52"/>
                    <rect x="20" y="150" width="40" height="40" fill="white"/>
                    <rect x="30" y="160" width="20" height="20" fill="#1a3a52"/>
                    <rect x="80" y="10" width="10" height="10" fill="#1a3a52"/>
                    <rect x="100" y="10" width="10" height="10" fill="#1a3a52"/>
                    <rect x="110" y="20" width="10" height="10" fill="#1a3a52"/>
                    <rect x="90" y="30" width="10" height="10" fill="#1a3a52"/>
                    <rect x="120" y="30" width="10" height="10" fill="#1a3a52"/>
                    <rect x="10" y="80" width="10" height="10" fill="#1a3a52"/>
                    <rect x="30" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="50" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="20" y="100" width="10" height="10" fill="#1a3a52"/>
                    <rect x="10" y="110" width="10" height="10" fill="#1a3a52"/>
                    <rect x="40" y="120" width="10" height="10" fill="#1a3a52"/>
                    <rect x="80" y="80" width="10" height="10" fill="#1a3a52"/>
                    <rect x="90" y="70" width="10" height="10" fill="#1a3a52"/>
                    <rect x="100" y="80" width="10" height="10" fill="#1a3a52"/>
                    <rect x="110" y="70" width="10" height="10" fill="#1a3a52"/>
                    <rect x="120" y="80" width="10" height="10" fill="#1a3a52"/>
                    <rect x="90" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="110" y="100" width="10" height="10" fill="#1a3a52"/>
                    <rect x="100" y="110" width="10" height="10" fill="#1a3a52"/>
                    <rect x="80" y="100" width="10" height="10" fill="#1a3a52"/>
                    <rect x="120" y="110" width="10" height="10" fill="#1a3a52"/>
                    <rect x="130" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="150" y="80" width="10" height="10" fill="#1a3a52"/>
                    <rect x="170" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="180" y="100" width="10" height="10" fill="#1a3a52"/>
                    <rect x="160" y="110" width="10" height="10" fill="#1a3a52"/>
                    <rect x="190" y="120" width="10" height="10" fill="#1a3a52"/>
                    <rect x="80" y="140" width="10" height="10" fill="#1a3a52"/>
                    <rect x="100" y="150" width="10" height="10" fill="#1a3a52"/>
                    <rect x="120" y="140" width="10" height="10" fill="#1a3a52"/>
                    <rect x="90" y="160" width="10" height="10" fill="#1a3a52"/>
                    <rect x="110" y="170" width="10" height="10" fill="#1a3a52"/>
                    <rect x="130" y="160" width="10" height="10" fill="#1a3a52"/>
                    <rect x="150" y="140" width="10" height="10" fill="#1a3a52"/>
                    <rect x="170" y="150" width="10" height="10" fill="#1a3a52"/>
                    <rect x="160" y="170" width="10" height="10" fill="#1a3a52"/>
                    <rect x="180" y="160" width="10" height="10" fill="#1a3a52"/>
                    <rect x="190" y="180" width="10" height="10" fill="#1a3a52"/>
                    <rect x="85" y="50" width="10" height="10" fill="#1a3a52"/>
                    <rect x="105" y="50" width="10" height="10" fill="#1a3a52"/>
                    <rect x="125" y="60" width="10" height="10" fill="#1a3a52"/>
                    <rect x="75" y="120" width="10" height="10" fill="#1a3a52"/>
                    <rect x="95" y="130" width="10" height="10" fill="#1a3a52"/>
                    <rect x="115" y="125" width="10" height="10" fill="#1a3a52"/>
                    <rect x="135" y="115" width="10" height="10" fill="#1a3a52"/>
                    <rect x="145" y="105" width="10" height="10" fill="#1a3a52"/>
                    <rect x="155" y="125" width="10" height="10" fill="#1a3a52"/>
                    <rect x="175" y="135" width="10" height="10" fill="#1a3a52"/>
                    <rect x="185" y="145" width="10" height="10" fill="#1a3a52"/>
                    <rect x="195" y="155" width="10" height="10" fill="#1a3a52"/>
                    <rect x="80" y="190" width="10" height="10" fill="#1a3a52"/>
                    <rect x="100" y="190" width="10" height="10" fill="#1a3a52"/>
                    <rect x="120" y="180" width="10" height="10" fill="#1a3a52"/>
                    <rect x="140" y="190" width="10" height="10" fill="#1a3a52"/>
                    <rect x="160" y="190" width="10" height="10" fill="#1a3a52"/>
                    <rect x="180" y="190" width="10" height="10" fill="#1a3a52"/>
                  </svg>
                </div>
                <div class="id-text">{{ currentUser()?.farmerId }}</div>
              </div>
            </div>
          </div>

          

        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn primary" (click)="downloadId()">
          Download ID Card
        </button>
        <button class="action-btn secondary" (click)="shareId()">
          Share ID
        </button>
      </div>
    </div>
  `,
  styles: [`
    .id-card-wrapper {
      max-width: 800px;
      margin: 0 auto 24px;
      padding: 20px;
    }

    .id-card {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      border: 4px solid #2d7a3e;
    }

    .id-card-header {
      background: linear-gradient(135deg, #2d7a3e 0%, #1e5d2f 100%);
      padding: 24px 32px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .header-content { flex: 1; }

    .belize-text {
      font-size: 32px;
      font-weight: 900;
      color: #FFD700;
      margin: 0 0 4px 0;
      letter-spacing: 4px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: white;
      margin: 0 0 8px 0;
      letter-spacing: 1px;
    }

    .ministry-text {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-weight: 500;
      line-height: 1.4;
    }

    .id-card-body {
      background: white;
      padding: 0;
    }

    .main-content {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 0;
      padding: 32px;
    }

    .left-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-right: 32px;
      border-right: 2px solid #e0e0e0;
    }

    .photo-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .photo-frame {
      width: 200px;
      height: 240px;
      background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
      border: 1px solid #2d7a3e;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: -20px;
      z-index: 1;
      overflow: hidden;
    }

    .desktop-photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-initials {
      font-size: 80px;
      font-weight: 900;
      color: #2d7a3e;
      letter-spacing: 4px;
    }

    .verified-badge {
      background: #28a745;
      color: white;
      font-size: 14px;
      font-weight: 700;
      padding: 10px 24px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 2;
      box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
    }

    .right-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      padding-left: 32px;
    }

    .info-row {
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 12px;
    }

    .info-row:last-child { border-bottom: none; }

    .info-label {
      font-size: 11px;
      font-weight: 700;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    .info-value {
      font-size: 16px;
      font-weight: 500;
      color: #2a2a2a;
      letter-spacing: 0.5px;
    }

    .info-value.id-value {
      font-size: 20px;
      font-weight: 900;
      color: #2d7a3e;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }

    .bottom-section {
      display: flex;
      justify-content: center;
      padding: 40px 32px;
    }

    .qr-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .qr-label {
      font-size: 13px;
      font-weight: 700;
      color: #2d7a3e;
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .qr-label-mobile { display: none; }

    .qr-code {
      width: 220px;
      height: 220px;
      background: white;
      padding: 12px;
      border-radius: 8px;
      border: 3px solid #2d7a3e;
      margin-bottom: 16px;
    }

    .qr-svg {
      width: 100%;
      height: 100%;
    }

    .id-text {
      font-size: 13px;
      font-weight: 700;
      color: #666;
      font-family: 'Courier New', monospace;
      letter-spacing: 1px;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .action-btn {
      padding: 16px 24px;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-btn.primary {
      background: #2d7a3e;
      color: white;
    }

    .action-btn.primary:hover {
      background: #1e5d2f;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(45, 122, 62, 0.4);
    }

    .action-btn.secondary {
      background: white;
      color: #2d7a3e;
      border: 2px solid #2d7a3e;
    }

    .action-btn.secondary:hover {
      background: #e8f5e9;
      transform: translateY(-2px);
    }

    .mob-banner,
    .mob-profile-section,
    .mob-info-grid,
    .mob-farm-footer {
      display: none;
    }
    
    @media (max-width: 768px) {
      .id-card-wrapper {
        padding: 0;
        margin: 0 auto 16px;
      }

      .id-card {
        border: none;
        border-radius: 20px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.1);
      }

      .id-card-header { display: none; }
      .main-content { display: none; }

      .mob-banner {
        display: block;
        height: 160px;
        background: linear-gradient(180deg, #8fbc8f 0%, #a5c9a0 40%, #b8d8b4 100%);
        position: relative;
      }

      .mob-profile-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -60px;
        position: relative;
        z-index: 2;
        padding: 0 20px;
      }

      .mob-avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 4px solid white;
        overflow: hidden;
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
        flex-shrink: 0;
      }

      .mob-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .mob-avatar-initials {
        font-size: 40px;
        font-weight: 900;
        color: #2d7a3e;
        letter-spacing: 2px;
      }

      .mob-name {
        font-size: 24px;
        font-weight: 800;
        color: #1a3a1a;
        margin-top: 12px;
        margin-bottom: 20px;
        text-align: center;
      }

      .mob-info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        margin: 0 20px 8px;
        overflow: hidden;
        background: white;
      }

      .mob-cell {
        padding: 16px 18px;
      }

      .mob-cell:nth-child(odd) {
        border-right: 1px solid #e0e0e0;
      }

      .mob-cell:nth-child(1),
      .mob-cell:nth-child(2) {
        border-bottom: 1px solid #e0e0e0;
      }

      .mob-cell-label {
        font-size: 13px;
        color: #888;
        margin-bottom: 6px;
        font-weight: 500;
      }

      .mob-cell-value {
        font-size: 17px;
        font-weight: 700;
        color: #2d7a3e;
      }

      .mob-cell-value.dark {
        color: #2d7a3e;
      }

      .bottom-section {
        padding: 24px 20px 16px;
      }

      .qr-label {
        font-size: 18px;
        font-weight: 700;
        color: #1a3a1a;
        text-transform: none;
        letter-spacing: 0;
      }

      .qr-label-desktop { display: none; }
      .qr-label-mobile { display: inline; }

      .qr-code {
        width: 180px;
        height: 180px;
        border: 2px solid #ddd;
        border-radius: 12px;
      }

      .mob-farm-footer {
        display: block;
        height: 120px;
        overflow: hidden;
        position: relative;
      }

      .mob-farm-svg {
        width: 100%;
        height: 100%;
      }

      .action-buttons { display: none; }
    }

    @media (max-width: 480px) {
      .page-container{
        padding:0px;
      }
      .mob-banner { height: 100px; }
      .id-card{
        border-radius:0px;
        box-shadow: none;
        background: transparent;
      }
      .id-card-body{
        background: transparent;
      }
      .mob-profile-section { margin-top: -55px; }

      .mob-avatar {
        width: 110px;
        height: 110px;
      }
    
      .mob-avatar-initials { font-size: 36px; }

      .mob-name { font-size: 22px; }

      .mob-cell { padding: 14px 16px; }

      .mob-cell-label { font-size: 12px; }

      .mob-cell-value { font-size: 15px; }

      .qr-code {
        width: 160px;
        height: 160px;
      }

      .mob-farm-footer { height: 100px; }
    }
  `]
})
export class FarmerIdComponent {
  currentUser = this.authService.currentUser;
  imageError = signal(false);

  constructor(private authService: AuthService) {}

  getUserInitials(): string {
    const name = this.currentUser()?.name || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getTitleCaseName(): string {
    const name = this.currentUser()?.name || '';
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }

  getFormattedDate(): string {
    const date = this.currentUser()?.verificationDate
      ? new Date(this.currentUser()!.verificationDate!)
      : new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  onImageError() {
    this.imageError.set(true);
  }

  downloadId() {
    alert('Download ID feature - This would generate a PDF of your Farmer ID card for printing or saving.');
  }

  shareId() {
    alert('Share ID feature - This would allow you to share your Farmer ID via email or messaging.');
  }
}
