import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionDetailPageComponent } from './discussion-detail-page.component';

describe('DiscussionDetailPageComponent', () => {
  let component: DiscussionDetailPageComponent;
  let fixture: ComponentFixture<DiscussionDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
