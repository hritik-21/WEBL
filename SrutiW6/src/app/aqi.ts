import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AqiService {
  private cities = [
    { name: 'New Delhi', lat: 28.61, lon: 77.21 },
    { name: 'Mumbai', lat: 19.08, lon: 72.88 },
    { name: 'Bangalore', lat: 12.97, lon: 77.59 },
    { name: 'Chennai', lat: 13.08, lon: 80.27 },
    { name: 'Kolkata', lat: 22.57, lon: 88.36 },
    { name: 'Hyderabad', lat: 17.39, lon: 78.49 },
    { name: 'Ahmedabad', lat: 23.02, lon: 72.57 },
    { name: 'Pune', lat: 18.52, lon: 73.85 },
    { name: 'Surat', lat: 21.17, lon: 72.83 },
    { name: 'Jaipur', lat: 26.91, lon: 75.78 }
  ];

  constructor() { }

  async getData(): Promise<any[]> {
    try {
      const requests = this.cities.map(async (city) => {
        try {
          const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&current=us_aqi,pm10,pm2_5`;
          const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code`;

          const [aqiResponse, weatherResponse] = await Promise.all([
            fetch(aqiUrl),
            fetch(weatherUrl)
          ]);

          if (!aqiResponse.ok || !weatherResponse.ok) return null;

          const aqiData = await aqiResponse.json();
          const weatherData = await weatherResponse.json();

          const currentAqi = aqiData.current;
          const aqiUnits = aqiData.current_units;
          const currentWeather = weatherData.current;
          const weatherUnits = weatherData.current_units;
          const time = currentAqi.time;

          return {
            location: city.name,
            city: city.name,
            measurements: [
              { parameter: 'US AQI', value: currentAqi.us_aqi, unit: aqiUnits.us_aqi, lastUpdated: time },
              { parameter: 'PM10', value: currentAqi.pm10, unit: aqiUnits.pm10, lastUpdated: time },
              { parameter: 'PM2.5', value: currentAqi.pm2_5, unit: aqiUnits.pm2_5, lastUpdated: time }
            ],
            weather: {
              temperature: currentWeather.temperature_2m,
              unit: weatherUnits.temperature_2m,
              condition: this.getWeatherDescription(currentWeather.weather_code),
              code: currentWeather.weather_code
            }
          };
        } catch (error) {
          console.error(`Error fetching data for ${city.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(requests);
      return results.filter(r => r !== null);
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  private getWeatherDescription(code: number): string {
    const codes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog',
      51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
      61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    };
    return codes[code] || 'Variable weather';
  }
}
