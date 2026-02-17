import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Discovery {
  name: string;
  sector: string;
  discoveryDate: string;
  coordinates: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  discoveryForm: FormGroup;
  discoveries = signal<Discovery[]>([]);
  sectors = ['Alpha-7', 'Nebula-9', 'Void-X', 'Xenon-Prime'];

  constructor(private fb: FormBuilder) {
    this.discoveryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sector: ['', [Validators.required]],
      discoveryDate: [new Date().toISOString().split('T')[0], [Validators.required]],
      coordinates: ['', [Validators.required, Validators.pattern(/^[0-9.-]+, [0-9.-]+$/)]]
    });
  }

  registerDiscovery() {
    if (this.discoveryForm.valid) {
      this.discoveries.update(prev => [this.discoveryForm.value, ...prev]);
      this.discoveryForm.reset({
        discoveryDate: new Date().toISOString().split('T')[0],
        sector: ''
      });
    }
  }
}
