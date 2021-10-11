import { TestBed } from '@angular/core/testing';

import { CodesAuthService } from './codes-auth.service';

describe('CodesAuthService', () => {
  let service: CodesAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodesAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
