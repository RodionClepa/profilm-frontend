import { TestBed } from '@angular/core/testing';

import { FilmMediaService } from './film-media.service';

describe('FilmMediaService', () => {
  let service: FilmMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
