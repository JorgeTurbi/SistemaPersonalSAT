import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserDataService } from '../../Interface/IUserDataService';
import { IResponseTokenDataService } from '../Auth/Register/InterfaceRegister/ResponseTokenDataService';
import { Observable } from 'rxjs';
import { environment } from '../../../Enviroments/enviroment';
import { ConsultaJceResponse } from '../../Interface/ConsultaJceResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiciosGenerales {


  http = inject(HttpClient);

  getTokendATA(login: IUserDataService): Observable<IResponseTokenDataService> {

    return this.http.post<IResponseTokenDataService>(`${environment.dataUrl}/Account`, login);
  }

  getUserData(cedula: string): Observable<ConsultaJceResponse> {
    console.log("===>", cedula);
    return this.http.get<ConsultaJceResponse>(`${environment.dataUrl}/ConsultaJCE?Cedula=${cedula}`);
  }
}
