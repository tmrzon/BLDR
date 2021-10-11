import { TestBed } from '@angular/core/testing';

import { CompressFileService } from './compress-file.service';

describe('CompressFileService', () => {
  let service: CompressFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompressFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
