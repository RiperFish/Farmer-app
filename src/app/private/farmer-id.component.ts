import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-farmer-id',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">🪪 Electronic Farmer ID</h1>
        <p class="page-subtitle">Official Government of Belize</p>
      </div>

      <div class="id-card">
        <div class="id-header">
          <div class="belize-flag">🇧🇿</div>
          <div class="id-title">
            <div class="id-main-title">Belize Farmer Portal</div>
            <div class="id-subtitle">Ministry of Agriculture</div>
          </div>
        </div>

        <div class="id-photo-section">
          <div class="id-photo">
            <div class="photo-placeholder">{{ getUserInitials() }}</div>
          </div>
          <div class="id-verified">
            <span class="verified-badge">✓ VERIFIED</span>
          </div>
        </div>

        <div class="id-info">
          <div class="id-row">
            <span class="id-label">Name:</span>
            <span class="id-value">{{ currentUser()?.name }}</span>
          </div>
          <div class="id-row">
            <span class="id-label">Farmer ID:</span>
            <span class="id-value farmer-id">{{ currentUser()?.farmerId }}</span>
          </div>
          <div class="id-row">
            <span class="id-label">District:</span>
            <span class="id-value">{{ currentUser()?.district }}</span>
          </div>
          <div class="id-row">
            <span class="id-label">Village:</span>
            <span class="id-value">{{ currentUser()?.village }}</span>
          </div>
          <div class="id-row">
            <span class="id-label">Verified:</span>
            <span class="id-value">{{ currentUser()?.verificationDate | date:'mediumDate' }}</span>
          </div>
        </div>

        <div class="qr-section">
          <div class="qr-code">
            <svg viewBox="0 0 200 200" class="qr-svg">
              <rect x="0" y="0" width="200" height="200" fill="white"/>
              <rect x="20" y="20" width="40" height="40" fill="black"/>
              <rect x="140" y="20" width="40" height="40" fill="black"/>
              <rect x="20" y="140" width="40" height="40" fill="black"/>
              <rect x="30" y="30" width="20" height="20" fill="white"/>
              <rect x="150" y="30" width="20" height="20" fill="white"/>
              <rect x="30" y="150" width="20" height="20" fill="white"/>
              <rect x="80" y="20" width="10" height="10" fill="black"/>
              <rect x="100" y="20" width="10" height="10" fill="black"/>
              <rect x="120" y="20" width="10" height="10" fill="black"/>
              <rect x="80" y="40" width="10" height="10" fill="black"/>
              <rect x="120" y="40" width="10" height="10" fill="black"/>
              <rect x="20" y="80" width="10" height="10" fill="black"/>
              <rect x="40" y="80" width="10" height="10" fill="black"/>
              <rect x="80" y="80" width="40" height="40" fill="black"/>
              <rect x="90" y="90" width="20" height="20" fill="white"/>
              <rect x="140" y="80" width="10" height="10" fill="black"/>
              <rect x="160" y="80" width="10" height="10" fill="black"/>
              <rect x="180" y="80" width="10" height="10" fill="black"/>
              <rect x="80" y="140" width="10" height="10" fill="black"/>
              <rect x="100" y="140" width="10" height="10" fill="black"/>
              <rect x="120" y="140" width="10" height="10" fill="black"/>
              <rect x="140" y="140" width="10" height="10" fill="black"/>
              <rect x="160" y="140" width="10" height="10" fill="black"/>
              <rect x="180" y="140" width="10" height="10" fill="black"/>
              <rect x="80" y="160" width="10" height="10" fill="black"/>
              <rect x="120" y="160" width="10" height="10" fill="black"/>
              <rect x="140" y="160" width="10" height="10" fill="black"/>
              <rect x="180" y="160" width="10" height="10" fill="black"/>
              <rect x="100" y="180" width="10" height="10" fill="black"/>
              <rect x="140" y="180" width="10" height="10" fill="black"/>
              <rect x="160" y="180" width="10" height="10" fill="black"/>
            </svg>
          </div>
          <div class="qr-label">Scan for Verification</div>
        </div>

        <div class="id-footer">
          <div class="issue-date">Issued: {{ currentUser()?.verificationDate | date:'longDate' }}</div>
          <div class="id-signature">Ministry of Agriculture, Fisheries, Forestry and Sustainable Development</div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn" (click)="downloadId()">
          📥 Download ID
        </button>
        <button class="action-btn" (click)="shareId()">
          📤 Share ID
        </button>
      </div>

      <div class="id-info-card card">
        <h3 class="info-title">How to Use Your Farmer ID</h3>
        <ul class="info-list">
          <li>Present this ID at agricultural offices and extension services</li>
          <li>Use for accessing government support programs</li>
          <li>Show at agricultural input stores for registered farmer discounts</li>
          <li>The QR code can be scanned to verify your registration status</li>
          <li>Keep your ID accessible for quick reference</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .page-title {
      font-size: 26px;
      font-weight: 700;
      color: #333;
      margin: 0 0 4px 0;
    }

    .page-subtitle {
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    .id-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      margin-bottom: 24px;
      border: 2px solid #2e7d32;
    }

    .id-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 16px;
      border-bottom: 2px solid #2e7d32;
      margin-bottom: 20px;
    }

    .belize-flag {
      font-size: 36px;
    }

    .id-main-title {
      font-size: 16px;
      font-weight: 700;
      color: #2e7d32;
      line-height: 1.2;
    }

    .id-subtitle {
      font-size: 12px;
      color: #666;
      margin-top: 2px;
    }

    .id-photo-section {
      text-align: center;
      margin-bottom: 20px;
    }

    .id-photo {
      margin: 0 auto 12px;
    }

    .photo-placeholder {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      font-weight: 700;
      margin: 0 auto;
      border: 4px solid #2e7d32;
    }

    .verified-badge {
      display: inline-block;
      background: #4caf50;
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
    }

    .id-info {
      margin-bottom: 20px;
    }

    .id-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .id-label {
      font-size: 13px;
      font-weight: 600;
      color: #666;
    }

    .id-value {
      font-size: 13px;
      color: #333;
      font-weight: 500;
      text-align: right;
    }

    .id-value.farmer-id {
      font-weight: 700;
      color: #2e7d32;
      font-size: 14px;
    }

    .qr-section {
      text-align: center;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 12px;
      margin-bottom: 20px;
    }

    .qr-code {
      width: 160px;
      height: 160px;
      margin: 0 auto 12px;
      background: white;
      padding: 8px;
      border-radius: 8px;
      border: 2px solid #2e7d32;
    }

    .qr-svg {
      width: 100%;
      height: 100%;
    }

    .qr-label {
      font-size: 12px;
      color: #666;
      font-weight: 600;
    }

    .id-footer {
      text-align: center;
      padding-top: 16px;
      border-top: 2px solid #2e7d32;
    }

    .issue-date {
      font-size: 12px;
      color: #666;
      margin-bottom: 6px;
    }

    .id-signature {
      font-size: 10px;
      color: #999;
      line-height: 1.3;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .action-btn {
      padding: 14px 24px;
      background: #2e7d32;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn:hover {
      background: #1b5e20;
      transform: translateY(-1px);
    }

    .id-info-card {
      padding: 20px;
    }

    .info-title {
      font-size: 16px;
      font-weight: 700;
      color: #2e7d32;
      margin: 0 0 12px 0;
    }

    .info-list {
      margin: 0;
      padding-left: 20px;
    }

    .info-list li {
      font-size: 13px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 8px;
    }
  `]
})
export class FarmerIdComponent {
  currentUser = this.authService.currentUser;

  constructor(private authService: AuthService) {}

  getUserInitials(): string {
    const name = this.currentUser()?.name || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  downloadId() {
    alert('Farmer ID download feature - In a real app, this would generate a PDF of your ID card.');
  }

  shareId() {
    alert('Farmer ID share feature - In a real app, this would allow you to share your ID via email or messaging.');
  }
}
