import { CanDeactivateFn } from '@angular/router';

export const unfilledGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
