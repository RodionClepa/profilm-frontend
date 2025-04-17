import { Component, computed, input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoResponse } from '../../shared/types/video.type';
import { SlicePipe } from '@angular/common';

interface TrailerVideo extends VideoResponse {
  youtubeUrl: SafeResourceUrl
}

@Component({
  selector: 'app-trailer',
  imports: [SlicePipe],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.scss',
})
export class TrailerComponent implements OnInit {
  videos = input<VideoResponse[]>([]);
  formattedVideos: TrailerVideo[] = [];
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.formattedVideos = this.videos().map((video) => ({
      ...video,
      youtubeUrl: this.getSafeUrl(video.link)
    }))
  }

  private getSafeUrl(link: string): SafeResourceUrl {
    const embedUrl = `https://www.youtube.com/embed/${link}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
