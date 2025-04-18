import { AfterViewInit, Component, effect, ElementRef, Inject, input, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImageResponse } from '../../shared/types/image.type';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements AfterViewInit {
  images = input<ImageResponse[]>([]);
  @ViewChild('thumbnailsContainer') thumbnailsContainer!: ElementRef;

  selectedImage: ImageResponse | null = null;
  currentIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      if (this.images && this.images().length > 0) {
        this.selectedImage = this.images()[0];
      }
    })
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId))
      setTimeout(() => {
        this.scrollToThumbnail(this.currentIndex);
      }, 100);
  }

  selectImage(image: ImageResponse, index: number) {
    this.selectedImage = image;
    this.currentIndex = index;
    this.scrollToThumbnail(index);
  }

  nextImage() {
    if (this.images().length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images().length;
      this.selectedImage = this.images()[this.currentIndex];
      this.scrollToThumbnail(this.currentIndex);
    }
  }

  prevImage() {
    if (this.images().length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.images().length) % this.images().length;
      this.selectedImage = this.images()[this.currentIndex];
      this.scrollToThumbnail(this.currentIndex);
    }
  }

  scrollToThumbnail(index: number) {
    if (this.thumbnailsContainer && this.thumbnailsContainer.nativeElement) {
      const thumbnails = this.thumbnailsContainer.nativeElement.querySelectorAll('.thumbnail-container');
      if (index >= 0 && index < thumbnails.length) {
        const thumbnail = thumbnails[index];
        if (thumbnail) {
          thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }
  }
}
