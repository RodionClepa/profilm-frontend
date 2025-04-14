import { Component, input, OnInit } from '@angular/core';
import { MovieCast } from '../../shared/types/movie-details.type';
import { CommonModule } from '@angular/common';
import { SwiperCard, SwiperHorizontalCardsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-cards.component";
import { NO_IMAGE_PATH } from '../../shared/constants/general.constants';
import { ROUTES_TOKENS } from '../../shared/constants/routes-token.constants';

@Component({
  selector: 'app-cast',
  imports: [CommonModule, SwiperHorizontalCardsComponent],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.scss'
})
export class CastComponent implements OnInit {
  cast = input<MovieCast[]>([]);
  swiperCards: SwiperCard[] = [];

  ngOnInit() {
    this.swiperCards = this.cast().map((cast) => ({
      id: cast.id,
      title: cast.name,
      subTitle: cast.character,
      posterPath: cast.profilePath ? cast.profilePath : NO_IMAGE_PATH,
      link: `/${ROUTES_TOKENS.PERSON}/${cast.id}`
    }))
  }
}
