import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Movie } from '../../types/MovieTv.type';
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
  filmList = input<SwiperCard[]>([]);
}
