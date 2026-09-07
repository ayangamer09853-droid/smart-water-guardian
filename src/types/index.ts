export type Language = 'hi' | 'en' | 'pa' | 'gu' | 'mr' | 'ta';

export type UserRole = 'farmer' | 'fpo' | 'ngo' | 'admin';

export interface Farm {
  id: string;
  name: string;
  location: string;
  areaAcres: number;
  cropType: string;
  growthStage: string;
  soilMoisture: number; // percentage 0-100
  temperature: number; // celsius
  humidity: number; // percentage 0-100
  pumpStatus: 'ON' | 'OFF';
  pumpMode: 'AUTO' | 'MANUAL';
  lastIrrigated: string;
  waterSavedLiters: number;
  carbonSavedKg: number;
  yieldBoostPercent: number;
}

export interface SensorNode {
  id: string;
  farmId: string;
  nodeName: string;
  batteryLevel: number; // 0-100%
  signalStrength: number; // 0-100%
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  moistureReading: number;
  tempReading: number;
  lastUpdated: string;
  firmwareVersion: string;
}

export interface AIRecommendation {
  id: string;
  farmId: string;
  timestamp: string;
  status: 'OPTIMAL' | 'IRRIGATE_NOW' | 'DELAY_RAIN' | 'CRITICAL_LOW';
  title: string;
  actionText: string;
  reasoning: string;
  recommendedDurationMins: number;
  waterSavingsEstLiters: number;
  rainProbabilityNext24h: number;
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm';
  rainProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface WaterUsageRecord {
  date: string;
  actualUsed: number; // Liters
  traditionalUsed: number; // Liters
  saved: number; // Liters
  costSavedRupees: number;
}

export interface ForumPost {
  id: string;
  author: string;
  authorRole: string;
  location: string;
  avatar: string;
  title: string;
  content: string;
  category: 'Irrigation' | 'Pests' | 'Weather' | 'Subsidies';
  likes: number;
  repliesCount: number;
  timestamp: string;
  tags: string[];
}
