import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellerGameComponent } from './top-seller-game.component';

describe('TopSellerGameComponent', () => {
  let component: TopSellerGameComponent;
  let fixture: ComponentFixture<TopSellerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSellerGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSellerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
