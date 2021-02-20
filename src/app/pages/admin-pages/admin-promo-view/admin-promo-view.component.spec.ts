import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromoViewComponent } from './admin-promo-view.component';

describe('AdminPromoViewComponent', () => {
  let component: AdminPromoViewComponent;
  let fixture: ComponentFixture<AdminPromoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
