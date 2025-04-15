import { Component, input, OnInit } from '@angular/core';
import { TVSeasonDetails } from '../../shared/types/tv-details.type';
import { CommonModule } from '@angular/common';
import { FilmMediaMapperService } from '../../shared/mappers/film-media/film-media-mapper.service';

export interface AirDateSeasonEpisode {
  airDate: Date;
  episodeNumber: number;
  id: number;
  name: string;
  runtime: number;
  released: boolean;
}

export interface AirDateSeason {
  id: string;
  seasonNumber: number;
  airDate: Date;
  episodes: AirDateSeasonEpisode[];
}

interface AirDatePage {
  [seasonId: string]: {
    page: number;
    startIndex: number;
    endIndex: number;
    episodes: AirDateSeasonEpisode[];
    totalPages: number;
  }
}

@Component({
  selector: 'app-air-dates',
  imports: [CommonModule],
  templateUrl: './air-dates.component.html',
  styleUrl: './air-dates.component.scss'
})
export class AirDatesComponent implements OnInit {
  airDates = input<TVSeasonDetails[]>([]);

  readonly episodesPerPage = 10;
  currentPages: AirDatePage = {};

  sortedAirDates: AirDateSeason[] = [];
  activeSeason: AirDateSeason | null = null;
  today = new Date();

  constructor(private filmMapper: FilmMediaMapperService) { }

  ngOnInit(): void {
    this.sortedAirDates = this.airDates()
      .map(this.filmMapper.tvSeasonToAirDate)
      .sort((a, b) => new Date(b.airDate).getTime() - new Date(a.airDate).getTime());

    this.sortedAirDates.forEach(season => {
      this.currentPages[season.id] = {
        page: 1,
        startIndex: 0,
        endIndex: this.episodesPerPage,
        episodes: season.episodes.slice(0, this.episodesPerPage),
        totalPages: Math.ceil(season.episodes.length / this.episodesPerPage)
      }
    });
    if (this.sortedAirDates.length > 0) this.activeSeason = this.sortedAirDates[0]
  }

  setActiveSeason(season: AirDateSeason): void {
    this.activeSeason = season;
  }

  getDisplayedEpisodes(season: AirDateSeason) {
    const currentPage = this.currentPages[season.id] || 1;
    const startIndex = (currentPage.page - 1) * this.episodesPerPage;
    const endIndex = startIndex + this.episodesPerPage;

    this.currentPages[season.id] = {
      ...this.currentPages[season.id],
      startIndex: startIndex,
      endIndex: endIndex,
      episodes: season.episodes.slice(startIndex, endIndex)
    }

  }

  goToNextPage(seasonId: string): void {
    const season = this.sortedAirDates.find(s => s.id === seasonId);
    if (!season) return;

    const totalPages = Math.ceil(season.episodes.length / this.episodesPerPage);
    if (this.currentPages[seasonId].page < totalPages) {
      this.currentPages[seasonId].page++;
    }
    this.getDisplayedEpisodes(season);
  }

  goToPreviousPage(seasonId: string): void {
    const season = this.sortedAirDates.find(s => s.id === seasonId);
    if (!season) return;

    const totalPages = Math.ceil(season.episodes.length / this.episodesPerPage);
    if (this.currentPages[seasonId].page > 1) {
      this.currentPages[seasonId].page--;
    }
    this.getDisplayedEpisodes(season);
  }
}
