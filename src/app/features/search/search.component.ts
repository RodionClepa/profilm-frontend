import { Component, computed, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_TOKENS } from '../../shared/constants/routes-token.constants';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { posterSize } from '../../shared/constants/image-sizes.constants';
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';
import { SearchMediaResultsComponent } from "./search-media-results/search-media-results.component";
import { SearchMediaResults } from '../../shared/types/media.type';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../shared/services/scroll-service/scroll.service';

export enum SearchMediaType {
  MOVIE = "movie",
  TV = "tv"
}

@Component({
  selector: 'app-search',
  imports: [FormsModule, SearchMediaResultsComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchInput: string = "";
  page = signal<number>(1);
  typeMedia: SearchMediaType = SearchMediaType.MOVIE;
  searchMediaType = SearchMediaType;
  results: SearchMediaResults | null = null;
  pageNumbers = computed(() => [
    this.page() - 2,
    this.page() - 1,
    this.page(),
    this.page() + 1,
    this.page() + 2,
  ]);

  private queryParamSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private filmMediaService: FilmMediaService, private filmMediaMapper: FilmMediaMapperService, @Inject(PLATFORM_ID) private platformId: Object, private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.queryParamSubscription = this.route.queryParams.subscribe(params => {
      const searchQuery = params[PARAM_TOKENS.SEARCH_FILM];
      const searchType = params[PARAM_TOKENS.SEARCH_TYPE];
      const pageParam = params[PARAM_TOKENS.PAGE];

      if (searchQuery !== undefined && searchQuery !== this.searchInput) {
        this.searchInput = searchQuery;
      }

      if ((searchType === SearchMediaType.MOVIE || searchType === SearchMediaType.TV)
        && searchType !== this.typeMedia) {
        this.typeMedia = searchType as SearchMediaType;
      }

      const parsedPage = this.parsePageParam(pageParam);
      if (parsedPage !== this.page()) {
        this.page.set(parsedPage);
      }

      if (this.searchInput) {
        this.getMedia(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }

  private parsePageParam(pageParam: string | null | undefined): number {
    if (!pageParam) {
      return 1;
    }

    const parsed = parseInt(pageParam, 10);
    if (isNaN(parsed) || parsed < 1) {
      return 1;
    }

    const maxPage = 500;
    if (parsed > maxPage) {
      return maxPage;
    }

    return parsed;
  }

  async getMedia(updateQueryParams: boolean = true) {
    this.filmMediaService.searchMedia(this.typeMedia, {
      page: this.page(),
      includeAdult: false,
      imageSize: posterSize.Large,
      searchName: this.searchInput
    }).subscribe({
      next: (results) => {
        this.results = results;
      }
    });

    if (updateQueryParams) {
      this.updateQuery();
    }
  }

  searchMedia() {
    if (this.searchInput.length === 0) return;
    this.page.set(1);
    this.getMedia();
    this.scrollService.scrollToTop();
  }

  selectMediaType(inputType: SearchMediaType) {
    if (inputType === this.typeMedia) return;
    this.typeMedia = inputType;
    this.page.set(1);
    this.getMedia();
  }

  goToPage(pageNumber: number) {
    if (pageNumber < 1 || (this.results && pageNumber > this.results.totalPages)) {
      return;
    }
    this.page.set(pageNumber);
    this.getMedia();
    this.scrollService.scrollToTop();
  }

  private updateQuery() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        [PARAM_TOKENS.SEARCH_FILM]: this.searchInput,
        [PARAM_TOKENS.SEARCH_TYPE]: this.typeMedia,
        [PARAM_TOKENS.PAGE]: this.page(),
      },
      queryParamsHandling: 'merge'
    });
  }
}