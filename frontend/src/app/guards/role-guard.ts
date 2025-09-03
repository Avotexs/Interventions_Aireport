import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export function roleGuard(allowed: ('admin'|'technicien')[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const role = auth.role();
    if (!role || !allowed.includes(role)) {
      // redirige vers page adaptée
      router.navigateByUrl(role === 'technicien' ? '/technicien-home' : '/');
      return false;
    }
    return true;
  };
}