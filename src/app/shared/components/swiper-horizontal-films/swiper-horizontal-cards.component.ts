import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface SwiperCard {
  id: number;
  title: string;
  subTitle: string;
  posterPath: string;
  link: string;
}

@Component({
  selector: 'app-swiper-horizontal-cards',
  imports: [RouterLink],
  templateUrl: './swiper-horizontal-cards.component.html',
  styleUrl: './swiper-horizontal-cards.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperHorizontalCardsComponent {

  scrollbarColor = input<string>("var(--red)");
  navigationColor = input<string>("var(--red)");
  cardList = input<SwiperCard[]>([]);

  skeletonCards = [1, 2, 3, 4, 5, 6];

  breakpoints = {
    320: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
    480: { slidesPerView: 3, spaceBetween: 16, slidesPerGroup: 3 },
    768: { slidesPerView: 4, spaceBetween: 16, slidesPerGroup: 4 },
    1024: { slidesPerView: 6, spaceBetween: 16, slidesPerGroup: 6 },
  };

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400'; // Replace with your fallback image path
  }
}
