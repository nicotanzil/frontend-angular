import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromoUpdateComponent } from './admin-promo-update.component';

describe('AdminPromoUpdateComponent', () => {
  let component: AdminPromoUpdateComponent;
  let fixture: ComponentFixture<AdminPromoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
