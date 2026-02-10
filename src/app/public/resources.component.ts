import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../core/data.service';
import { Resource } from '../models/public.model';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Resources & Contacts</h1>
        <p class="page-subtitle">Find support and information for your farming needs</p>
      </div>

      <div class="filter-section card">
        <select class="filter-select" [(ngModel)]="selectedCategory" (change)="filterResources()">
          <option value="all">All Resources</option>
          <option value="Extension Services">Extension Services</option>
          <option value="Financial Support">Financial Support</option>
          <option value="Marketing">Marketing</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>

      <div class="resources-list">
        <div class="resource-card card" *ngFor="let resource of filteredResources">
          <div class="resource-header">
            <div class="resource-info">
              <h3 class="resource-name">{{ resource.name }}</h3>
              <span class="resource-category">{{ resource.category }}</span>
            </div>
          </div>

          <div class="resource-details">
            <div class="detail-row" *ngIf="resource.district">
              <img src="assets/img/pin.svg" style="width:20px;"/>
              <span class="detail-text">{{ resource.district }} District</span>
            </div>
            <div class="detail-row" *ngIf="resource.address">
              <img src="assets/img/point-on-map.svg" style="width:20px;"/>
              <span class="detail-text">{{ resource.address }}</span>
            </div>
            <div class="detail-row" *ngIf="resource.phone">
              <img src="assets/img/phone2.svg" style="width:20px;"/>
              <a href="tel:{{ resource.phone }}" class="detail-link">{{ resource.phone }}</a>
            </div>
            <div class="detail-row" *ngIf="resource.email">
              <img src="assets/img/email.svg" style="width:20px;"/>
              <a href="mailto:{{ resource.email }}" class="detail-link">{{ resource.email }}</a>
            </div>
            <div class="detail-row" *ngIf="resource.website">
              <img src="assets/img/link.svg" style="width:20px;"/>
              <a href="http://{{ resource.website }}" target="_blank" class="detail-link">{{ resource.website }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="emergency-banner card">
        <div class="banner-icon">🚨</div>
        <div class="banner-content">
          <h3 class="banner-title">Emergency Contact</h3>
          <p class="banner-text">For agricultural emergencies, contact NEMO at 501-822-2054</p>
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

    .resources-list {
      display: grid;
      gap: 16px;
      margin-bottom: 24px;
    }

    .resource-card {
      padding: 20px;
    }

    .resource-header {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .resource-icon {
      font-size: 36px;
      flex-shrink: 0;
    }

    .resource-info {
      flex: 1;
    }

    .resource-name {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0 0 6px 0;
    }

    .resource-category {
      display: inline-block;
      background: #e8f5e9;
      color: #2e7d32;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }

    .resource-details {
      display: grid;
      gap: 12px;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
    }

    .detail-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .detail-text {
      color: #666;
    }

    .detail-link {
      color: #1976d2;
      text-decoration: none;
    }

    .detail-link:hover {
      text-decoration: underline;
    }

    .emergency-banner {
      padding: 20px;
      background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
      border: 2px solid #ef5350;
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .banner-icon {
      font-size: 48px;
      flex-shrink: 0;
    }

    .banner-content {
      flex: 1;
    }

    .banner-title {
      font-size: 18px;
      font-weight: 700;
      color: #c62828;
      margin: 0 0 4px 0;
    }

    .banner-text {
      font-size: 14px;
      color: #d32f2f;
      margin: 0;
      font-weight: 500;
    }

    @media (min-width: 768px) {
      .resources-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 480px) {
      .resource-name {
        font-size:16px;
      }
    }
  `]
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  filteredResources: Resource[] = [];
  selectedCategory = 'all';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.resources = this.dataService.getResources();
    this.filteredResources = this.resources;
  }

  filterResources() {
    if (this.selectedCategory === 'all') {
      this.filteredResources = this.resources;
    } else {
      this.filteredResources = this.resources.filter(r => r.category === this.selectedCategory);
    }
  }

  /*   getCategoryIcon(category: string): string {
      const icons: { [key: string]: string } = {
        'Extension Services': '🌾',
        'Financial Support': '💰',
        'Marketing': '🛒',
        'Emergency': '🚨'
      };
      return icons[category] || '📋';
    } */
}
