import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellerGamesComponent } from './top-seller-games.component';

describe('TopSellerGamesComponent', () => {
  let component: TopSellerGamesComponent;
  let fixture: ComponentFixture<TopSellerGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSellerGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSellerGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
