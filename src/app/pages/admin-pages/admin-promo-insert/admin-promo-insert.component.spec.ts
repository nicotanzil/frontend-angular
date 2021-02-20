import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromoInsertComponent } from './admin-promo-insert.component';

describe('AdminPromoInsertComponent', () => {
  let component: AdminPromoInsertComponent;
  let fixture: ComponentFixture<AdminPromoInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromoInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
