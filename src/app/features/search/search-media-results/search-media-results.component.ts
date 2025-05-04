import { Component, input } from '@angular/core';
import { CardMedia, CardMediaComponent } from '../../../shared/components/card-media/card-media.component';

@Component({
  selector: 'app-search-media-results',
  imports: [CardMediaComponent],
  templateUrl: './search-media-results.component.html',
  styleUrl: './search-media-results.component.scss'
})
export class SearchMediaResultsComponent {
  cardList = input<CardMedia[]>([]);
}
