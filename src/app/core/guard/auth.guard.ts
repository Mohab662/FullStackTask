import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  const _Router = inject(Router);
  if (localStorage.getItem('etoken') !== null) {
    return true;
  }
  _Router.navigate(['/login']);
  return false;
};
