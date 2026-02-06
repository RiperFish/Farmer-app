import { Component } from '@angular/core';
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
            <!-- <div class="flag-emblem">BZ</div> -->
            <div class="header-content">
              <h1 class="belize-text">BELIZE</h1>
              <h2 class="card-title">FARMER IDENTIFICATION CARD</h2>
              <p class="ministry-text">Ministry of Agriculture, Fisheries, Forestry & Sustainable Development</p>
            </div>
          </div>

          <div class="id-card-body">
            <div class="main-content">
              <div class="left-section">
                <div class="photo-container">
                  <div class="photo-frame">
                    <div class="photo-initials">{{ getUserInitials() }}</div>
                  </div>
                  <div class="verified-badge">VERIFIED ✓</div>
                </div>
              </div>

              <div class="right-section">
                <div class="info-row">
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

            <div class="bottom-section">
              <div class="qr-container">
                <div class="qr-label">SCAN TO VERIFY</div>
                <div class="qr-code">
                  <svg viewBox="0 0 210 210" class="qr-svg">
                    <rect x="0" y="0" width="210" height="210" fill="white"/>

                    <!-- Top-left position marker -->
                    <rect x="10" y="10" width="60" height="60" fill="#1a3a52"/>
                    <rect x="20" y="20" width="40" height="40" fill="white"/>
                    <rect x="30" y="30" width="20" height="20" fill="#1a3a52"/>

                    <!-- Top-right position marker -->
                    <rect x="140" y="10" width="60" height="60" fill="#1a3a52"/>
                    <rect x="150" y="20" width="40" height="40" fill="white"/>
                    <rect x="160" y="30" width="20" height="20" fill="#1a3a52"/>

                    <!-- Bottom-left position marker -->
                    <rect x="10" y="140" width="60" height="60" fill="#1a3a52"/>
                    <rect x="20" y="150" width="40" height="40" fill="white"/>
                    <rect x="30" y="160" width="20" height="20" fill="#1a3a52"/>

                    <!-- Data pattern - row 1 (between top markers) -->
                    <rect x="80" y="10" width="10" height="10" fill="#1a3a52"/>
                    <rect x="100" y="10" width="10" height="10" fill="#1a3a52"/>
                    <rect x="110" y="20" width="10" height="10" fill="#1a3a52"/>
                    <rect x="90" y="30" width="10" height="10" fill="#1a3a52"/>
                    <rect x="120" y="30" width="10" height="10" fill="#1a3a52"/>

                    <!-- Data pattern - left side -->
                    <rect x="10" y="80" width="10" height="10" fill="#1a3a52"/>
                    <rect x="30" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="50" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="20" y="100" width="10" height="10" fill="#1a3a52"/>
                    <rect x="10" y="110" width="10" height="10" fill="#1a3a52"/>
                    <rect x="40" y="120" width="10" height="10" fill="#1a3a52"/>

                    <!-- Data pattern - center area -->
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

                    <!-- Data pattern - right side -->
                    <rect x="150" y="80" width="10" height="10" fill="#1a3a52"/>
                    <rect x="170" y="90" width="10" height="10" fill="#1a3a52"/>
                    <rect x="180" y="100" width="10" height="10" fill="#1a3a52"/>
                    <rect x="160" y="110" width="10" height="10" fill="#1a3a52"/>
                    <rect x="190" y="120" width="10" height="10" fill="#1a3a52"/>

                    <!-- Data pattern - bottom center -->
                    <rect x="80" y="140" width="10" height="10" fill="#1a3a52"/>
                    <rect x="100" y="150" width="10" height="10" fill="#1a3a52"/>
                    <rect x="120" y="140" width="10" height="10" fill="#1a3a52"/>
                    <rect x="90" y="160" width="10" height="10" fill="#1a3a52"/>
                    <rect x="110" y="170" width="10" height="10" fill="#1a3a52"/>
                    <rect x="130" y="160" width="10" height="10" fill="#1a3a52"/>

                    <!-- Data pattern - bottom right -->
                    <rect x="150" y="140" width="10" height="10" fill="#1a3a52"/>
                    <rect x="170" y="150" width="10" height="10" fill="#1a3a52"/>
                    <rect x="160" y="170" width="10" height="10" fill="#1a3a52"/>
                    <rect x="180" y="160" width="10" height="10" fill="#1a3a52"/>
                    <rect x="190" y="180" width="10" height="10" fill="#1a3a52"/>

                    <!-- Additional data dots for density -->
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
                <div class="id-text">ID: {{ currentUser()?.farmerId }}</div>
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

    .flag-emblem {
      width: 60px;
      height: 60px;
      background: #003f87;
      border: 3px solid #FFD700;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 900;
      color: white;
      flex-shrink: 0;
    }

    .header-content {
      flex: 1;
    }

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
      border-bottom: 3px solid #FFD700;
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

    .info-row:last-child {
      border-bottom: none;
    }

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

    @media (max-width: 768px) {
      .main-content {
        grid-template-columns: 1fr;
      }

      .left-section {
        border-right: none;
        border-bottom: 2px solid #e0e0e0;
        padding-right: 0;
        padding-bottom: 24px;
        margin-bottom: 24px;
      }

      .right-section {
        padding-left: 0;
        padding-top: 0px;
        gap:12px;
      }

      .bottom-section {
        padding: 32px 20px;
      }
    }

    @media (max-width: 480px) {
      .id-card-wrapper {
        padding: 0;
      }

      .id-card {
        border-width: 3px;
        border-radius: 16px;
      }

      .id-card-header {
        padding: 16px 20px;
      }

      .flag-emblem {
        width: 50px;
        height: 50px;
        font-size: 16px;
      }

      .belize-text {
        font-size: 24px;
        letter-spacing: 2px;
      }

      .card-title {
        font-size: 14px;
      }

      .ministry-text {
        font-size: 10px;
      }

      .main-content {
        padding: 20px;
      }

      .bottom-section {
        padding: 24px 20px;
      }

      .photo-frame {
        width: 160px;
        height: 200px;
      }

      .photo-initials {
        font-size: 60px;
      }

      .verified-badge {
        font-size: 12px;
        padding: 8px 20px;
      }

      .info-value,
      .info-value.name-value,
      .info-value.id-value{
        font-size: 14px;
      }

      .qr-code {
        width: 200px;
        height: 200px;
      }

      .action-buttons {
        grid-template-columns: 1fr;
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

  getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  downloadId() {
    alert('Download ID feature - This would generate a PDF of your Farmer ID card for printing or saving.');
  }

  shareId() {
    alert('Share ID feature - This would allow you to share your Farmer ID via email or messaging.');
  }
}
