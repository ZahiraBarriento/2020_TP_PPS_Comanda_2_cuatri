import { TestBed } from '@angular/core/testing';

import { FuctionsService } from './fuctions.service';

describe('FuctionsService', () => {
  let service: FuctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
