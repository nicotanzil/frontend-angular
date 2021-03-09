import { TestBed } from '@angular/core/testing';

import { GameDiscussionService } from './game-discussion.service';

describe('GameDiscussionService', () => {
  let service: GameDiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
