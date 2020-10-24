import { TestBed } from '@angular/core/testing';

import { NologinGuard } from './nologin.guard';

describe('NologinGuard', () => {
  let guard: NologinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NologinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
