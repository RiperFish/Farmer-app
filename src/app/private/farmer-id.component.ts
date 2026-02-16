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

      <div class="field-illustration">
        <svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" class="field-svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#d4edda"/>
              <stop offset="100%" stop-color="#a8d5b5"/>
            </linearGradient>
            <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#6abf69"/>
              <stop offset="100%" stop-color="#4a9e4a"/>
            </linearGradient>
            <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#5aad5a"/>
              <stop offset="100%" stop-color="#3d8c3d"/>
            </linearGradient>
            <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4caf50"/>
              <stop offset="100%" stop-color="#2e7d32"/>
            </linearGradient>
          </defs>

          <rect width="400" height="140" fill="url(#skyGrad)"/>

          <ellipse cx="200" cy="95" rx="260" ry="50" fill="url(#hillGrad1)" opacity="0.6"/>
          <ellipse cx="100" cy="105" rx="180" ry="45" fill="url(#hillGrad2)" opacity="0.5"/>
          <ellipse cx="320" cy="100" rx="160" ry="40" fill="url(#hillGrad1)" opacity="0.5"/>

          <rect x="0" y="100" width="400" height="40" fill="url(#fieldGrad)"/>

          <path d="M0 105 Q50 95 100 105 Q150 115 200 100 Q250 90 300 105 Q350 115 400 100 L400 140 L0 140Z" fill="#3d8c3d" opacity="0.7"/>

          <g transform="translate(30,50)">
            <line x1="0" y1="50" x2="0" y2="10" stroke="#2e7d32" stroke-width="2.5"/>
            <path d="M0 30 Q-12 20 -8 10 Q-4 15 0 12" fill="#43a047"/>
            <path d="M0 25 Q12 15 8 5 Q4 10 0 8" fill="#388e3c"/>
            <path d="M0 38 Q-10 28 -6 20 Q-3 25 0 22" fill="#4caf50"/>
            <path d="M0 15 Q10 8 7 0 Q3 5 0 3" fill="#2e7d32"/>
            <ellipse cx="1" cy="6" rx="3" ry="5" fill="#c8a415" opacity="0.9"/>
          </g>

          <g transform="translate(65,58)">
            <line x1="0" y1="42" x2="0" y2="8" stroke="#388e3c" stroke-width="2"/>
            <path d="M0 28 Q-10 18 -6 10 Q-3 15 0 12" fill="#43a047"/>
            <path d="M0 22 Q10 12 7 5 Q3 9 0 7" fill="#2e7d32"/>
            <path d="M0 35 Q-8 26 -5 19 Q-2 23 0 20" fill="#4caf50"/>
            <path d="M0 14 Q8 7 5 1 Q2 5 0 3" fill="#388e3c"/>
            <ellipse cx="0" cy="5" rx="2.5" ry="4" fill="#daa520" opacity="0.85"/>
          </g>

          <g transform="translate(105,55)">
            <line x1="0" y1="45" x2="0" y2="5" stroke="#2e7d32" stroke-width="2.5"/>
            <path d="M0 32 Q-14 22 -9 12 Q-5 17 0 14" fill="#43a047"/>
            <path d="M0 26 Q14 16 9 6 Q5 11 0 8" fill="#388e3c"/>
            <path d="M0 40 Q-11 30 -7 22 Q-3 27 0 24" fill="#66bb6a"/>
            <path d="M0 18 Q11 10 7 2 Q3 7 0 5" fill="#2e7d32"/>
            <ellipse cx="1" cy="3" rx="3" ry="5" fill="#c8a415" opacity="0.9"/>
          </g>

          <g transform="translate(150,62)">
            <line x1="0" y1="38" x2="0" y2="10" stroke="#388e3c" stroke-width="2"/>
            <path d="M0 26 Q-9 17 -6 9 Q-3 13 0 11" fill="#4caf50"/>
            <path d="M0 20 Q9 11 6 4 Q3 8 0 6" fill="#43a047"/>
            <path d="M0 33 Q-7 24 -4 17 Q-2 21 0 18" fill="#66bb6a"/>
          </g>

          <g transform="translate(185,52)">
            <line x1="0" y1="48" x2="0" y2="6" stroke="#2e7d32" stroke-width="2.5"/>
            <path d="M0 34 Q-13 24 -8 14 Q-4 19 0 16" fill="#388e3c"/>
            <path d="M0 28 Q13 18 8 8 Q4 13 0 10" fill="#43a047"/>
            <path d="M0 42 Q-10 32 -6 24 Q-3 29 0 26" fill="#4caf50"/>
            <path d="M0 20 Q10 12 6 4 Q3 8 0 6" fill="#2e7d32"/>
            <ellipse cx="0" cy="4" rx="3" ry="5" fill="#daa520" opacity="0.85"/>
          </g>

          <g transform="translate(230,60)">
            <line x1="0" y1="40" x2="0" y2="10" stroke="#388e3c" stroke-width="2"/>
            <path d="M0 28 Q-10 18 -7 10 Q-3 14 0 12" fill="#43a047"/>
            <path d="M0 22 Q10 12 7 5 Q3 9 0 7" fill="#4caf50"/>
            <path d="M0 35 Q-8 26 -5 19 Q-2 23 0 20" fill="#66bb6a"/>
            <path d="M0 15 Q8 8 5 2 Q2 5 0 4" fill="#2e7d32"/>
            <ellipse cx="1" cy="4" rx="2.5" ry="4.5" fill="#c8a415" opacity="0.9"/>
          </g>

          <g transform="translate(270,54)">
            <line x1="0" y1="46" x2="0" y2="7" stroke="#2e7d32" stroke-width="2.5"/>
            <path d="M0 33 Q-12 23 -8 13 Q-4 18 0 15" fill="#388e3c"/>
            <path d="M0 27 Q12 17 8 7 Q4 12 0 9" fill="#43a047"/>
            <path d="M0 40 Q-9 31 -6 23 Q-3 28 0 25" fill="#4caf50"/>
            <path d="M0 19 Q9 11 6 3 Q3 7 0 5" fill="#2e7d32"/>
            <ellipse cx="0" cy="4" rx="3" ry="5" fill="#daa520" opacity="0.85"/>
          </g>

          <g transform="translate(310,60)">
            <line x1="0" y1="40" x2="0" y2="10" stroke="#388e3c" stroke-width="2"/>
            <path d="M0 28 Q-10 19 -6 11 Q-3 15 0 13" fill="#4caf50"/>
            <path d="M0 22 Q10 13 6 5 Q3 9 0 7" fill="#43a047"/>
            <path d="M0 34 Q-8 25 -5 18 Q-2 22 0 20" fill="#66bb6a"/>
          </g>

          <g transform="translate(350,50)">
            <line x1="0" y1="50" x2="0" y2="8" stroke="#2e7d32" stroke-width="2.5"/>
            <path d="M0 36 Q-13 26 -8 16 Q-4 21 0 18" fill="#388e3c"/>
            <path d="M0 30 Q13 20 8 10 Q4 15 0 12" fill="#43a047"/>
            <path d="M0 44 Q-10 34 -6 26 Q-3 31 0 28" fill="#4caf50"/>
            <path d="M0 22 Q10 14 6 6 Q3 10 0 8" fill="#2e7d32"/>
            <ellipse cx="1" cy="5" rx="3" ry="5" fill="#c8a415" opacity="0.9"/>
          </g>

          <g transform="translate(380,58)">
            <line x1="0" y1="42" x2="0" y2="10" stroke="#388e3c" stroke-width="2"/>
            <path d="M0 30 Q-9 20 -6 12 Q-3 16 0 14" fill="#43a047"/>
            <path d="M0 24 Q9 14 6 6 Q3 10 0 8" fill="#4caf50"/>
            <path d="M0 36 Q-7 27 -4 20 Q-2 24 0 22" fill="#66bb6a"/>
          </g>

          <g transform="translate(15,68)">
            <line x1="0" y1="32" x2="0" y2="10" stroke="#388e3c" stroke-width="2"/>
            <path d="M0 22 Q-8 14 -5 7 Q-2 11 0 9" fill="#4caf50"/>
            <path d="M0 17 Q8 9 5 3 Q2 6 0 5" fill="#43a047"/>
            <path d="M0 28 Q-6 20 -4 14 Q-2 17 0 15" fill="#66bb6a"/>
          </g>
        </svg>
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

    .field-illustration {
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
        background: #2e7d32;
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
        border: 3px solid white;
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
        font-weight: 500;
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

      .field-illustration {
        display: block;
        position: fixed;
        bottom: 56px;
        left: 0;
        right: 0;
        height: 120px;
        z-index: 0;
        pointer-events: none;
      }

      .field-svg {
        width: 100%;
        height: 100%;
        display: block;
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

      .mob-cell-value { font-size: 14px; }

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
