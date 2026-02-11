import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherListComponent } from './weather-list/weather-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WeatherListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'HritikW6';
}
