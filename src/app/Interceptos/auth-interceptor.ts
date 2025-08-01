// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../Enviroments/enviroment';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let activeRequests = 0; // contador de peticiones activas

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const dataservicesUrl = environment.dataUrl;
  const dataToken = sessionStorage.getItem('dataToken');
  const token = sessionStorage.getItem('token');

  const spinner = inject(NgxSpinnerService);

  // Mostrar spinner
  activeRequests++;
  spinner.show();

  let modifiedReq = req;

  if (req.url.startsWith(dataservicesUrl) && dataToken) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${dataToken}`
      }
    });
  } else if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(modifiedReq).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        spinner.hide();
      }
    })
  );
};
