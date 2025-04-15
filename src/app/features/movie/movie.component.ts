import { Component, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_TOKENS } from '../../shared/constants/routes-token.constants';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { MovieDetailsResponse } from '../../shared/types/movie-details.type';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { RatingBarComponent } from "../../shared/components/rating-bar/rating-bar.component";
import { FormatRuntimePipe } from "../../shared/pipes/format-runtime.pipe";
import { PlayerComponent } from "../player/player.component";
import { TrailerComponent } from "../trailer/trailer.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { CastComponent } from "../cast/cast.component";
import { ReviewsComponent } from "../reviews/reviews.component";
import { SwiperCard, SwiperHorizontalCardsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-cards.component";
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';

const TAB_TOKEN = {
  WATCH: 'watch',
  EXTRAS: 'extras',
  TRAILER: 'trailer',
  CAST: 'cast',
  REVIEW: 'review',
} as const;

type TabType = typeof TAB_TOKEN[keyof typeof TAB_TOKEN];

@Component({
  selector: 'app-movie',
  imports: [DatePipe, CommonModule, LoaderComponent, RatingBarComponent, FormatRuntimePipe, PlayerComponent, TrailerComponent, GalleryComponent, CastComponent, ReviewsComponent, SwiperHorizontalCardsComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit {

  movie: MovieDetailsResponse | null = null;
  private readonly openTabKey: string = "tab";
  openTab = signal<string | null>(null);
  validTabs = Object.values(TAB_TOKEN);
  readonly TAB_TOKEN = TAB_TOKEN;
  recommendations: SwiperCard[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmMediaService,
    private filmMediaMapper: FilmMediaMapperService
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit")
    const id = this.route.snapshot.paramMap.get('id');
    if (id && /^\d+$/.test(id) && Number(id) > 0) {
      this.getMovieData(Number(id));
    } else {
      this.router.navigate(['/', ROUTES_TOKENS.NOT_FOUND]);
    }
  }

  getMovieData(id: number) {
    console.log("getMovieData")
    this.filmService.movieDetails(id).subscribe({
      next: (response: MovieDetailsResponse) => {
        this.movie = response;
        const tab = this.route.snapshot.queryParams[this.openTabKey] as TabType | undefined;
        this.openTab.set(tab && this.validTabs.includes(tab) ? tab : null);
        this.recommendations = this.movie.recommendations.map((movie) => this.filmMediaMapper.movieToSwipperCard(movie));
      },
      error: (error) => {
        console.error('Failed to fetch movie:', error);
        this.router.navigate(['/', ROUTES_TOKENS.NOT_FOUND]);
      },
    });
  }

  setActiveTab(tab: TabType) {
    if (this.validTabs.includes(tab)) {
      this.openTab.set(tab);
      this.router.navigate([], {
        queryParams: { [this.openTabKey]: tab },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }
  }
}
