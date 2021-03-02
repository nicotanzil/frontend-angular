import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferGamesComponent } from './special-offer-games.component';

describe('SpecialOfferGamesComponent', () => {
  let component: SpecialOfferGamesComponent;
  let fixture: ComponentFixture<SpecialOfferGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialOfferGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
