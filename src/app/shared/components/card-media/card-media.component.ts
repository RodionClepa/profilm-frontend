import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CardMedia {
  id: number;
  title: string;
  subTitle: string;
  posterPath: string;
  link: string;
}

@Component({
  selector: 'app-card-media',
  imports: [RouterLink],
  templateUrl: './card-media.component.html',
  styleUrl: './card-media.component.scss'
})
export class CardMediaComponent {
  card = input.required<CardMedia>();

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400';
  }
}
