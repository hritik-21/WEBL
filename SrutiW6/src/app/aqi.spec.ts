import { TestBed } from '@angular/core/testing';

import { Aqi } from './aqi';

describe('Aqi', () => {
  let service: Aqi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aqi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
