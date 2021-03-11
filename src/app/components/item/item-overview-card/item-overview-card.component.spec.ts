import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOverviewCardComponent } from './item-overview-card.component';

describe('ItemOverviewCardComponent', () => {
  let component: ItemOverviewCardComponent;
  let fixture: ComponentFixture<ItemOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOverviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
