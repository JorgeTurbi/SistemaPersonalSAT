import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInstitucion } from '../../Interface/IInstitucion';
import { DataResponse } from '../../Interface/Response';
import { environment } from '../../../Enviroments/Enviroment';
import { IDEPARTAMENTO } from '../../Interface/IDepartamento';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  http=inject(HttpClient);

  getInstituciones():Observable<DataResponse<IInstitucion[]>> {
    return this.http.get<DataResponse<IInstitucion[]>>(`${environment.apiUrl}/Institucion`);
  }

  getDepartmentos(): Observable<DataResponse<IDEPARTAMENTO[]>> {
    return this.http.get<DataResponse<IDEPARTAMENTO[]>>(`${environment.apiUrl}/Departamento`);
  }
}
