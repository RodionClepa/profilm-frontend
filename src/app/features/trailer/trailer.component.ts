import { Component, computed, input } from '@angular/core';
import { MovieVideo } from '../../shared/types/movie-details.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface TrailerVideo extends MovieVideo {
  youtubeUrl: SafeResourceUrl
}

@Component({
  selector: 'app-trailer',
  imports: [],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.scss',
})
export class TrailerComponent {
  videos = input<MovieVideo[]>([]);
  formattedVideos: TrailerVideo[] = [];
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.formattedVideos = this.videos().map((video) => ({
      ...video,
      youtubeUrl: this.getSafeUrl(video.link)
    }))
  }

  private getSafeUrl(link: string): SafeResourceUrl {
    console.log("getSafeUrl")
    const embedUrl = `https://www.youtube.com/embed/${link}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
