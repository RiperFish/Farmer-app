import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../core/data.service';
import { WeatherData } from '../models/public.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">🌤️ Weather Forecast</h1>
        <p class="page-subtitle">7-Day Weather Outlook</p>
      </div>

      <div class="current-weather card" *ngIf="forecast.length > 0">
        <div class="current-label">Current Weather</div>
        <div class="current-display">
          <div class="current-icon">{{ forecast[0].icon }}</div>
          <div class="current-temp">{{ forecast[0].temperature.current }}°F</div>
          <div class="current-condition">{{ forecast[0].condition }}</div>
        </div>
        <div class="current-details">
          <div class="detail-box">
            <div class="detail-label">High / Low</div>
            <div class="detail-value">{{ forecast[0].temperature.high }}° / {{ forecast[0].temperature.low }}°</div>
          </div>
          <div class="detail-box">
            <div class="detail-label">Humidity</div>
            <div class="detail-value">{{ forecast[0].humidity }}%</div>
          </div>
          <div class="detail-box" *ngIf="forecast[0].rainfall > 0">
            <div class="detail-label">Rainfall</div>
            <div class="detail-value">{{ forecast[0].rainfall }}"</div>
          </div>
        </div>
      </div>

      <div class="forecast-title">7-Day Forecast</div>
      <div class="forecast-list">
        <div class="forecast-card card" *ngFor="let day of forecast.slice(1); let i = index">
          <div class="forecast-day">
            <div class="day-name">{{ getDayName(day.date) }}</div>
            <div class="day-date">{{ day.date | date:'MMM d' }}</div>
          </div>
          <div class="forecast-icon">{{ day.icon }}</div>
          <div class="forecast-temps">
            <span class="temp-high">{{ day.temperature.high }}°</span>
            <span class="temp-divider">/</span>
            <span class="temp-low">{{ day.temperature.low }}°</span>
          </div>
          <div class="forecast-condition">{{ day.condition }}</div>
          <div class="forecast-extra">
            <span class="humidity-badge">💧 {{ day.humidity }}%</span>
            <span class="rain-badge" *ngIf="day.rainfall > 0">🌧️ {{ day.rainfall }}"</span>
          </div>
        </div>
      </div>

      <div class="weather-tips card">
        <h3 class="tips-title">Farming Tips Based on Weather</h3>
        <ul class="tips-list">
          <li>Monitor rainfall levels for irrigation planning</li>
          <li>Protect crops during heavy rain periods</li>
          <li>Take advantage of sunny days for field work</li>
          <li>Watch for temperature drops that may affect sensitive crops</li>
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

    .current-weather {
      padding: 24px;
      margin-bottom: 24px;
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    }

    .current-label {
      font-size: 13px;
      font-weight: 600;
      color: #1976d2;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .current-display {
      text-align: center;
      margin-bottom: 20px;
    }

    .current-icon {
      font-size: 80px;
      margin-bottom: 12px;
    }

    .current-temp {
      font-size: 48px;
      font-weight: 700;
      color: #1976d2;
      line-height: 1;
      margin-bottom: 8px;
    }

    .current-condition {
      font-size: 18px;
      color: #333;
      font-weight: 500;
    }

    .current-details {
      display: flex;
      justify-content: space-around;
      gap: 16px;
    }

    .detail-box {
      text-align: center;
    }

    .detail-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 16px;
      font-weight: 600;
      color: #1976d2;
    }

    .forecast-title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0 0 16px 0;
    }

    .forecast-list {
      display: grid;
      gap: 12px;
      margin-bottom: 24px;
    }

    .forecast-card {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .forecast-day {
      flex-shrink: 0;
      width: 70px;
    }

    .day-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    .day-date {
      font-size: 12px;
      color: #666;
    }

    .forecast-icon {
      font-size: 36px;
      flex-shrink: 0;
    }

    .forecast-temps {
      flex-shrink: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .temp-high {
      color: #d32f2f;
    }

    .temp-divider {
      color: #999;
      margin: 0 4px;
    }

    .temp-low {
      color: #1976d2;
    }

    .forecast-condition {
      flex: 1;
      font-size: 14px;
      color: #666;
    }

    .forecast-extra {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      flex-shrink: 0;
    }

    .humidity-badge, .rain-badge {
      background: #e3f2fd;
      padding: 3px 8px;
      border-radius: 12px;
      font-weight: 600;
      color: #1976d2;
    }

    .weather-tips {
      padding: 20px;
    }

    .tips-title {
      font-size: 16px;
      font-weight: 700;
      color: #2e7d32;
      margin: 0 0 12px 0;
    }

    .tips-list {
      margin: 0;
      padding-left: 20px;
    }

    .tips-list li {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 8px;
    }

    @media (min-width: 768px) {
      .forecast-card {
        padding: 20px;
      }

      .forecast-day {
        width: 100px;
      }
    }
    @media (max-width: 480px) {
      .forecast-card{
        gap:unset;
        justify-content:space-between;
      }
      .forecast-temps,.forecast-condition {
        font-size:13px;
        flex:0;
      }
      .forecast-icon{
        font-size:30px;
      }

    }
  `]
})
export class WeatherComponent implements OnInit {
  forecast: WeatherData[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.forecast = this.dataService.getWeatherForecast();
  }

  getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
}
