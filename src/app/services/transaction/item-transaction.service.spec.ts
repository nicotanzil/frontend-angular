import { TestBed } from '@angular/core/testing';

import { ItemTransactionService } from './item-transaction.service';

describe('ItemTransactionService', () => {
  let service: ItemTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
