import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardDTO } from '../PagesInterfaces/DashboardDTO';
import { Observable } from 'rxjs';
import { environment } from '../../../../Enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  http:HttpClient =inject(HttpClient);

  getDashboard():Observable<DashboardDTO>
  {
    return this.http.get<DashboardDTO>(`${environment.apiUrl}/Estadistica/Dashboard`);
  }
}
