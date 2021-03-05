import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniProfileFormComponent } from './mini-profile-form.component';

describe('MiniProfileFormComponent', () => {
  let component: MiniProfileFormComponent;
  let fixture: ComponentFixture<MiniProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
