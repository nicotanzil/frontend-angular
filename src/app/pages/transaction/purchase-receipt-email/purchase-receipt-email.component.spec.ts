import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReceiptEmailComponent } from './purchase-receipt-email.component';

describe('PurchaseReceiptEmailComponent', () => {
  let component: PurchaseReceiptEmailComponent;
  let fixture: ComponentFixture<PurchaseReceiptEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReceiptEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReceiptEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
