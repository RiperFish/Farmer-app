import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-commodities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Commodities Produced</h1>
        <p class="page-subtitle">Your registered farm commodities and production</p>
      </div>

      <div class="summary-cards">
        <div class="summary-card card">
          <div class="summary-icon">🌾</div>
          <div class="summary-value">{{ getTotalCommodities() }}</div>
          <div class="summary-label">Total Commodities</div>
        </div>
        <div class="summary-card card">
          <div class="summary-icon">📦</div>
          <div class="summary-value">{{ getActiveCrops() }}</div>
          <div class="summary-label">Active Crops</div>
        </div>
        <div class="summary-card card">
          <div class="summary-icon">🌱</div>
          <div class="summary-value">{{ getTotalAcres() }}</div>
          <div class="summary-label">Total Acres</div>
        </div>
      </div>

      <div class="commodities-section">
        <h2 class="section-title">Current Production</h2>
        <div class="commodities-grid">
          <div class="commodity-card card" *ngFor="let commodity of commodities">
            <div class="commodity-header">
              <div class="commodity-icon">{{ commodity.icon }}</div>
              <div class="commodity-info">
                <h3 class="commodity-name">{{ commodity.name }}</h3>
                <span class="commodity-category">{{ commodity.category }}</span>
              </div>
              <span class="commodity-status" [class]="'status-' + commodity.status">
                {{ commodity.status }}
              </span>
            </div>

            <div class="commodity-details">
              <div class="detail-row">
                <span class="detail-label">Area Planted:</span>
                <span class="detail-value">{{ commodity.acres }} acres</span>
              </div>
              <div class="detail-row" *ngIf="commodity.plantingDate">
                <span class="detail-label">Planting Date:</span>
                <span class="detail-value">{{ commodity.plantingDate | date:'MMM d, yyyy' }}</span>
              </div>
              <div class="detail-row" *ngIf="commodity.expectedYield">
                <span class="detail-label">Expected Yield:</span>
                <span class="detail-value">{{ commodity.expectedYield }}</span>
              </div>
              <div class="detail-row" *ngIf="commodity.harvestDate">
                <span class="detail-label">Est. Harvest:</span>
                <span class="detail-value">{{ commodity.harvestDate | date:'MMM d, yyyy' }}</span>
              </div>
            </div>

            <div class="commodity-progress" *ngIf="commodity.status === 'growing'">
              <div class="progress-label">Growth Progress</div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="commodity.progress"></div>
              </div>
              <div class="progress-text">{{ commodity.progress }}% Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div class="historical-section">
        <h2 class="section-title">Production History</h2>
        <div class="history-list">
          <div class="history-item card" *ngFor="let item of productionHistory">
            <div class="history-icon">{{ item.icon }}</div>
            <div class="history-details">
              <div class="history-crop">{{ item.crop }}</div>
              <div class="history-season">{{ item.season }}</div>
            </div>
            <div class="history-yield">
              <div class="yield-label">Total Yield</div>
              <div class="yield-value">{{ item.yield }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card card">
        <div class="info-icon">ℹ️</div>
        <div class="info-content">
          <h3 class="info-title">Commodity Reporting</h3>
          <p class="info-text">
            Your commodity data is used for national agricultural planning and to provide you with
            targeted support programs. Keep your information up to date by contacting your local
            extension officer.
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
      margin: 0 0 8px 0;
    }

    .page-subtitle {
      font-size: 15px;
      color: #666;
      margin: 0;
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }

    .summary-card {
      padding: 20px;
      text-align: center;
    }

    .summary-icon {
      font-size: 40px;
      margin-bottom: 12px;
    }

    .summary-value {
      font-size: 32px;
      font-weight: 700;
      color: #2e7d32;
      margin-bottom: 4px;
    }

    .summary-label {
      font-size: 13px;
      color: #666;
      font-weight: 600;
    }

    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin: 0 0 16px 0;
    }

    .commodities-section {
      margin-bottom: 32px;
    }

    .commodities-grid {
      display: grid;
      gap: 16px;
    }

    .commodity-card {
      padding: 20px;
    }

    .commodity-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .commodity-icon {
      font-size: 36px;
      flex-shrink: 0;
    }

    .commodity-info {
      flex: 1;
      min-width: 0;
    }

    .commodity-name {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0 0 4px 0;
    }

    .commodity-category {
      font-size: 12px;
      color: #666;
      font-weight: 600;
    }

    .commodity-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .status-growing {
      background: #4caf50;
      color: white;
    }

    .status-harvested {
      background: #ff9800;
      color: white;
    }

    .status-planted {
      background: #2196f3;
      color: white;
    }

    .commodity-details {
      display: grid;
      gap: 12px;
      margin-bottom: 16px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }

    .detail-label {
      color: #666;
      font-weight: 600;
    }

    .detail-value {
      color: #333;
      font-weight: 500;
    }

    .commodity-progress {
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .progress-label {
      font-size: 13px;
      font-weight: 600;
      color: #666;
      margin-bottom: 8px;
    }

    .progress-bar {
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 12px;
      color: #666;
      text-align: center;
    }

    .historical-section {
      margin-bottom: 32px;
    }

    .history-list {
      display: grid;
      gap: 12px;
    }

    .history-item {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .history-icon {
      font-size: 32px;
      flex-shrink: 0;
    }

    .history-details {
      flex: 1;
    }

    .history-crop {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .history-season {
      font-size: 13px;
      color: #666;
    }

    .history-yield {
      text-align: right;
    }

    .yield-label {
      font-size: 11px;
      color: #666;
      margin-bottom: 4px;
    }

    .yield-value {
      font-size: 16px;
      font-weight: 700;
      color: #2e7d32;
    }

    .info-card {
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

    .info-title {
      font-size: 16px;
      font-weight: 700;
      color: #1976d2;
      margin: 0 0 8px 0;
    }

    .info-text {
      font-size: 14px;
      color: #333;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 640px) {
      .summary-cards {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 768px) {
      .commodities-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class CommoditiesComponent implements OnInit {
  commodities: any[] = [];
  productionHistory: any[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.commodities = [
      {
        icon: '🌽',
        name: 'Corn',
        category: 'Grains',
        status: 'growing',
        acres: 10,
        plantingDate: new Date('2024-06-15'),
        harvestDate: new Date('2025-10-15'),
        expectedYield: '8,000 lbs',
        progress: 65
      },
      {
        icon: '🫘',
        name: 'Red Kidney Beans',
        category: 'Legumes',
        status: 'planted',
        acres: 8,
        plantingDate: new Date('2024-11-01'),
        harvestDate: new Date('2025-02-15'),
        expectedYield: '6,000 lbs',
        progress: 25
      },
      {
        icon: '🥬',
        name: 'Vegetables (Mixed)',
        category: 'Vegetables',
        status: 'growing',
        acres: 5,
        plantingDate: new Date('2024-10-01'),
        expectedYield: '2,500 lbs',
        progress: 50
      }
    ];

    this.productionHistory = [
      {
        icon: '🌽',
        crop: 'Corn',
        season: '2024 Season 1',
        yield: '7,500 lbs'
      },
      {
        icon: '🫘',
        crop: 'Red Kidney Beans',
        season: '2023-2024',
        yield: '5,800 lbs'
      },
      {
        icon: '🥬',
        crop: 'Vegetables',
        season: '2024 Season 1',
        yield: '2,200 lbs'
      }
    ];
  }

  getTotalCommodities(): number {
    return this.commodities.length;
  }

  getActiveCrops(): number {
    return this.commodities.filter(c => c.status === 'growing' || c.status === 'planted').length;
  }

  getTotalAcres(): number {
    return this.commodities.reduce((sum, c) => sum + c.acres, 0);
  }
}
