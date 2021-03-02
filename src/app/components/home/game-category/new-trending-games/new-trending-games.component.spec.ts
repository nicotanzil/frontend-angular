import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrendingGamesComponent } from './new-trending-games.component';

describe('NewTrendingGamesComponent', () => {
  let component: NewTrendingGamesComponent;
  let fixture: ComponentFixture<NewTrendingGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTrendingGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrendingGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
