import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'profilm-front';
}
