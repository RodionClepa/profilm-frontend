import { Component, input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { VideoResponse } from '../../shared/types/video.type';
import { SlicePipe } from '@angular/common';

export interface TrailerVideo extends VideoResponse {
  youtubeUrl: SafeResourceUrl
}

@Component({
  selector: 'app-trailer',
  imports: [SlicePipe],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.scss',
})
export class TrailerComponent {
  trailers = input<TrailerVideo[]>([]);
}
