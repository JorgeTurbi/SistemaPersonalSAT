// auth-guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../Auth/Services/auth-service';
import { catchError, map, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const auth = inject(AuthService);

  // 👇 Mira en la ruta actual y en los padres
  const isPublic =
    route.data?.['public'] === true ||
    route.pathFromRoot.some(r => r.data?.['public'] === true);

  const allowedRoles = (route.data?.['roles'] as string[] | undefined) ?? [];

  // Ruta pública o sin roles -> permitir
  if (isPublic || allowedRoles.length === 0) return of(true);

  // Validar sesión
  return auth.ping().pipe(
    switchMap(isAlive => {
      if (!isAlive) {
        messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese a la aplicación' });
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      }

      const snap = auth.currentSession;
      if (snap?.role && allowedRoles.includes(snap.role)) return of(true);

      return auth.getProfile().pipe(
        map(profileRes => {
          const role = profileRes?.data?.role;
          if (role && allowedRoles.includes(role)) return true;

          messageService.add({ severity: 'error', summary: 'Acceso Denegado', detail: 'No tiene permisos para acceder' });
          router.navigate(['/']);
          return false;
        }),
        catchError(() => {
          messageService.add({ severity: 'error', summary: 'Acceso Denegado', detail: 'No tiene permisos para acceder' });
          router.navigate(['/']);
          return of(false);
        })
      );
    }),
    catchError(() => {
      messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese a la aplicación' });
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
};
