import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsShopCardComponent } from './points-shop-card.component';

describe('PointsShopCardComponent', () => {
  let component: PointsShopCardComponent;
  let fixture: ComponentFixture<PointsShopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsShopCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsShopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
