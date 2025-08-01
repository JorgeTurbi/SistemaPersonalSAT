import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserDataService } from '../../Interface/IUserDataService';
import { IResponseTokenDataService } from '../Auth/Register/InterfaceRegister/ResponseTokenDataService';
import { Observable } from 'rxjs';
import { environment } from '../../../Enviroments/enviroment';
import { ConsultaJceResponse } from '../../Interface/ConsultaJceResponse';
import { DataResponse } from '../../Interface/Response';
import { IProvincia } from '../../Interface/IProvincia';

@Injectable({
  providedIn: 'root'
})
export class ServiciosGenerales {


  http = inject(HttpClient);

  getTokendATA(login: IUserDataService): Observable<IResponseTokenDataService> {

    return this.http.post<IResponseTokenDataService>(`${environment.dataUrl}/Account`, login);
  }

  getUserData(cedula: string): Observable<ConsultaJceResponse> {

    return this.http.get<ConsultaJceResponse>(`${environment.dataUrl}/ConsultaJCE?Cedula=${cedula}`);
  }

  getProvincias():Observable<DataResponse<IProvincia[]>>
  {
    return this.http.get<DataResponse<IProvincia[]>>(`${environment.apiUrl}/Provincia`);
  }
}
