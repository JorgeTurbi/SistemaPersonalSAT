import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../../../Interface/Response';
import { IAplicacionVacante } from '../InterfaceRecruiter/IAplicacionVacante';
import { environment } from '../../../../Enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class Aplicaservices {

  http:HttpClient =inject(HttpClient);

  crearAplicacionVacante(send: IAplicacionVacante):Observable<DataResponse<Boolean>>
  {
    return this.http.post<DataResponse<Boolean>>(`${environment.apiUrl}/Aplicaciones/CrearAplicacion`,send);
  }
}
