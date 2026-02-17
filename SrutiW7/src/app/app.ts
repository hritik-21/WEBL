import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface Item {
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  itemForm: FormGroup;
  items = signal<Item[]>([]);

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  addItem() {
    if (this.itemForm.valid) {
      this.items.update(prev => [...prev, this.itemForm.value]);
      this.itemForm.reset();
    }
  }
}
