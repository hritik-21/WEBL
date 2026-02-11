import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngFor and *ngIf
import { AqiService } from '../aqi';

@Component({
  selector: 'app-aqi-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aqi-list.html',
  styleUrls: ['./aqi-list.css']
})
export class AqiListComponent implements OnInit {
  aqiData: any[] = [];
  loading = true;

  constructor(private aqiService: AqiService) { }

  async ngOnInit() {
    this.aqiData = await this.aqiService.getData();
    this.loading = false;
  }
}
