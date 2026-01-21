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
        <h1 class="page-title">Electronic Farmer ID</h1>
        <p class="page-subtitle">Official Government of Belize</p>
      </div>

      <div class="id-card-wrapper">
        <div class="id-card">
          <div class="id-card-header">
            <div class="header-flag">🇧🇿</div>
            <div class="header-text">
              <div class="header-country">BELIZE</div>
              <div class="header-title">FARMER IDENTIFICATION CARD</div>
              <div class="header-ministry">Ministry of Agriculture, Fisheries, Forestry & Sustainable Development</div>
            </div>
          </div>

          <div class="id-card-body">
            <div class="id-left-section">
              <div class="id-photo-container">
                <div class="id-photo">
                  <div class="photo-initials">{{ getUserInitials() }}</div>
                </div>
                <div class="verified-stamp">
                  <div class="stamp-text">VERIFIED</div>
                  <div class="stamp-icon">✓</div>
                </div>
              </div>
            </div>

            <div class="id-right-section">
              <div class="id-details">
                <div class="detail-group">
                  <div class="detail-label">FULL NAME</div>
                  <div class="detail-value">{{ currentUser()?.name?.toUpperCase() }}</div>
                </div>
                <div class="detail-group">
                  <div class="detail-label">FARMER ID NUMBER</div>
                  <div class="detail-value highlight">{{ currentUser()?.farmerId }}</div>
                </div>
                <div class="detail-group">
                  <div class="detail-label">DISTRICT</div>
                  <div class="detail-value">{{ currentUser()?.district?.toUpperCase() }}</div>
                </div>
                <div class="detail-group">
                  <div class="detail-label">VILLAGE/TOWN</div>
                  <div class="detail-value">{{ currentUser()?.village?.toUpperCase() }}</div>
                </div>
                <div class="detail-group">
                  <div class="detail-label">DATE VERIFIED</div>
                  <div class="detail-value">{{ currentUser()?.verificationDate | date:'dd MMM yyyy' }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="id-card-footer">
            <div class="qr-section-large">
              <div class="qr-title">SCAN TO VERIFY</div>
              <div class="qr-code-large">
                <svg viewBox="0 0 200 200" class="qr-svg">
                  <rect x="0" y="0" width="200" height="200" fill="white"/>
                  <rect x="20" y="20" width="50" height="50" fill="black"/>
                  <rect x="130" y="20" width="50" height="50" fill="black"/>
                  <rect x="20" y="130" width="50" height="50" fill="black"/>
                  <rect x="30" y="30" width="30" height="30" fill="white"/>
                  <rect x="140" y="30" width="30" height="30" fill="white"/>
                  <rect x="30" y="140" width="30" height="30" fill="white"/>
                  <rect x="85" y="20" width="15" height="15" fill="black"/>
                  <rect x="105" y="20" width="15" height="15" fill="black"/>
                  <rect x="85" y="40" width="15" height="15" fill="black"/>
                  <rect x="105" y="40" width="15" height="15" fill="black"/>
                  <rect x="20" y="85" width="15" height="15" fill="black"/>
                  <rect x="40" y="85" width="15" height="15" fill="black"/>
                  <rect x="85" y="85" width="30" height="30" fill="black"/>
                  <rect x="90" y="90" width="20" height="20" fill="white"/>
                  <rect x="130" y="85" width="15" height="15" fill="black"/>
                  <rect x="150" y="85" width="15" height="15" fill="black"/>
                  <rect x="170" y="85" width="15" height="15" fill="black"/>
                  <rect x="85" y="130" width="15" height="15" fill="black"/>
                  <rect x="105" y="130" width="15" height="15" fill="black"/>
                  <rect x="85" y="150" width="15" height="15" fill="black"/>
                  <rect x="105" y="150" width="15" height="15" fill="black"/>
                  <rect x="130" y="130" width="15" height="15" fill="black"/>
                  <rect x="150" y="130" width="15" height="15" fill="black"/>
                  <rect x="170" y="130" width="15" height="15" fill="black"/>
                  <rect x="130" y="150" width="15" height="15" fill="black"/>
                  <rect x="170" y="150" width="15" height="15" fill="black"/>
                  <rect x="85" y="170" width="15" height="15" fill="black"/>
                  <rect x="130" y="170" width="15" height="15" fill="black"/>
                  <rect x="150" y="170" width="15" height="15" fill="black"/>
                </svg>
              </div>
              <div class="qr-id">ID: {{ currentUser()?.farmerId }}</div>
            </div>
            <div class="footer-signature">
              <div class="signature-line"></div>
              <div class="signature-label">Authorized Signature</div>
              <div class="issue-info">
                <div class="issue-label">ISSUED:</div>
                <div class="issue-date">{{ currentUser()?.verificationDate | date:'dd/MM/yyyy' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn primary" (click)="downloadId()">
          <span>📥</span> Download ID Card
        </button>
        <button class="action-btn secondary" (click)="shareId()">
          <span>📤</span> Share ID
        </button>
      </div>

      <div class="id-info-card card">
        <h3 class="info-title">About Your Farmer ID</h3>
        <ul class="info-list">
          <li>This is your official identification as a registered farmer in Belize</li>
          <li>Present this ID at agricultural offices, extension services, and input stores</li>
          <li>The QR code contains your verified farmer information</li>
          <li>Access government support programs and registered farmer benefits</li>
          <li>Extension officers can scan the QR code to verify your registration status</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin: 0 0 4px 0;
    }

    .page-subtitle {
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    .id-card-wrapper {
      max-width: 600px;
      margin: 0 auto 24px;
    }

    .id-card {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      border: 3px solid #2e7d32;
      position: relative;
    }

    .id-card-header {
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #ffd700;
    }

    .header-flag {
      font-size: 40px;
      flex-shrink: 0;
    }

    .header-text {
      flex: 1;
    }

    .header-country {
      font-size: 18px;
      font-weight: 800;
      color: #ffd700;
      letter-spacing: 2px;
      line-height: 1;
      margin-bottom: 4px;
    }

    .header-title {
      font-size: 14px;
      font-weight: 700;
      color: white;
      line-height: 1.2;
      margin-bottom: 4px;
    }

    .header-ministry {
      font-size: 9px;
      color: rgba(255,255,255,0.9);
      line-height: 1.3;
    }

    .id-card-body {
      display: flex;
      padding: 24px 20px;
      gap: 20px;
      background: white;
    }

    .id-left-section {
      flex-shrink: 0;
    }

    .id-photo-container {
      position: relative;
    }

    .id-photo {
      width: 140px;
      height: 160px;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #2e7d32;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .photo-initials {
      font-size: 48px;
      font-weight: 800;
      color: #2e7d32;
    }

    .verified-stamp {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #4caf50;
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
      border: 2px solid white;
    }

    .stamp-text {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .stamp-icon {
      font-size: 14px;
    }

    .id-right-section {
      flex: 1;
      min-width: 0;
    }

    .id-details {
      display: grid;
      gap: 14px;
    }

    .detail-group {
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 8px;
    }

    .detail-label {
      font-size: 10px;
      font-weight: 700;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      word-break: break-word;
    }

    .detail-value.highlight {
      font-size: 16px;
      color: #2e7d32;
      font-weight: 800;
    }

    .id-card-footer {
      background: #f8f9fa;
      padding: 20px;
      display: flex;
      gap: 20px;
      align-items: center;
      border-top: 2px solid #e0e0e0;
    }

    .qr-section-large {
      flex-shrink: 0;
      text-align: center;
    }

    .qr-title {
      font-size: 11px;
      font-weight: 800;
      color: #2e7d32;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }

    .qr-code-large {
      width: 120px;
      height: 120px;
      background: white;
      padding: 8px;
      border-radius: 8px;
      border: 3px solid #2e7d32;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin: 0 auto 8px;
    }

    .qr-svg {
      width: 100%;
      height: 100%;
    }

    .qr-id {
      font-size: 10px;
      font-weight: 700;
      color: #666;
      font-family: monospace;
    }

    .footer-signature {
      flex: 1;
    }

    .signature-line {
      width: 100%;
      height: 2px;
      background: #333;
      margin-bottom: 4px;
    }

    .signature-label {
      font-size: 10px;
      color: #666;
      margin-bottom: 12px;
    }

    .issue-info {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .issue-label {
      font-size: 10px;
      font-weight: 700;
      color: #666;
    }

    .issue-date {
      font-size: 11px;
      font-weight: 600;
      color: #333;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      max-width: 600px;
      margin: 0 auto 24px;
    }

    .action-btn {
      padding: 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .action-btn.primary {
      background: #2e7d32;
      color: white;
    }

    .action-btn.primary:hover {
      background: #1b5e20;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46,125,50,0.3);
    }

    .action-btn.secondary {
      background: white;
      color: #2e7d32;
      border: 2px solid #2e7d32;
    }

    .action-btn.secondary:hover {
      background: #e8f5e9;
      transform: translateY(-2px);
    }

    .id-info-card {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
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

    @media (max-width: 600px) {
      .id-card-body {
        flex-direction: column;
        align-items: center;
        padding: 20px 16px;
      }

      .id-photo {
        width: 120px;
        height: 140px;
      }

      .photo-initials {
        font-size: 40px;
      }

      .id-details {
        width: 100%;
      }

      .id-card-footer {
        flex-direction: column;
        gap: 16px;
      }

      .qr-code-large {
        width: 140px;
        height: 140px;
      }

      .footer-signature {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .header-country {
        font-size: 16px;
      }

      .header-title {
        font-size: 12px;
      }

      .header-ministry {
        font-size: 8px;
      }
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
    alert('Download ID feature - This would generate a PDF of your Farmer ID card for printing or saving.');
  }

  shareId() {
    alert('Share ID feature - This would allow you to share your Farmer ID via email or messaging.');
  }
}
