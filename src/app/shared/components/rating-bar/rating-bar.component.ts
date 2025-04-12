import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rating-bar',
  imports: [],
  templateUrl: './rating-bar.component.html',
  styleUrl: './rating-bar.component.scss'
})
export class RatingBarComponent {
  rating = input<number>(0);
}
