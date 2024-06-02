import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { permisosGuard } from './permisos.guard';

describe('permisosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => permisosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
