import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataResponse } from '../../../Interface/Response';
import { ICategoriaVacante } from '../InterfaceVacantes/ICateogriaVacante';
import { Observable } from 'rxjs';
import { environment } from '../../../../Enviroments/enviroment';
import { IVacante } from '../InterfaceVacantes/ivacante';
import { IVacanteDto } from '../InterfaceVacantes/IVacanteDto';

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
}
