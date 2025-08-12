// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { environment } from '../../Enviroments/enviroment';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

// === Opcional: token de contexto para forzar spinner en cualquier request ===
export const SHOW_SPINNER = new HttpContextToken<boolean>(() => false);
export const withSpinner = () => ({ context: new (class { get = () => true; })() as any });

let activeRequests = 0;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl  = environment.apiUrl;
  const dataUrl = environment.dataUrl;

  const apiToken  = localStorage.getItem('access_token');
  const dataToken = localStorage.getItem('dataToken');

  const spinner = inject(NgxSpinnerService);
  const router  = inject(Router);
  const message = inject(MessageService);

  const isApi         = req.url.startsWith(apiUrl);
  const isSessionInfo = isApi && req.url.includes('/Auth/session-info');

  // ¿Es consulta de cédula hacia el servicio externo?
  // Ajusta el patrón según tu endpoint real (ej: /cedula, /consulta-cedula, /person/by-cedula, etc.)
  const isCedulaLookup =
    req.url.startsWith(dataUrl) &&
    /cedula|dni|consulta-cedula|by-cedula/.test(req.url.toLowerCase());

  // También permitir forzar el spinner por contexto
  const wantsSpinner = (req as any).context?.get?.(SHOW_SPINNER) === true;

  // Mostramos spinner si:
  // - Es llamada a tu API (excepto /session-info), o
  // - Es consulta de cédula al dataUrl, o
  // - El request lo pidió explícitamente con SHOW_SPINNER
  let showedSpinner = false;
  if ((isApi && !isSessionInfo) || isCedulaLookup || wantsSpinner) {
    activeRequests++;
    spinner.show();
    showedSpinner = true;
  }

  // --- Cabeceras ---
  let modifiedReq = req;

  if (isApi) {
    const setHeaders: Record<string, string> = {};
    if (apiToken) setHeaders['Authorization'] = `Bearer ${apiToken}`;
    modifiedReq = modifiedReq.clone({
      withCredentials: true,
      setHeaders: Object.keys(setHeaders).length ? setHeaders : undefined
    });
  }

  if (req.url.startsWith(dataUrl) && dataToken) {
    modifiedReq = modifiedReq.clone({
      setHeaders: { Authorization: `Bearer ${dataToken}` }
    });
  }

  return next(modifiedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      const isAuthError = err.status === 401 || err.status === 403;

      // Detectar si la ruta actual es pública
      const snapshot = router.routerState.snapshot;
      const pathPublicFlag =
        snapshot.root.pathFromRoot?.some(r => r.data && (r.data as any)['public'] === true) ?? false;

      const urlTree = router.parseUrl(router.url || '/');
      const firstSeg = urlTree.root.children['primary']?.segments?.[0]?.path ?? '';
      const knownPublicPaths = new Set(['', 'inicio', 'login', 'register']);
      const isKnownPublicPath = knownPublicPaths.has(firstSeg);
      const isPublicRoute = pathPublicFlag || isKnownPublicPath;

      const shouldToast = !isSessionInfo && !(isPublicRoute && isAuthError);
      if (shouldToast && message) {
        const detail = (err?.error?.message ?? err?.message ?? 'Error de red');
        message.add({ severity: 'error', summary: 'Error', detail });
      }

      if (isAuthError && !isSessionInfo && !isPublicRoute) {
        router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
      }

      return throwError(() => err);
    }),
    finalize(() => {
      if (showedSpinner) {
        activeRequests--;
        if (activeRequests <= 0) {
          activeRequests = 0;
          spinner.hide();
        }
      }
    })
  );
};
