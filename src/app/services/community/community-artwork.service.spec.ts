import { TestBed } from '@angular/core/testing';

import { CommunityArtworkService } from './community-artwork.service';

describe('CommunityArtworkService', () => {
  let service: CommunityArtworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityArtworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
