import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth-service';

import { UserProfile } from '../login/InterfaceLogin/UserProfile';


@Injectable({ providedIn: 'root' })
export class UserSessionService {
  private readonly _session$ = new BehaviorSubject<UserProfile | null>(null);
  readonly session$: Observable<UserProfile | null> = this._session$.asObservable();

  private auth = inject(AuthService);

  /** snapshot sincrónico */
  getSessionSnapshot(): UserProfile | null {
    return this._session$.value;
  }

  /** set manual (por si necesitas asignar desde fuera) */
  setSession(session: UserProfile | null) {
    this._session$.next(session);
  }

  /** pedir al backend y guardar en memoria */
  refreshFromServer() {
    return this.auth.getSessionInfo().pipe(
      tap(info => this._session$.next(info))
    );
  }

  clear() {
    this._session$.next(null);
  }
}
