// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../Enviroments/enviroment';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const dataservicesUrl = environment.dataUrl;
  const dataToken = localStorage.getItem('dataToken'); // o puedes usar un valor fijo para prueba
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  if (req.url.startsWith(dataservicesUrl) && dataToken) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${dataToken}`
      }
    });


    return next(modifiedReq).pipe(
      finalize(()=>{
        spinner.hide();
      })
    );
  }


  return next(req).pipe(
    finalize(()=>{
      spinner.hide();
    }

    )
  );
};
