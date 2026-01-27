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
        <h1 class="page-title">National Farmer Identification Card</h1>
        <p class="page-subtitle">Official Government of Belize</p>
      </div>

      <div class="id-card-wrapper">
        <div class="id-card">
          <div class="id-card-header">
            <div class="logo-placeholder">
              <div class="logo-circle">
                <span class="logo-text">BAIMS</span>
              </div>
            </div>
            <div class="header-content">
              <h1 class="header-title">NATIONAL FARMER IDENTIFICATION CARD</h1>
              <p class="header-subtitle">Government Of Belize</p>
            </div>
          </div>

          <div class="id-card-body">
            <div class="body-left">
              <div class="photo-section">
                <div class="photo-frame">
                  <div class="photo-initials">{{ getUserInitials() }}</div>
                </div>
              </div>
              <div class="id-number-section">
                <div class="id-label">ID#</div>
                <div class="id-value">{{ currentUser()?.farmerId }}</div>
              </div>
            </div>

            <div class="body-center">
              <div class="diagonal-accent"></div>
              <div class="info-section">
                <h2 class="farmer-name">{{ currentUser()?.name }}</h2>
              </div>
            </div>

            <div class="body-right">
              <div class="qr-section">
                <div class="qr-label">Electronic ID</div>
                <div class="qr-code">
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
                <div class="qr-description">Scan to Verify</div>
              </div>
            </div>
          </div>

          <div class="id-card-footer">
            <div class="footer-left">
              <div class="issue-badge">
                <span class="badge-label">Issue #:</span>
                <span class="badge-value">1</span>
              </div>
            </div>
            <div class="footer-center">
              <p class="footer-text">Belize Agriculture Information Management System</p>
            </div>
            <div class="footer-right"></div>
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
      max-width: 900px;
      margin: 0 auto 24px;
      overflow-x: auto;
      padding: 10px;
    }

    .id-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      border: 2px solid #2e7d32;
      min-width: 800px;
      aspect-ratio: 16/10;
    }

    .id-card-header {
      background: linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%);
      padding: 16px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      height: 80px;
    }

    .logo-placeholder {
      flex-shrink: 0;
    }

    .logo-circle {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: white;
      border: 3px solid #1b5e20;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .logo-text {
      font-size: 16px;
      font-weight: 900;
      color: #2e7d32;
      letter-spacing: 1px;
    }

    .header-content {
      flex: 1;
      text-align: center;
    }

    .header-title {
      font-size: 22px;
      font-weight: 800;
      color: white;
      margin: 0 0 4px 0;
      letter-spacing: 2px;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }

    .header-subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.95);
      margin: 0;
      font-weight: 600;
    }

    .id-card-body {
      display: flex;
      padding: 20px;
      gap: 20px;
      background: linear-gradient(135deg, white 0%, #f8fff9 50%, white 100%);
      min-height: 280px;
      position: relative;
    }

    .body-left {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 200px;
    }

    .photo-section {
      flex: 1;
    }

    .photo-frame {
      width: 100%;
      height: 220px;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border: 4px solid #4CAF50;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .photo-initials {
      font-size: 64px;
      font-weight: 900;
      color: #2e7d32;
    }

    .id-number-section {
      background: white;
      border: 2px solid #2e7d32;
      border-radius: 6px;
      padding: 8px 12px;
      text-align: center;
    }

    .id-label {
      font-size: 11px;
      font-weight: 700;
      color: #666;
      margin-bottom: 2px;
    }

    .id-value {
      font-size: 15px;
      font-weight: 800;
      color: #2e7d32;
      font-family: 'Courier New', monospace;
    }

    .body-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      padding-left: 20px;
      justify-content: center;
    }

    .diagonal-accent {
      position: absolute;
      left: 0;
      top: -20px;
      bottom: -20px;
      width: 60px;
      background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, transparent 100%);
      transform: skewX(-15deg);
      border-left: 3px solid rgba(76, 175, 80, 0.3);
    }

    .info-section {
      flex: 1;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
    }

    .farmer-name {
      font-size: 36px;
      font-weight: 900;
      color: #1a1a1a;
      margin: 0;
      text-transform: capitalize;
      line-height: 1.2;
    }

    .body-right {
      flex-shrink: 0;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .qr-section {
      text-align: center;
    }

    .qr-label {
      font-size: 12px;
      font-weight: 700;
      color: #2e7d32;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .qr-code {
      width: 150px;
      height: 150px;
      background: white;
      padding: 8px;
      border-radius: 8px;
      border: 3px solid #2e7d32;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      margin: 0 auto 8px;
    }

    .qr-svg {
      width: 100%;
      height: 100%;
    }

    .qr-description {
      font-size: 10px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .id-card-footer {
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
    }

    .footer-left {
      flex-shrink: 0;
    }

    .issue-badge {
      background: white;
      padding: 6px 12px;
      border-radius: 6px;
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .badge-label {
      font-size: 11px;
      font-weight: 700;
      color: #666;
    }

    .badge-value {
      font-size: 13px;
      font-weight: 800;
      color: #2e7d32;
    }

    .footer-center {
      flex: 1;
      text-align: center;
    }

    .footer-text {
      margin: 0;
      font-size: 12px;
      color: white;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .footer-right {
      flex-shrink: 0;
      width: 100px;
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

    @media (max-width: 900px) {
      .id-card-wrapper {
        overflow-x: scroll;
      }

      .id-card {
        min-width: 750px;
      }

      .qr-code {
        width: 130px;
        height: 130px;
      }
    }

    @media (max-width: 600px) {
      .id-card {
        min-width: 700px;
      }

      .header-title {
        font-size: 18px;
      }

      .farmer-name {
        font-size: 28px;
      }

      .body-left {
        width: 160px;
      }

      .body-right {
        width: 160px;
      }

      .photo-frame {
        height: 180px;
      }

      .photo-initials {
        font-size: 52px;
      }

      .qr-code {
        width: 120px;
        height: 120px;
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
