import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirDatesComponent } from './air-dates.component';

describe('AirDatesComponent', () => {
  let component: AirDatesComponent;
  let fixture: ComponentFixture<AirDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
