import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameInsertComponent } from './admin-game-insert.component';

describe('AdminGameInsertComponent', () => {
  let component: AdminGameInsertComponent;
  let fixture: ComponentFixture<AdminGameInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGameInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGameInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
