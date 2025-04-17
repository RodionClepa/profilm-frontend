import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperCard, SwiperHorizontalCardsComponent } from "../../shared/components/swiper-horizontal-films/swiper-horizontal-cards.component";

@Component({
  selector: 'app-cast',
  imports: [CommonModule, SwiperHorizontalCardsComponent],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.scss'
})
export class CastComponent {
  cast = input<SwiperCard[]>([]);
}
