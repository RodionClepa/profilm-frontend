import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { DatePipe } from '@angular/common';

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

  scrollbarColor = input<string>("var(--red)");
  navigationColor = input<string>("var(--red)");
  filmList = input<SwiperCard[]>([]);

  skeletonCards = [1, 2, 3, 4, 5, 6];

  breakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
    480: { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
    768: { slidesPerView: 4, spaceBetween: 20, slidesPerGroup: 4 },
    1024: { slidesPerView: 6, spaceBetween: 20, slidesPerGroup: 6 },
  };
}
