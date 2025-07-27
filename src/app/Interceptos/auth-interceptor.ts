// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../Enviroments/Enviroment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const dataservicesUrl = environment.dataUrl;
  const dataToken = localStorage.getItem('dataToken'); // o puedes usar un valor fijo para prueba

  if (req.url.startsWith(dataservicesUrl) && dataToken) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${dataToken}`
      }
    });

    console.log('✅ Authorization header añadido:', modifiedReq.headers.get('Authorization'));
    return next(modifiedReq);
  }

  console.warn('⛔ No se añadió Authorization');
  return next(req);
};
