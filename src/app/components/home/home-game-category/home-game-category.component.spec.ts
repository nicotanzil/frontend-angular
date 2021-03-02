import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGameCategoryComponent } from './home-game-category.component';

describe('HomeGameCategoryComponent', () => {
  let component: HomeGameCategoryComponent;
  let fixture: ComponentFixture<HomeGameCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGameCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGameCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
