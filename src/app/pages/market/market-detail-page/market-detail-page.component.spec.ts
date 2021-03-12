import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDetailPageComponent } from './market-detail-page.component';

describe('MarketDetailPageComponent', () => {
  let component: MarketDetailPageComponent;
  let fixture: ComponentFixture<MarketDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
