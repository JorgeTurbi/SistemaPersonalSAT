// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../Enviroments/enviroment';
import { finalize, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const dataservicesUrl = environment.dataUrl;
  const dataToken = localStorage.getItem('dataToken'); // o puedes usar un valor fijo para prueba
  const Token = localStorage.getItem('token');
  const spinner = inject(NgxSpinnerService);
  const messageService = inject(MessageService);
  spinner.show();
  if (req.url.startsWith(dataservicesUrl) && dataToken) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${dataToken}`
      }
    });


    return next(modifiedReq).pipe(
      finalize(() => {
        spinner.hide();
      })
    );
  }

  if (Token) {
    const setHeaderReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${Token}`
      }
    });
      return next(setHeaderReq).pipe(
    finalize(() => {
      spinner.hide();
    }

    )
  );
  }
  // Si no hay token, continuar sin modificar la solicitud
  return next(req).pipe(
    finalize(() => spinner.hide())
  );
  // Si no hay ningún token, bloquear la solicitud
  // spinner.hide();
  // return throwError(() =>{
  //      messageService.add({ severity: 'error', summary: 'Error', detail: "Solicitud bloqueada." });
  // } );

    //new Error('No se encontró un token válido. Solicitud bloqueada.'));

};
