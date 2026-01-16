export interface WeatherData {
  date: Date;
  temperature: {
    high: number;
    low: number;
    current: number;
  };
  condition: string;
  humidity: number;
  rainfall: number;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: Date;
  category: string;
  imageUrl?: string;
}

export interface SeasonalTip {
  id: string;
  month: string;
  title: string;
  description: string;
  crops: string[];
}

export interface CropCalendar {
  crop: string;
  category: string;
  plantingMonths: number[];
  harvestMonths: number[];
  duration: string;
  notes: string;
}

export interface Resource {
  id: string;
  category: string;
  name: string;
  district?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
}
