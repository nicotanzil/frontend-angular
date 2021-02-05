import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameViewComponent } from './admin-game-view.component';

describe('AdminGameViewComponent', () => {
  let component: AdminGameViewComponent;
  let fixture: ComponentFixture<AdminGameViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGameViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
