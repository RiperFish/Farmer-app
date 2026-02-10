import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../core/data.service';
import { CropCalendar } from '../models/public.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Planting & Harvesting Calendar</h1>
        <p class="page-subtitle">Plan your crops throughout the year</p>
      </div>

      <div class="filter-section card">
        <select class="filter-select" [(ngModel)]="selectedCategory" (change)="filterCrops()">
          <option value="all">All Categories</option>
          <option value="Grains">Grains</option>
          <option value="Legumes">Legumes</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
        </select>
      </div>

      <div class="calendar-view">
        <div class="crop-item card" *ngFor="let crop of filteredCrops">
          <div class="crop-header">
            <h3 class="crop-name">{{ crop.crop }}</h3>
            <span class="crop-category">{{ crop.category }}</span>
          </div>
          <div class="crop-timeline">
            <div class="timeline-row">
              <span class="timeline-label">Planting:</span>
              <div class="timeline-months">
                <span class="month-indicator"
                      *ngFor="let month of months; let i = index"
                      [class.active-planting]="isPlantingMonth(crop, i)"
                      [class.active-harvest]="isHarvestMonth(crop, i)">
                  {{ month }}
                </span>
              </div>
            </div>
            <div class="timeline-row">
              <span class="timeline-label">Harvest:</span>
              <div class="timeline-months">
                <span class="month-indicator"
                      *ngFor="let month of months; let i = index"
                      [class.active-harvest]="isHarvestMonth(crop, i)"
                      [class.inactive]="!isHarvestMonth(crop, i)">
                  {{ month }}
                </span>
              </div>
            </div>
          </div>
          <div class="crop-details">
            <div class="detail-item">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">{{ crop.duration }}</span>
            </div>
            <div class="detail-note">{{ crop.notes }}</div>
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

    .filter-section {
      padding: 16px;
      margin-bottom: 24px;
    }

    .filter-select {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 15px;
      background: white;
      cursor: pointer;
    }

    .calendar-view {
      display: grid;
      gap: 20px;
    }

    .crop-item {
      padding: 20px;
    }

    .crop-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .crop-name {
      font-size: 20px;
      font-weight: 700;
      color: #2e7d32;
      margin: 0;
    }

    .crop-category {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }

    .crop-timeline {
      margin-bottom: 16px;
    }

    .timeline-row {
      margin-bottom: 12px;
    }

    .timeline-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #666;
      margin-bottom: 8px;
    }

    .timeline-months {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 4px;
    }

    .month-indicator {
      padding: 8px 4px;
      text-align: center;
      font-size: 11px;
      font-weight: 600;
      border-radius: 4px;
      background: #f5f5f5;
      color: #999;
      transition: all 0.2s;
    }

    .month-indicator.active-planting {
      background: #c8e6c9;
      color: #2e7d32;
    }

    .month-indicator.active-harvest {
      background: #ffecb3;
      color: #f57c00;
    }

    .month-indicator.inactive {
      opacity: 0.3;
    }

    .crop-details {
      border-top: 1px solid #f0f0f0;
      padding-top: 16px;
    }

    .detail-item {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .detail-label {
      font-weight: 600;
      color: #666;
    }

    .detail-value {
      color: #333;
    }

    .detail-note {
      font-size: 13px;
      color: #666;
      font-style: italic;
      margin-top: 8px;
    }

    @media (min-width: 768px) {
      .timeline-months {
        grid-template-columns: repeat(12, 1fr);
      }
    }
  `]
})
export class CalendarComponent implements OnInit {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  crops: CropCalendar[] = [];
  filteredCrops: CropCalendar[] = [];
  selectedCategory = 'all';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.crops = this.dataService.getCropCalendar();
    this.filteredCrops = this.crops;
  }

  filterCrops() {
    if (this.selectedCategory === 'all') {
      this.filteredCrops = this.crops;
    } else {
      this.filteredCrops = this.crops.filter(c => c.category === this.selectedCategory);
    }
  }

  isPlantingMonth(crop: CropCalendar, monthIndex: number): boolean {
    return crop.plantingMonths.includes(monthIndex + 1);
  }

  isHarvestMonth(crop: CropCalendar, monthIndex: number): boolean {
    if (crop.harvestMonths.includes(0)) return false;
    return crop.harvestMonths.includes(monthIndex + 1);
  }
}
