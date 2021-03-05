import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBackgroundFormComponent } from './profile-background-form.component';

describe('ProfileBackgroundFormComponent', () => {
  let component: ProfileBackgroundFormComponent;
  let fixture: ComponentFixture<ProfileBackgroundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBackgroundFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBackgroundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
