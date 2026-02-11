import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiList } from './aqi-list';

describe('AqiList', () => {
  let component: AqiList;
  let fixture: ComponentFixture<AqiList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AqiList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AqiList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
