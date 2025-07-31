import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../../../Interface/Response';
import { IInstitucionMilitar, IRango } from '../../../Interface/IGenerico';
import { environment } from '../../../../Enviroments/enviroment';
import { IProfileMilitar } from '../InterfaceProfile/IProfileMilitar';
import { IAplicacionesDTO } from '../../Profiles/InterfaceAplicaciones/IAplicacionesDTO';

@Injectable({
  providedIn: 'root'
})
export class ServicioGenericoComponent {

  http:HttpClient= inject(HttpClient);

  getRangos():Observable<DataResponse<IRango[]>>
  {
    return this.http.get<DataResponse<IRango[]>>(`${environment.apiUrl}/Generico/GetRangos/`);
  }

  getInstitucion():Observable<DataResponse<IInstitucionMilitar[]>>
  {
    return this.http.get<DataResponse<IInstitucionMilitar[]>>(`${environment.apiUrl}/Generico/GetInstitucionesMilitares`)
  }

  createAplicacion(crearPerfilMilitar:IProfileMilitar):Observable<DataResponse<boolean>>
  {
    return this.http.post<DataResponse<boolean>>(`${environment.apiUrl}/Aplicante/create`,crearPerfilMilitar);
  }
    GetAplicacion(dato:number):Observable<DataResponse<IProfileMilitar>>
  {
    return this.http.get<DataResponse<IProfileMilitar>>(`${environment.apiUrl}/Aplicante/GetById?UserId=${dato}`);
  }

  getAplicaionesbyUserId(userId:number):Observable<DataResponse<IAplicacionesDTO[]>>
  {
    return this.http.get<DataResponse<IAplicacionesDTO[]>>(`${environment.apiUrl}/Aplicaciones/GetAplicacionesbyUserId?UserId=${userId}`);
  }
}
