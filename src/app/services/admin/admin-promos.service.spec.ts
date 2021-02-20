import { TestBed } from '@angular/core/testing';

import { AdminPromosService } from './admin-promos.service';

describe('AdminPromosService', () => {
  let service: AdminPromosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPromosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
