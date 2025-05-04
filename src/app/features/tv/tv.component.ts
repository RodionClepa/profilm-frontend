import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TVDetailsResponse } from '../../shared/types/tv-details.type';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { ROUTES_TOKENS } from '../../shared/constants/routes-token.constants';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RatingBarComponent } from "../../shared/components/rating-bar/rating-bar.component";
import { PlayerComponent } from "../player/player.component";
import { TrailerComponent, TrailerVideo } from "../trailer/trailer.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { CastComponent } from "../cast/cast.component";
import { ReviewsComponent } from "../reviews/reviews.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { SwiperHorizontalCardsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-cards.component";
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';
import { AirDatesComponent } from "../air-dates/air-dates.component";
import { Subscription } from 'rxjs';
import { NO_IMAGE_PATH } from '../../shared/constants/general.constants';
import { CardMedia } from '../../shared/components/card-media/card-media.component';

const TAB_TOKEN = {
  WATCH: 'watch',
  EXTRAS: 'extras',
  TRAILER: 'trailer',
  CAST: 'cast',
  AIR_DATES: 'airDates',
  REVIEW: 'review'
} as const;

type TabType = typeof TAB_TOKEN[keyof typeof TAB_TOKEN];

@Component({
  selector: 'app-tv',
  imports: [CommonModule, RatingBarComponent, PlayerComponent, TrailerComponent, GalleryComponent, CastComponent, ReviewsComponent, LoaderComponent, SwiperHorizontalCardsComponent, AirDatesComponent],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss'
})
export class TvComponent implements OnInit, OnDestroy {
  tv: TVDetailsResponse | null = null;
  private readonly openTabKey: string = "tab";
  openTab = signal<string | null>(null);
  validTabs = Object.values(TAB_TOKEN);
  readonly TAB_TOKEN = TAB_TOKEN;
  recommendations: CardMedia[] = [];
  cast: CardMedia[] = [];
  formattedVideos: TrailerVideo[] = [];

  private routeSub: Subscription | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private filmService: FilmMediaService, private filmMediaMapper: FilmMediaMapperService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id && /^\d+$/.test(id) && Number(id) > 0) {
        this.getTVData(Number(id));

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

  getTVData(id: number) {
    this.filmService.tvDetails(id).subscribe({
      next: (response: TVDetailsResponse) => {
        this.tv = response;
        const tab = this.route.snapshot.queryParams[this.openTabKey] as TabType | undefined;

        this.openTab.set(tab && this.validTabs.includes(tab) ? tab : null);

        this.recommendations = this.tv.recommendations.map((tv) => this.filmMediaMapper.tvToSwipperCard(tv));
        this.cast = this.tv.cast.map((cast) => ({
          id: cast.id,
          title: cast.name,
          subTitle: cast.character,
          posterPath: cast.profilePath ? cast.profilePath : NO_IMAGE_PATH,
          link: `/${ROUTES_TOKENS.PERSON}/${cast.id}`
        }));
        this.formattedVideos = this.filmMediaMapper.videoToTrailer(this.tv.videos);
      },
      error: (error) => {
        console.error('Failed to fetch tv:', error);
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
