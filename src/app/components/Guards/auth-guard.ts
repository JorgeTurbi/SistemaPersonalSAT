import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const messageService:MessageService= inject(MessageService);

  const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // 🔹 Validar si existe sesión
  if (!token || !user) {
    messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese a la aplicación' });
    router.navigate(['/login']);
    return false;
  }
  // 🔹 Obtener roles permitidos de la ruta
  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  // 🔹 Validar rol desde localStorage
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    messageService.add({ severity: 'error', summary: 'Acceso Denegado', detail: 'No tiene permisos para acceder' });
    router.navigate(['/']);
    return false;
  }

  return true;

  return true;
};
