import { TestBed } from '@angular/core/testing';

import { AdminUserReportsService } from './admin-user-reports.service';

describe('AdminUserReportsService', () => {
  let service: AdminUserReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
