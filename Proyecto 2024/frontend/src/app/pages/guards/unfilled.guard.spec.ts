import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { unfilledGuard } from './unfilled.guard';

describe('unfilledGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unfilledGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
