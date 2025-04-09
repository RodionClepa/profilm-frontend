import { CommonModule, DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PromoCard {
  id: number;
  title: string;
  posterPath: string;
  overview: string;
  releaseDate: Date;
}

@Component({
  selector: 'app-promo-slider',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './promo-slider.component.html',
  styleUrl: './promo-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromoSliderComponent {
  filmList = input<PromoCard[]>([]);
}
