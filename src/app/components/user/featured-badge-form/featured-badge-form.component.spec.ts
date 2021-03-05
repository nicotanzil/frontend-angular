import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBadgeFormComponent } from './featured-badge-form.component';

describe('FeaturedBadgeFormComponent', () => {
  let component: FeaturedBadgeFormComponent;
  let fixture: ComponentFixture<FeaturedBadgeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedBadgeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedBadgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
