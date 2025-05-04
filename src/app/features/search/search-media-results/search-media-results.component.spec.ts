import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMediaResultsComponent } from './search-media-results.component';

describe('SearchMediaResultsComponent', () => {
  let component: SearchMediaResultsComponent;
  let fixture: ComponentFixture<SearchMediaResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMediaResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMediaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
