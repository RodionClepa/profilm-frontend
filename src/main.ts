import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import('swiper/element/bundle').then(module => {
  module.register();
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
