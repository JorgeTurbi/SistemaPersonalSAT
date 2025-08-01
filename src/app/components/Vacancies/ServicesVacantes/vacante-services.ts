import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataResponse } from '../../../Interface/Response';
import { ICategoriaVacante } from '../InterfaceVacantes/ICateogriaVacante';
import { Observable } from 'rxjs';
import { environment } from '../../../../Enviroments/enviroment';
import { IVacante } from '../InterfaceVacantes/ivacante';
import { IVacanteDto } from '../InterfaceVacantes/IVacanteDto';
import { IAplicanteReclutadorDto } from '../../recruiter/InterfaceRecruiter/IAplicanteReclutadorDto';
import { IVacanteResumen } from '../../recruiter/InterfaceRecruiter/IVacanteResumen';

@Injectable({
  providedIn: 'root'
})
export class VacanteServices {
  http =inject(HttpClient);


  getCategoriesVacante():Observable<DataResponse<ICategoriaVacante[]>>
  {
    return this.http.get<DataResponse<ICategoriaVacante[]>>(`${environment.apiUrl}/CategoriaVacante`);
  }

  newVacante(vacante:IVacante):Observable<DataResponse<boolean>>
  {
      return this.http.post<DataResponse<boolean>>(`${environment.apiUrl}/Vacante`,vacante);
  }

  getList():Observable<DataResponse<IVacanteDto[]>>
  {
    return this.http.get<DataResponse<IVacanteDto[]>>(`${environment.apiUrl}/Vacante`);
  }
  getVacatebyId(vancanteId:number):Observable<DataResponse<IVacanteDto>>
  {
      return this.http.get<DataResponse<IVacanteDto>>(`${environment.apiUrl}/Vacante/GetVacanteById?id=${vancanteId}`);
  }

    getAplicantsbyVacanteId(vacanteId:number):Observable<DataResponse<IAplicanteReclutadorDto[]>>
    {
      return this.http.get<DataResponse<IAplicanteReclutadorDto[]>>(`${environment.apiUrl}/Aplicaciones/ConsultadeAplicantes?VacanteId=${vacanteId}`);
    }
     getVacantesCategoriasActivas():Observable<DataResponse<IVacanteResumen[]>>
    {
      return this.http.get<DataResponse<IVacanteResumen[]>>(`${environment.apiUrl}/Aplicaciones/GetVacanteCategoriasActivas`);
    }
}
