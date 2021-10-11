import { TestBed } from '@angular/core/testing';

import { ActionsHistoryService } from './actions-history.service';

describe('ActionsHistoryService', () => {
  let service: ActionsHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
