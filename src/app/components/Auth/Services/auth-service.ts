import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../../Enviroments/enviroment';
import { DataResponse } from '../../../Interface/Response';
import { LoginRequest } from '../login/InterfaceLogin/LoginRequest';
import { LoginData } from '../login/InterfaceLogin/LoginData';
import { UserDto } from '../Register/InterfaceRegister/UserDto';
import { IProfile } from '../../../Interface/IProfile';
import { IEstado } from '../../../Interface/IEstado';

export interface SessionInfo {
  userId: string;
  username: string;
  role: string;
  sessionId: string;
  isAuthenticated: boolean;
  serverTime: string; // ISO
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private sessionSubject = new BehaviorSubject<SessionInfo | null>(null);
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  /** Observables públicos */
  readonly sessionInfo$ = this.sessionSubject.asObservable();
  readonly isLoggedIn$ = this.loggedInSubject.asObservable();

  /** Snapshot sincrónico (útil en guards) */
  get currentSession(): SessionInfo | null {
    return this.sessionSubject.value;
  }

  /** Alias retrocompatibles */
  ping(): Observable<boolean> {
    return this.checkSession();
  }
  getProfile(): Observable<DataResponse<SessionInfo>> {
    return this.http.get<DataResponse<SessionInfo>>(
      `${environment.apiUrl}/Auth/session-info`,
      { withCredentials: true }
    );
  }

  /** Valida sesión por cookie HttpOnly y actualiza estado */
  checkSession(): Observable<boolean> {
    return this.http
      .get<DataResponse<SessionInfo>>(`${environment.apiUrl}/Auth/session-info`, { withCredentials: true })
      .pipe(
        tap(res => {
          const info = res?.data ?? null;
          this.sessionSubject.next(info);
          this.loggedInSubject.next(!!info?.isAuthenticated);
        }),
        map(res => !!res?.data?.isAuthenticated),
        catchError(() => {
          this.sessionSubject.next(null);
          this.loggedInSubject.next(false);
          return of(false);
        })
      );
  }

  /** Login: backend setea cookie; aquí refrescamos estado */
  authLogin(login: LoginRequest): Observable<DataResponse<LoginData>> {
    return this.http
      .post<DataResponse<LoginData>>(`${environment.apiUrl}/Auth/login`, login, { withCredentials: true })
      .pipe(
        tap(res => {
          if (res?.success) this.checkSession().subscribe(); // pobla sesión
        })
      );
  }

  registerUser(user: UserDto): Observable<DataResponse<boolean>> {
    return this.http.post<DataResponse<boolean>>(
      `${environment.apiUrl}/Auth/register`,
      user,
      { withCredentials: true }
    );
  }

  logout(): Observable<DataResponse<boolean>> {
    return this.http
      .get<DataResponse<boolean>>(`${environment.apiUrl}/Auth/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.sessionSubject.next(null);
          this.loggedInSubject.next(false);
        }),
        catchError(() => {
          this.sessionSubject.next(null);
          this.loggedInSubject.next(false);
          return of({ success: false, message: 'Logout falló', data: false } as DataResponse<boolean>);
        })
      );
  }

    ListEstados():Observable<DataResponse<IEstado[]>>
    {
      return this.http.get<DataResponse<IEstado[]>>(`${environment.apiUrl}/Estado/GetEstados`);
    }
    getSessionInfo(): Observable<IProfile> {
    return this.http
      .get<DataResponse<IProfile>>(
        `${environment.apiUrl}/Auth/profile`,
        { withCredentials: true }
      )
      .pipe(map(res => {
        if (!res.success || !res.data) {
          throw new Error(res.message || 'No hay sesión activa');
        }
        return res.data;
      }));
  }
}
