import { TestBed } from '@angular/core/testing';

import { UserPagesGuard } from './user-pages.guard';

describe('UserPagesGuard', () => {
  let guard: UserPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
