import { TestBed } from '@angular/core/testing';

import { CommunityGameReviewService } from './community-game-review.service';

describe('CommunityGameReviewService', () => {
  let service: CommunityGameReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityGameReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
