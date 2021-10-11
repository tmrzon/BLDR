import { TestBed } from '@angular/core/testing';

import { CodesGuard } from './codes.guard';

describe('CodesGuard', () => {
  let guard: CodesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CodesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
