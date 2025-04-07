import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperHorizontalFilmsComponent } from './swiper-horizontal-films.component';

describe('SwiperHorizontalFilmsComponent', () => {
  let component: SwiperHorizontalFilmsComponent;
  let fixture: ComponentFixture<SwiperHorizontalFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperHorizontalFilmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperHorizontalFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
