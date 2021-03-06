import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWishlistComponent } from './game-wishlist.component';

describe('GameWishlistComponent', () => {
  let component: GameWishlistComponent;
  let fixture: ComponentFixture<GameWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameWishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
