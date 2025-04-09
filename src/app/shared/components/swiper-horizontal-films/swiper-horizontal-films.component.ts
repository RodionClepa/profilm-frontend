import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, PLATFORM_ID } from '@angular/core';
import { DatePipe, DOCUMENT, isPlatformServer } from '@angular/common';

export interface SwiperCard {
  id: number;
  title: string;
  subTitle: string;
  posterPath: string;
}

@Component({
  selector: 'app-swiper-horizontal-films',
  imports: [DatePipe],
  templateUrl: './swiper-horizontal-films.component.html',
  styleUrl: './swiper-horizontal-films.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperHorizontalFilmsComponent {
  filmList = input<SwiperCard[]>([]);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  breakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
    480: { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
    768: { slidesPerView: 4, spaceBetween: 20, slidesPerGroup: 4 },
    1024: { slidesPerView: 6, spaceBetween: 20, slidesPerGroup: 6 },
  };
}
