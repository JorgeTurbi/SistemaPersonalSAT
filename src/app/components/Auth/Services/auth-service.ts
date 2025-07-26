
import { inject, Injectable } from '@angular/core';
import { DataResponse } from '../../../Interface/Response';
import { LoginData } from '../login/InterfaceLogin/LoginData';
import { LoginRequest } from '../login/InterfaceLogin/LoginRequest';
import { Observable } from 'rxjs';
import { environment } from '../../../../Enviroments/Enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
/**
 *
 */
constructor(private http: HttpClient) {
  //

}


authLogin(login:LoginRequest):Observable<DataResponse<LoginData>> {
  return this.http.post<DataResponse<LoginData>>(`${environment.apiUrl}/auth/login`, login);
}



}
