import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionRequestComponent } from './suspension-request.component';

describe('SuspensionRequestComponent', () => {
  let component: SuspensionRequestComponent;
  let fixture: ComponentFixture<SuspensionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspensionRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
