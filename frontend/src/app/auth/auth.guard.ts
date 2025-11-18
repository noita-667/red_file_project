import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const ok = localStorage.getItem('isAuthenticated') === 'true';
    if (ok) return true;
  }
  router.navigate(['/auth']);
  return false;
};
