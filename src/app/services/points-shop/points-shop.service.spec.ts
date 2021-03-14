import { TestBed } from '@angular/core/testing';

import { PointsShopService } from './points-shop.service';

describe('PointsShopService', () => {
  let service: PointsShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
