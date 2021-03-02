import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialGamesComponent } from './special-games.component';

describe('SpecialGamesComponent', () => {
  let component: SpecialGamesComponent;
  let fixture: ComponentFixture<SpecialGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
