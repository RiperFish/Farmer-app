import { Injectable } from '@angular/core';
import { WeatherData, NewsItem, SeasonalTip, CropCalendar, Resource } from '../models/public.model';
import { Farm, Notification, ProfileUpdateRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getWeatherForecast(): WeatherData[] {
    const today = new Date();
    const forecasts: WeatherData[] = [];

    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      forecasts.push({
        date,
        temperature: {
          high: 85 + Math.floor(Math.random() * 10),
          low: 70 + Math.floor(Math.random() * 10),
          current: i === 0 ? 78 : 0
        },
        condition: this.getRandomCondition(),
        humidity: 65 + Math.floor(Math.random() * 30),
        rainfall: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
        icon: this.getWeatherIcon(i)
      });
    }

    return forecasts;
  }

  private getRandomCondition(): string {
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Scattered Showers', 'Rain'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  private getWeatherIcon(index: number): string {
    const icons = ['☀️', '⛅', '☁️', '🌦️', '🌧️'];
    return icons[index % icons.length];
  }

  getNews(): NewsItem[] {
    return [
      {
        id: '1',
        title: 'New Agricultural Support Program Announced',
        summary: 'Government announces $5M fund to support small-scale farmers across all districts.',
        date: new Date('2024-11-15'),
        category: 'Programs'
      },
      {
        id: '2',
        title: 'Hurricane Season Preparedness',
        summary: 'Ministry of Agriculture reminds farmers to prepare for hurricane season.',
        date: new Date('2024-11-10'),
        category: 'Weather'
      },
      {
        id: '3',
        title: 'New Pest Control Guidelines Released',
        summary: 'Updated guidelines for managing fall armyworm in corn crops.',
        date: new Date('2024-11-05'),
        category: 'Technical'
      }
    ];
  }

  getSeasonalTips(): SeasonalTip[] {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];

    return [
      {
        id: '1',
        month: months[new Date().getMonth()],
        title: 'Planting Season Preparation',
        description: 'Prepare your land for the upcoming planting season. Clear fields and check soil conditions.',
        crops: ['Corn', 'Beans', 'Rice']
      },
      {
        id: '2',
        month: months[new Date().getMonth()],
        title: 'Irrigation Management',
        description: 'Monitor water levels and ensure irrigation systems are functioning properly.',
        crops: ['Vegetables', 'Citrus']
      }
    ];
  }

  getCropCalendar(): CropCalendar[] {
    return [
      {
        crop: 'Corn',
        category: 'Grains',
        plantingMonths: [5, 6, 10, 11],
        harvestMonths: [8, 9, 1, 2],
        duration: '90-120 days',
        notes: 'Two growing seasons per year'
      },
      {
        crop: 'Red Kidney Beans',
        category: 'Legumes',
        plantingMonths: [10, 11, 12],
        harvestMonths: [1, 2, 3],
        duration: '75-90 days',
        notes: 'Best planted in dry season'
      },
      {
        crop: 'Rice',
        category: 'Grains',
        plantingMonths: [6, 7],
        harvestMonths: [10, 11],
        duration: '120-150 days',
        notes: 'Requires consistent water supply'
      },
      {
        crop: 'Tomatoes',
        category: 'Vegetables',
        plantingMonths: [1, 2, 3, 10, 11, 12],
        harvestMonths: [3, 4, 5, 12, 1, 2],
        duration: '60-80 days',
        notes: 'Year-round with proper irrigation'
      },
      {
        crop: 'Cabbage',
        category: 'Vegetables',
        plantingMonths: [11, 12, 1],
        harvestMonths: [2, 3, 4],
        duration: '70-90 days',
        notes: 'Cool season crop'
      },
      {
        crop: 'Papaya',
        category: 'Fruits',
        plantingMonths: [1, 2, 3, 4, 5],
        harvestMonths: [0],
        duration: '9-12 months',
        notes: 'Harvest year-round after maturity'
      },
      {
        crop: 'Citrus',
        category: 'Fruits',
        plantingMonths: [5, 6, 7],
        harvestMonths: [11, 12, 1, 2],
        duration: '2-3 years to bearing',
        notes: 'Long-term crop'
      },
      {
        crop: 'Hot Peppers',
        category: 'Vegetables',
        plantingMonths: [1, 2, 3, 4, 5, 6],
        harvestMonths: [0],
        duration: '60-90 days',
        notes: 'Continuous harvest'
      }
    ];
  }

  getResources(): Resource[] {
    return [
      {
        id: '1',
        category: 'Extension Services',
        name: 'Belize Agricultural Health Authority',
        phone: '501-824-3773',
        email: 'info@baha.org.bz',
        website: 'www.baha.org.bz',
        address: 'Belmopan, Cayo District'
      },
      {
        id: '2',
        category: 'Extension Services',
        name: 'Cayo District Extension Office',
        district: 'Cayo',
        phone: '501-824-2210',
        address: 'San Ignacio Town'
      },
      {
        id: '3',
        category: 'Extension Services',
        name: 'Orange Walk District Extension Office',
        district: 'Orange Walk',
        phone: '501-322-2877',
        address: 'Orange Walk Town'
      },
      {
        id: '4',
        category: 'Extension Services',
        name: 'Toledo District Extension Office',
        district: 'Toledo',
        phone: '501-722-2707',
        address: 'Punta Gorda'
      },
      {
        id: '5',
        category: 'Financial Support',
        name: 'Development Finance Corporation',
        phone: '501-227-2892',
        email: 'info@dfc.bz',
        website: 'www.dfc.bz',
        address: 'Belize City'
      },
      {
        id: '6',
        category: 'Marketing',
        name: 'Belize Marketing & Development Corporation',
        phone: '501-203-0333',
        address: 'Belmopan'
      },
      {
        id: '7',
        category: 'Emergency',
        name: 'National Emergency Management Organization',
        phone: '501-822-2054',
        website: 'www.nemo.org.bz',
        address: 'Belmopan'
      },
      {
        id: '8',
        category: 'Academy',
        name: 'Belize Agri Academy',
        phone: '(501) 822-2241 / 42',
        website: 'https://agribel.bz/',
        address: 'H.M. Queen Elizabeth II Blvd., Belmopan City, Belize C.A'
      }
    ];
  }

  getFarmData(farmerId: string): Farm {
    return {
      id: 'F001',
      farmerId: farmerId,
      name: 'Martinez Family Farm',
      district: 'Cayo',
      village: 'San Ignacio',
      totalAcres: 25,
      plots: [
        {
          id: 'P1',
          name: 'North Field',
          acres: 10,
          cropType: 'Corn',
          plantingDate: new Date('2024-06-15'),
          harvestDate: new Date('2024-10-15'),
          status: 'active'
        },
        {
          id: 'P2',
          name: 'South Field',
          acres: 8,
          cropType: 'Red Kidney Beans',
          plantingDate: new Date('2024-11-01'),
          status: 'active'
        },
        {
          id: 'P3',
          name: 'East Field',
          acres: 7,
          cropType: 'Vegetables',
          status: 'fallow'
        }
      ]
    };
  }

  getNotifications(farmerId: string): Notification[] {
    return [
      {
        id: '1',
        title: 'Weather Alert',
        message: 'Heavy rainfall expected in next 48 hours. Secure your crops and equipment.',
        date: new Date(),
        read: false,
        type: 'warning'
      },
      {
        id: '2',
        title: 'New Support Program Available',
        message: 'You are eligible for the Small Farmer Support Program. Click to learn more.',
        date: new Date(Date.now() - 86400000),
        read: false,
        type: 'info'
      },
      {
        id: '3',
        title: 'Profile Verified',
        message: 'Your farmer profile has been successfully verified. You now have full access.',
        date: new Date(Date.now() - 172800000),
        read: true,
        type: 'success'
      }
    ];
  }

  getProfileUpdateRequests(farmerId: string): ProfileUpdateRequest[] {
    return [
      {
        id: '1',
        farmerId: farmerId,
        field: 'Phone Number',
        oldValue: '501-622-1234',
        newValue: '501-622-9999',
        status: 'pending',
        requestDate: new Date(Date.now() - 86400000)
      }
    ];
  }
}
