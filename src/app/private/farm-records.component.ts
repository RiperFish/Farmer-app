import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { Farm } from '../models/user.model';

@Component({
  selector: 'app-farm-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <!-- <h1 class="page-title">📊 Farm Records</h1> -->
        <p class="page-subtitle">View your registered farm and plot information</p>
      </div>

      <div class="farm-overview card" *ngIf="farm">
        <h2 class="section-title">{{ farm.name }}</h2>
        <div class="overview-grid">
          <div class="overview-item">
            <img src="assets/img/pin.svg" style="width:28px;"/>
            <div class="overview-content">
              <div class="overview-label">Location</div>
              <div class="overview-value">{{ farm.village }}, {{ farm.district }}</div>
            </div>
          </div>
          <div class="overview-item">
            <img src="assets/img/acres.svg" style="width:28px;"/>
            <div class="overview-content">
              <div class="overview-label">Total Area</div>
              <div class="overview-value">{{ farm.totalAcres }} acres</div>
            </div>
          </div>
          <div class="overview-item">
            <img src="assets/img/plots.svg" style="width:28px;"/>
            <div class="overview-content">
              <div class="overview-label">Total Plots</div>
              <div class="overview-value">{{ farm.plots.length }} plots</div>
            </div>
          </div>
        </div>
      </div>

      <div class="plots-section">
        <h2 class="section-title">Plot Details</h2>
        <div class="plots-list">
          <div class="plot-card card" *ngFor="let plot of farm?.plots">
            <div class="plot-header">
              <h3 class="plot-name">{{ plot.name }}</h3>
              <span class="plot-status" [class]="'status-' + plot.status">
                {{ plot.status }}
              </span>
            </div>

            <div class="plot-info">
              <div class="info-item">
                
                <div class="info-content">
                  <div class="info-label">Crop Type</div>
                  <div class="info-value">{{ plot.cropType }}</div>
                </div>
              </div>

              <div class="info-item">
                
                <div class="info-content">
                  <div class="info-label">Area</div>
                  <div class="info-value">{{ plot.acres }} acres</div>
                </div>
              </div>

              <div class="info-item" *ngIf="plot.plantingDate">
               
                <div class="info-content">
                  <div class="info-label">Planting Date</div>
                  <div class="info-value">{{ plot.plantingDate | date:'mediumDate' }}</div>
                </div>
              </div>

              <div class="info-item" *ngIf="plot.harvestDate">
                
                <div class="info-content">
                  <div class="info-label">Expected Harvest</div>
                  <div class="info-value">{{ plot.harvestDate | date:'mediumDate' }}</div>
                </div>
              </div>
            </div>

            <div class="plot-timeline" *ngIf="plot.status === 'active' && plot.plantingDate && plot.harvestDate">
              <div class="timeline-label">Growing Progress</div>
              <div class="timeline-bar">
                <div class="timeline-progress" [style.width.%]="getProgress(plot)"></div>
              </div>
              <div class="timeline-info">
                <span>{{ getDaysElapsed(plot) }} days</span>
                <span>{{ getDaysRemaining(plot) }} days remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="records-note card">
        <div class="note-icon">
          <img src="assets/img/warning.svg" style="width:20px;"/>
        </div>
        <div class="note-content">
          <h3 class="note-title">View Only Access</h3>
          <p class="note-text">
            This is a view-only display of your registered farm records.
            To update plot information or add new plots, please contact your local extension officer.
          </p>
        </div>
      </div>

      <div class="statistics-section">
        <h2 class="section-title">Summary Statistics</h2>
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-value">{{ getActivePlots() }}</div>
            <div class="stat-label">Active Plots</div>
          </div>
          <div class="stat-card card">
            <div class="stat-value">{{ getActiveCropAcres() }}</div>
            <div class="stat-label">Acres in Production</div>
          </div>
          <div class="stat-card card">
            <div class="stat-value">{{ getUniqueCrops() }}</div>
            <div class="stat-label">Crop Types</div>
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

    .farm-overview {
      padding: 24px;
      margin-bottom: 24px;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    }

    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #2e7d32;
      margin: 0 0 16px 0;
    }

    .overview-grid {
      display: grid;
      gap: 16px;
      margin-top: 20px;
    }

    .overview-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: white;
      border-radius: 12px;
    }

    .overview-icon {
      font-size: 36px;
      flex-shrink: 0;
    }

    .overview-label {
      font-size: 13px;
      color: #666;
      margin-bottom: 4px;
    }

    .overview-value {
      font-size: 18px;
      font-weight: 700;
      color: #2e7d32;
    }

    .plots-section {
      margin-bottom: 24px;
    }

    .plots-list {
      display: grid;
      gap: 16px;
    }

    .plot-card {
      padding: 20px;
    }

    .plot-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .plot-name {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    .plot-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-active {
      background: #4caf50;
      color: white;
    }

    .status-fallow {
      background: #ff9800;
      color: white;
    }

    .status-harvested {
      background: #2196f3;
      color: white;
    }

    .plot-info {
      display: grid;
      gap: 16px;
      margin-bottom: 16px;
    }

    .info-item {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .info-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .info-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 2px;
    }

    .info-value {
      font-size: 15px;
      font-weight: 600;
      color: #333;
    }

    .plot-timeline {
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      margin-top: 16px;
    }

    .timeline-label {
      font-size: 13px;
      font-weight: 600;
      color: #666;
      margin-bottom: 8px;
    }

    .timeline-bar {
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .timeline-progress {
      height: 100%;
      background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
      transition: width 0.3s ease;
    }

    .timeline-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
    }

    .records-note {
      padding: 16px;
      background: #fff3e0;
      border: 1px solid #ffb74d;
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }

    .note-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .note-title {
      font-size: 15px;
      font-weight: 700;
      color: #f57c00;
      margin: 0 0 6px 0;
    }

    .note-text {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
      margin: 0;
    }

    .statistics-section {
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .stat-card {
      padding: 20px;
      text-align: center;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: #2e7d32;
      margin-bottom: 6px;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      font-weight: 600;
    }

    @media (min-width: 768px) {
      .overview-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class FarmRecordsComponent implements OnInit {
  farm: Farm | null = null;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && user.farmerId) {
      this.farm = this.dataService.getFarmData(user.farmerId);
    }
  }

  getProgress(plot: any): number {
    if (!plot.plantingDate || !plot.harvestDate) return 0;

    const now = new Date().getTime();
    const start = new Date(plot.plantingDate).getTime();
    const end = new Date(plot.harvestDate).getTime();

    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }

  getDaysElapsed(plot: any): number {
    if (!plot.plantingDate) return 0;
    const now = new Date().getTime();
    const start = new Date(plot.plantingDate).getTime();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  }

  getDaysRemaining(plot: any): number {
    if (!plot.harvestDate) return 0;
    const now = new Date().getTime();
    const end = new Date(plot.harvestDate).getTime();
    return Math.max(0, Math.floor((end - now) / (1000 * 60 * 60 * 24)));
  }

  getActivePlots(): number {
    return this.farm?.plots.filter(p => p.status === 'active').length || 0;
  }

  getActiveCropAcres(): number {
    return this.farm?.plots
      .filter(p => p.status === 'active')
      .reduce((sum, p) => sum + p.acres, 0) || 0;
  }

  getUniqueCrops(): number {
    const crops = new Set(this.farm?.plots.map(p => p.cropType));
    return crops.size;
  }
}
