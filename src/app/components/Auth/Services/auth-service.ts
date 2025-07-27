
import { inject, Injectable } from '@angular/core';
import { DataResponse } from '../../../Interface/Response';
import { LoginData } from '../login/InterfaceLogin/LoginData';
import { LoginRequest } from '../login/InterfaceLogin/LoginRequest';
import { Observable } from 'rxjs';
import { environment } from '../../../../Enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../Register/InterfaceRegister/UserDto';
import { User } from 'lucide-angular';

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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

    registerUser(user:UserDto):Observable<DataResponse<boolean>>
    {
      return this.http.post<DataResponse<boolean>>(`${environment.apiUrl}/Auth/register`,user);
    }
}
