import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperHorizontalCardsComponent } from './swiper-horizontal-cards.component';

describe('SwiperHorizontalFilmsComponent', () => {
  let component: SwiperHorizontalCardsComponent;
  let fixture: ComponentFixture<SwiperHorizontalCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperHorizontalCardsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SwiperHorizontalCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
