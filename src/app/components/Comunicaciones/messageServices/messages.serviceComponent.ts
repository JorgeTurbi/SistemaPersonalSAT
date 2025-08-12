import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMessageRequest, CreateReplyRequest, MessageDto, PagedResult } from '../../../Interface/messages.models';
import { environment } from '../../../../Enviroments/enviroment';
import { DataResponse } from '../../../Interface/Response';
import { Observable } from 'rxjs';
import { IAsignacionMensaje } from '../../../Interface/IAsignacionMensaje';


@Injectable({ providedIn: 'root' })
export class MessagesServiceComponent {
  // Ajusta baseUrl si usas proxy: "/api"
  private readonly baseUrl =environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages(applicationId: number, page = 1, pageSize = 10) {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<PagedResult<MessageDto>>(
      `${this.baseUrl}/applications/${applicationId}/messages`,
      { params }
    );
  }

  createMessage(applicationId: number, body: CreateMessageRequest) {
    return this.http.post(
      `${this.baseUrl}/applications/${applicationId}/messages`,
      body
    );
  }

  createReply(applicationId: number, messageId: number, body: CreateReplyRequest) {
    return this.http.post<void>(
      `${this.baseUrl}/applications/${applicationId}/messages/${messageId}/replies`,
      body
    );
  }

  consultaAplicante(aplicanteId:number):Observable<DataResponse<IAsignacionMensaje>>
  {
    return this.http.get<DataResponse<IAsignacionMensaje>>(`${environment.apiUrl}/Aplicaciones/GetAsignaciones?AplicanteId=${aplicanteId}`)
  }
    consultaAplicantebyUser(aplicanteId:number):Observable<DataResponse<IAsignacionMensaje>>
  {
    return this.http.get<DataResponse<IAsignacionMensaje>>(`${environment.apiUrl}/ Aplicaciones/GetAsignacionesbyUser?UserId=${aplicanteId}`)
  }

}
