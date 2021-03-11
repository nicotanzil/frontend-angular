import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageCardComponent } from './item-image-card.component';

describe('ItemImageCardComponent', () => {
  let component: ItemImageCardComponent;
  let fixture: ComponentFixture<ItemImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemImageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
