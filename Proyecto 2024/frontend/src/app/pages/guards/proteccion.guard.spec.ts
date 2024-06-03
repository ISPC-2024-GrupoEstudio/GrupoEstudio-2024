import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { proteccionGuard } from './proteccion.guard';

describe('proteccionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => proteccionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
