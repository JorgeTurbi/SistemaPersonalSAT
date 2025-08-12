// src/app/auth/services/otp.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../Enviroments/enviroment';
import { SendOtpRequest, SendOtpResponse, VerifyOtpRequest, VerifyOtpResponse } from '../Interface/otp.models';


@Injectable({ providedIn: 'root' })
export class OtpService {
  private base = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  send(req: SendOtpRequest): Observable<SendOtpResponse> {
    return this.http.post<SendOtpResponse>(`${this.base}/otp/send`, req, { withCredentials: true });
  }

  verify(req: VerifyOtpRequest): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.base}/otp/verify`, req, { withCredentials: true });
  }
}
