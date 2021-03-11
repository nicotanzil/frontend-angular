import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTransactionGraphComponent } from './item-transaction-graph.component';

describe('ItemTransactionGraphComponent', () => {
  let component: ItemTransactionGraphComponent;
  let fixture: ComponentFixture<ItemTransactionGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTransactionGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTransactionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
