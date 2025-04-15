import { Component, Input, input, OnInit } from '@angular/core';
import { MovieReview } from '../../shared/types/movie-details.type';

interface ReviewFormat extends MovieReview {
  stars: number[];
}

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  reviews = input<MovieReview[]>([]);
  formattedReviews: ReviewFormat[] = [];

  ngOnInit() {
    this.formattedReviews = this.reviews().map((review) => ({
      ...review,
      stars: review.rating ? this.generateStarArray(review.rating) : []
    }))
  }

  private generateStarArray(rating: number): number[] {
    console.log("generateStarArray")
    const stars: number[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }

    if (hasHalfStar) {
      stars.push(0.5);
    }

    const emptyStars = 10 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(0);
    }

    return stars;
  }
}
