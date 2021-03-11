import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReviewGameComponent } from './top-review-game.component';

describe('TopReviewGameComponent', () => {
  let component: TopReviewGameComponent;
  let fixture: ComponentFixture<TopReviewGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopReviewGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopReviewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
