import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_TOKENS } from '../../shared/constants/routes-token.constants';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { MovieDetailsResponse } from '../../shared/types/movie-details.type';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { RatingBarComponent } from "../../shared/components/rating-bar/rating-bar.component";
import { FormatRuntimePipe } from "../../shared/pipes/format-runtime.pipe";
import { PlayerComponent } from "../player/player.component";
import { TrailerComponent, TrailerVideo } from "../trailer/trailer.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { CastComponent } from "../cast/cast.component";
import { ReviewsComponent } from "../reviews/reviews.component";
import { SwiperHorizontalCardsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-cards.component";
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';
import { Subscription } from 'rxjs';
import { EmptyContainerComponent } from "../../shared/components/empty-container/empty-container.component";
import { NO_IMAGE_PATH } from '../../shared/constants/general.constants';
import { CardMedia } from '../../shared/components/card-media/card-media.component';

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
  imports: [DatePipe, CommonModule, LoaderComponent, RatingBarComponent, FormatRuntimePipe, PlayerComponent, TrailerComponent, GalleryComponent, CastComponent, ReviewsComponent, SwiperHorizontalCardsComponent, EmptyContainerComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit, OnDestroy {

  movie: MovieDetailsResponse | null = null;
  private readonly openTabKey: string = "tab";
  openTab = signal<string | null>(null);
  validTabs = Object.values(TAB_TOKEN);
  readonly TAB_TOKEN = TAB_TOKEN;
  recommendations: CardMedia[] = [];
  cast: CardMedia[] = [];
  formattedVideos: TrailerVideo[] = [];

  private routeSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmMediaService,
    private filmMediaMapper: FilmMediaMapperService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id && /^\d+$/.test(id) && Number(id) > 0) {
        this.getMovieData(Number(id));

        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      } else {
        this.router.navigate(['/', ROUTES_TOKENS.NOT_FOUND]);
      }
    });
  }

  getMovieData(id: number) {
    this.filmService.movieDetails(id).subscribe({
      next: (response: MovieDetailsResponse) => {
        this.movie = response;
        const tab = this.route.snapshot.queryParams[this.openTabKey] as TabType | undefined;

        this.openTab.set(tab && this.validTabs.includes(tab) ? tab : null);

        this.recommendations = this.movie.recommendations.map((movie) => this.filmMediaMapper.movieToSwipperCard(movie));
        this.cast = this.movie.cast.map((cast) => ({
          id: cast.id,
          title: cast.name,
          subTitle: cast.character,
          posterPath: cast.profilePath ? cast.profilePath : NO_IMAGE_PATH,
          link: `/${ROUTES_TOKENS.PERSON}/${cast.id}`
        }));
        this.formattedVideos = this.filmMediaMapper.videoToTrailer(this.movie.videos);
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

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
