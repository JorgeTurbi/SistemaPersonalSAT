import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../../../Interface/Response';
import { IAplicacionVacante } from '../InterfaceRecruiter/IAplicacionVacante';
import { environment } from '../../../../Enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class Aplicaservices {
  private http = inject(HttpClient);

  // 👇 usa boolean (primitivo) en todo
  crearAplicacionVacante(send: IAplicacionVacante): Observable<DataResponse<boolean>> {
    return this.http.post<DataResponse<boolean>>(
      `${environment.apiUrl}/Aplicaciones/CrearAplicacion`,
      send
    );
  }
}
