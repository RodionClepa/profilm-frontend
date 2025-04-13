import { Component, computed, input } from '@angular/core';
import { MovieVideo } from '../../shared/types/movie-details.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trailer',
  imports: [CommonModule],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.scss'
})
export class TrailerComponent {
  videos = input<MovieVideo[]>([]);
  formattedVideos = computed(() => {
    return this.videos().map((video) => ({
      ...video,
      link: this.getSafeUrl(video.link)
    }))
  })

  constructor(private sanitizer: DomSanitizer) { }

  private getSafeUrl(link: string): SafeResourceUrl {
    const embedUrl = `https://www.youtube.com/embed/${link}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
