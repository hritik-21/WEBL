import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { WeatherService } from '../weather';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-list.html',
  styleUrls: ['./weather-list.css']
})
export class WeatherListComponent implements OnInit {
  weatherData: any[] = [];
  loading = true;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) { }

  async ngOnInit() {
    try {
      this.weatherData = await this.weatherService.getWeather();
      if (this.weatherData.length === 0) {
        this.errorMessage = 'No weather data found. Please check your internet connection or try again later.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to load weather data. ' + (error instanceof Error ? error.message : String(error));
    } finally {
      this.loading = false;
    }
  }
}
