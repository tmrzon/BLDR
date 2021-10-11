import { TestBed } from '@angular/core/testing';

import { GeneralActionsService } from './general-actions.service';

describe('GeneralActionsService', () => {
  let service: GeneralActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
