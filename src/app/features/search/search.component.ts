import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAM_TOKENS } from '../../shared/constants/routes-token.constants';
import { FilmMediaService } from '../../shared/services/film-media/film-media.service';
import { posterSize } from '../../shared/constants/image-sizes.constants';
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';
import { SearchMediaResultsComponent } from "./search-media-results/search-media-results.component";
import { SearchMediaResults } from '../../shared/types/media.type';
import { CommonModule } from '@angular/common';

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
export class SearchComponent implements OnInit {
  searchInput: string = "";
  page: number = 1;
  typeMedia: SearchMediaType = SearchMediaType.MOVIE;
  searchMediaType = SearchMediaType;
  results: SearchMediaResults | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private filmMediaService: FilmMediaService, private filmMediaMapper: FilmMediaMapperService) { }

  ngOnInit(): void {
    this.searchInput = this.route.snapshot.queryParams[PARAM_TOKENS.SEARCH_FILM] ?? "";
    const searchType = this.route.snapshot.queryParams[PARAM_TOKENS.SEARCH_TYPE];

    if (searchType === SearchMediaType.MOVIE || searchType === SearchMediaType.TV) {
      this.typeMedia = searchType as SearchMediaType;
    }

    this.getMedia();
  }

  async getMedia() {
    this.filmMediaService.searchMedia(this.typeMedia, {
      page: this.page,
      includeAdult: false,
      imageSize: posterSize.Large,
      searchName: this.searchInput
    }).subscribe({
      next: (results) => {
        this.results = results;
      }
    });
    this.updateQuery();
  }

  selectMediaType(inputType: SearchMediaType) {
    if (inputType === this.typeMedia) return;
    this.typeMedia = inputType;
    this.getMedia();
  }

  private updateQuery() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        [PARAM_TOKENS.SEARCH_FILM]: this.searchInput,
        [PARAM_TOKENS.SEARCH_TYPE]: this.typeMedia
      },
      queryParamsHandling: 'merge'
    });
  }
}
