import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../core/data.service';
import { WeatherData, NewsItem, SeasonalTip } from '../models/public.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="hero-section">
        <h1 class="hero-title">Welcome to BAIMS Farmer Hub</h1>
        <p class="hero-subtitle">Belize Agricultural Information Management System - Your gateway to agricultural resources and support</p>
        <button class="cta-button" routerLink="/register">Register for an account</button>
      </div>

      <div class="weather-snapshot card">
        <div class="card-header">
          <h2 class="card-title">🌤️ Today's Weather</h2>
          <a routerLink="/weather" class="view-more">View Forecast →</a>
        </div>
        <div class="weather-current" *ngIf="currentWeather">
          <div class="weather-icon">{{ currentWeather.icon }}</div>
          <div class="weather-info">
            <div class="temperature">{{ currentWeather.temperature.current }}°F</div>
            <div class="condition">{{ currentWeather.condition }}</div>
            <div class="details">
              <span>High: {{ currentWeather.temperature.high }}°F</span>
              <span>Low: {{ currentWeather.temperature.low }}°F</span>
              <span>Humidity: {{ currentWeather.humidity }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="seasonal-tips">
        <h2 class="section-title">🌱 Seasonal Tips</h2>
        <div class="tips-grid">
          <div class="tip-card card" *ngFor="let tip of seasonalTips">
            <h3 class="tip-title">{{ tip.title }}</h3>
            <p class="tip-description">{{ tip.description }}</p>
            <div class="tip-crops">
              <span class="crop-tag" *ngFor="let crop of tip.crops">{{ crop }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="news-section">
        <h2 class="section-title">📰 Latest News</h2>
        <div class="news-list">
          <div class="news-item card" *ngFor="let item of news">
            <div class="news-category">{{ item.category }}</div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-summary">{{ item.summary }}</p>
            <div class="news-date">{{ item.date | date:'mediumDate' }}</div>
          </div>
        </div>
      </div>

      <div class="quick-links">
        <h2 class="section-title">Quick Access</h2>
        <div class="links-grid">
          <a routerLink="/calendar" class="quick-link-card card">
            <div class="link-icon">📅</div>
            <div class="link-title">Planting Calendar</div>
          </a>
          <a routerLink="/weather" class="quick-link-card card">
            <div class="link-icon">🌤️</div>
            <div class="link-title">Weather Forecast</div>
          </a>
          <a routerLink="/resources" class="quick-link-card card">
            <div class="link-icon">📚</div>
            <div class="link-title">Resources</div>
          </a>
          <a routerLink="/register" class="quick-link-card card featured">
            <div class="link-icon">✍️</div>
            <div class="link-title">Register Now</div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
      color: white;
      padding: 48px 20px;
      text-align: center;
      border-radius: 12px;
      margin-bottom: 24px;
    }

    .hero-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 12px 0;
    }

    .hero-subtitle {
      font-size: 16px;
      opacity: 0.9;
      margin: 0 0 24px 0;
    }

    .cta-button {
      background: white;
      color: #2e7d32;
      border: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .weather-snapshot {
      margin-bottom: 24px;
    }

    .weather-current {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 16px 0 0 0;
    }

    .weather-icon {
      font-size: 64px;
    }

    .weather-info {
      flex: 1;
    }

    .temperature {
      font-size: 36px;
      font-weight: 700;
      color: #2e7d32;
      line-height: 1;
    }

    .condition {
      font-size: 18px;
      color: #666;
      margin: 4px 0;
    }

    .details {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 8px;
      font-size: 14px;
      color: #666;
    }

    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin: 0 0 16px 0;
    }

    .seasonal-tips {
      margin-bottom: 24px;
    }

    .tips-grid {
      display: grid;
      gap: 16px;
    }

    .tip-card {
      padding: 20px;
    }

    .tip-title {
      font-size: 18px;
      font-weight: 600;
      color: #2e7d32;
      margin: 0 0 8px 0;
    }

    .tip-description {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin: 0 0 12px 0;
    }

    .tip-crops {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .crop-tag {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }

    .news-section {
      margin-bottom: 24px;
    }

    .news-list {
      display: grid;
      gap: 16px;
    }

    .news-item {
      padding: 20px;
    }

    .news-category {
      display: inline-block;
      background: #2e7d32;
      color: white;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .news-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }

    .news-summary {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin: 0 0 8px 0;
    }

    .news-date {
      font-size: 13px;
      color: #999;
    }

    .quick-links {
      margin-bottom: 24px;
    }

    .links-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .quick-link-card {
      padding: 24px;
      text-align: center;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .quick-link-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .quick-link-card.featured {
      background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
      color: white;
    }

    .link-icon {
      font-size: 40px;
      margin-bottom: 8px;
    }

    .link-title {
      font-size: 14px;
      font-weight: 600;
    }

    .quick-link-card.featured .link-title {
      color: white;
    }

    @media (min-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 18px;
      }

      .tips-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .links-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  currentWeather: WeatherData | null = null;
  news: NewsItem[] = [];
  seasonalTips: SeasonalTip[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const forecast = this.dataService.getWeatherForecast();
    this.currentWeather = forecast[0];
    this.news = this.dataService.getNews();
    this.seasonalTips = this.dataService.getSeasonalTips();
  }
}
