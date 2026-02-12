import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { Farm } from '../models/user.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-farm-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
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

      <div class="map-section" *ngIf="farms.length > 0">
        <h2 class="section-title">Farm Locations</h2>
        <div class="map-card card">
          <div #mapContainer class="map-container"></div>
          <div class="map-legend">
            <div class="legend-item" *ngFor="let f of farms">
              <span class="legend-dot"></span>
              <span class="legend-label">{{ f.name }}</span>
              <span class="legend-detail">{{ f.village }} -- {{ f.totalAcres }} acres</span>
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

    .map-section {
      margin-bottom: 24px;
    }

    .map-card {
      padding: 0;
      overflow: hidden;
    }

    .map-container {
      width: 100%;
      height: 280px;
      z-index: 0;
    }

    .map-legend {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-top: 1px solid #e8e8e8;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #2e7d32;
      flex-shrink: 0;
    }

    .legend-label {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    .legend-detail {
      font-size: 12px;
      color: #888;
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

      .map-container {
        height: 380px;
      }
    }
  `]
})
export class FarmRecordsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  farm: Farm | null = null;
  farms: Farm[] = [];
  private map: L.Map | null = null;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && user.farmerId) {
      this.farm = this.dataService.getFarmData(user.farmerId);
      this.farms = this.dataService.getFarmerFarms(user.farmerId);
    }
  }

  ngAfterViewInit() {
    if (this.farms.length > 0) {
      this.initMap();
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initMap() {
    const validFarms = this.farms.filter(f => f.latitude && f.longitude);
    if (validFarms.length === 0) return;

    const centerLat = validFarms.reduce((sum, f) => sum + f.latitude!, 0) / validFarms.length;
    const centerLng = validFarms.reduce((sum, f) => sum + f.longitude!, 0) / validFarms.length;

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: true,
      attributionControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);

    const farmIcon = L.divIcon({
      className: 'farm-marker',
      html: `<div style="
        width: 32px;
        height: 32px;
        background: #2e7d32;
        border: 3px solid #fff;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      "><div style="
        transform: rotate(45deg);
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
      ">F</div></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    validFarms.forEach(f => {
      const totalPlots = f.plots.length;
      const cropList = f.plots.map(p => p.cropType).join(', ');

      L.marker([f.latitude!, f.longitude!], { icon: farmIcon })
        .addTo(this.map!)
        .bindPopup(`
          <div style="font-family: inherit; min-width: 160px;">
            <div style="font-weight: 700; font-size: 14px; color: #2e7d32; margin-bottom: 6px;">${f.name}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 4px;">${f.village}, ${f.district}</div>
            <div style="font-size: 12px; color: #333; margin-bottom: 2px;"><strong>${f.totalAcres}</strong> acres -- <strong>${totalPlots}</strong> plot${totalPlots > 1 ? 's' : ''}</div>
            <div style="font-size: 11px; color: #888;">Crops: ${cropList}</div>
          </div>
        `);
    });

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
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
