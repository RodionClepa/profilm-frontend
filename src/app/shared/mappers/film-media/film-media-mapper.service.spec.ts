import { TestBed } from '@angular/core/testing';

import { FilmMediaMapperService } from './film-media-mapper.service';

describe('FilmMediaMapperService', () => {
  let service: FilmMediaMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmMediaMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
