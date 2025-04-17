import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-container',
  imports: [],
  templateUrl: './empty-container.component.html',
  styleUrl: './empty-container.component.scss'
})
export class EmptyContainerComponent {
  title = input<string>("No available data");
}
