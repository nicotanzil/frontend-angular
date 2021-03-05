import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniProfileCardComponent } from './mini-profile-card.component';

describe('MiniProfileCardComponent', () => {
  let component: MiniProfileCardComponent;
  let fixture: ComponentFixture<MiniProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniProfileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
