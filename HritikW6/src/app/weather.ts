import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Using Open-Meteo API (free, no key required) for Mumbai coordinates
  private apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=10';

  constructor(private http: HttpClient) { }

  async getWeather() {
    const data: any = await firstValueFrom(this.http.get(this.apiUrl));
    return this.transformData(data.daily);
  }

  private transformData(daily: any): any[] {
    if (!daily) return [];

    // Transform parallel arrays into array of objects
    return daily.time.map((time: string, index: number) => ({
      date: time,
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index],
      code: daily.weather_code[index],
      description: this.getWeatherDescription(daily.weather_code[index])
    }));
  }

  private getWeatherDescription(code: number): string {
    // Basic WMO Weather interpretation codes
    const codes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog',
      51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
      61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      // Add more as needed, fallback for others
    };
    return codes[code] || 'Variable weather';
  }
}
