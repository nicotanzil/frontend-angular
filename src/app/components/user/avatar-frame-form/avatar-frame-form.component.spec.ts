import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFrameFormComponent } from './avatar-frame-form.component';

describe('AvatarFrameFormComponent', () => {
  let component: AvatarFrameFormComponent;
  let fixture: ComponentFixture<AvatarFrameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarFrameFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarFrameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
