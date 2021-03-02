import { TestBed } from '@angular/core/testing';

import { SuspensionRequestService } from './suspension-request.service';

describe('SuspensionRequestService', () => {
  let service: SuspensionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspensionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
