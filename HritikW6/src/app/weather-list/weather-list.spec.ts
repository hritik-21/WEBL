import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherList } from './weather-list';

describe('WeatherList', () => {
  let component: WeatherList;
  let fixture: ComponentFixture<WeatherList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
