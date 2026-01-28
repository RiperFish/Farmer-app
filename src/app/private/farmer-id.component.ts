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
              <h1 class="header-title">NATIONAL FARMER<br>IDENTIFICATION CARD</h1>
              <p class="header-subtitle">Government Of Belize</p>
            </div>
          </div>

          <div class="id-card-body">
            <div class="photo-section">
              <div class="photo-frame">
                <div class="photo-initials">{{ getUserInitials() }}</div>
              </div>
            </div>

            <div class="info-section">
              <h2 class="farmer-name">{{ currentUser()?.name }}</h2>
            </div>

            <div class="id-number-section">
              <div class="id-label">Farmer ID Number</div>
              <div class="id-value">{{ currentUser()?.farmerId }}</div>
            </div>

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

          <div class="id-card-footer">
            <p class="footer-text">Belize Agriculture Information Management System</p>
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
      max-width: 400px;
      margin: 0 auto 24px;
      padding: 10px;
    }

    .id-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      border: 3px solid #2e7d32;
    }

    .id-card-header {
      background: linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .logo-placeholder {
      flex-shrink: 0;
    }

    .logo-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: white;
      border: 4px solid #1b5e20;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .logo-text {
      font-size: 18px;
      font-weight: 900;
      color: #2e7d32;
      letter-spacing: 1px;
    }

    .header-content {
      text-align: center;
    }

    .header-title {
      font-size: 18px;
      font-weight: 800;
      color: white;
      margin: 0 0 6px 0;
      letter-spacing: 1.5px;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
      line-height: 1.3;
    }

    .header-subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.95);
      margin: 0;
      font-weight: 600;
    }

    .id-card-body {
      padding: 24px;
      background: linear-gradient(180deg, white 0%, #f8fff9 50%, white 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .photo-section {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .photo-frame {
      width: 200px;
      height: 240px;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border: 5px solid #4CAF50;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }

    .photo-initials {
      font-size: 72px;
      font-weight: 900;
      color: #2e7d32;
    }

    .info-section {
      width: 100%;
      text-align: center;
      padding: 12px 0;
    }

    .farmer-name {
      font-size: 28px;
      font-weight: 900;
      color: #1a1a1a;
      margin: 0;
      text-transform: capitalize;
      line-height: 1.3;
    }

    .id-number-section {
      width: 100%;
      background: linear-gradient(135deg, #f0f9f0 0%, #e8f5e9 100%);
      border: 3px solid #2e7d32;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }

    .id-label {
      font-size: 12px;
      font-weight: 700;
      color: #666;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .id-value {
      font-size: 22px;
      font-weight: 900;
      color: #2e7d32;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }

    .qr-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
    }

    .qr-label {
      font-size: 14px;
      font-weight: 700;
      color: #2e7d32;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .qr-code {
      width: 220px;
      height: 220px;
      background: white;
      padding: 12px;
      border-radius: 12px;
      border: 4px solid #2e7d32;
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      margin-bottom: 12px;
    }

    .qr-svg {
      width: 100%;
      height: 100%;
    }

    .qr-description {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .id-card-footer {
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
      padding: 16px 20px;
      text-align: center;
    }

    .footer-text {
      margin: 0;
      font-size: 11px;
      color: white;
      font-weight: 600;
      letter-spacing: 0.5px;
      line-height: 1.4;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      max-width: 400px;
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
      max-width: 400px;
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

    @media (max-width: 450px) {
      .id-card-wrapper {
        max-width: 100%;
        padding: 5px;
      }

      .id-card {
        border-width: 2px;
      }

      .id-card-header {
        padding: 16px;
      }

      .logo-circle {
        width: 70px;
        height: 70px;
      }

      .logo-text {
        font-size: 16px;
      }

      .header-title {
        font-size: 16px;
      }

      .header-subtitle {
        font-size: 12px;
      }

      .id-card-body {
        padding: 20px 16px;
        gap: 16px;
      }

      .photo-frame {
        width: 180px;
        height: 220px;
      }

      .photo-initials {
        font-size: 64px;
      }

      .farmer-name {
        font-size: 24px;
      }

      .id-number-section {
        padding: 14px;
      }

      .id-value {
        font-size: 20px;
      }

      .qr-code {
        width: 200px;
        height: 200px;
      }

      .id-card-footer {
        padding: 14px 16px;
      }

      .footer-text {
        font-size: 10px;
      }
    }

    @media (max-width: 360px) {
      .photo-frame {
        width: 160px;
        height: 200px;
      }

      .photo-initials {
        font-size: 56px;
      }

      .farmer-name {
        font-size: 22px;
      }

      .qr-code {
        width: 180px;
        height: 180px;
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
