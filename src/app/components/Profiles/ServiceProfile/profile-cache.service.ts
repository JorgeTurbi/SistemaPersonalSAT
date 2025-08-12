import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, shareReplay, tap, map } from 'rxjs/operators';
import { environment } from '../../../../Enviroments/enviroment';
import { DataResponse } from '../../../Interface/Response';
import { IProfileMilitar } from '../../EditProfile/InterfaceProfile/IProfileMilitar';
import { IAplicacionesDTO } from '../InterfaceAplicaciones/IAplicacionesDTO';

type Cached<T> = { value: T; ts: number };

@Injectable({ providedIn: 'root' })
export class ProfileCacheService {
  private http = inject(HttpClient);

  private readonly TTL = 2 * 60 * 1000;

  private profileReload$ = new Map<number, BehaviorSubject<void>>();
  private appsReload$    = new Map<number, BehaviorSubject<void>>();

  private profileStream$ = new Map<number, Observable<IProfileMilitar | null>>();
  private appsStream$    = new Map<number, Observable<IAplicacionesDTO[]>>();

  private profileMem = new Map<number, Cached<IProfileMilitar | null>>();
  private appsMem    = new Map<number, Cached<IAplicacionesDTO[]>>();

  getProfile(userId: number): Observable<IProfileMilitar | null> {
    if (!this.profileReload$.has(userId)) {
      this.profileReload$.set(userId, new BehaviorSubject<void>(undefined));
    }
    if (!this.profileStream$.has(userId)) {
      const trigger$ = this.profileReload$.get(userId)!;
      const stream$ = trigger$.pipe(
        switchMap(() => {
          const cached = this.profileMem.get(userId);
          const fresh = cached && (Date.now() - cached.ts) < this.TTL;
          if (fresh) return of(cached.value);

          return this.http
            .get<DataResponse<IProfileMilitar>>(
              `${environment.apiUrl}/Aplicante/GetById?UserId=${userId}`,
              { withCredentials: true }
            )
            .pipe(
              map(res => res.success ? (res.data ?? null) : null),
              tap(data => this.profileMem.set(userId, { value: data, ts: Date.now() }))
            );
        }),
        shareReplay(1)
      );
      this.profileStream$.set(userId, stream$);
    }
    return this.profileStream$.get(userId)!;
  }

  getApplications(userId: number): Observable<IAplicacionesDTO[]> {
    if (!this.appsReload$.has(userId)) {
      this.appsReload$.set(userId, new BehaviorSubject<void>(undefined));
    }
    if (!this.appsStream$.has(userId)) {
      const trigger$ = this.appsReload$.get(userId)!;
      const stream$ = trigger$.pipe(
        switchMap(() => {
          const cached = this.appsMem.get(userId);
          const fresh = cached && (Date.now() - cached.ts) < this.TTL;
          if (fresh) return of(cached.value);

          return this.http
            .get<DataResponse<IAplicacionesDTO[]>>(
              `${environment.apiUrl}/Aplicaciones/GetAplicacionesbyUserId?UserId=${userId}`,
              { withCredentials: true }
            )
            .pipe(
              map(res => res.success ? (res.data ?? []) : []),
              tap(list => this.appsMem.set(userId, { value: list, ts: Date.now() }))
            );
        }),
        shareReplay(1)
      );
      this.appsStream$.set(userId, stream$);
    }
    return this.appsStream$.get(userId)!;
  }

  refreshProfile(userId: number) {
    this.profileMem.delete(userId);
    this.profileReload$.get(userId)?.next();
  }

  refreshApplications(userId: number) {
    this.appsMem.delete(userId);
    this.appsReload$.get(userId)?.next();
  }

  clearAll() {
    this.profileMem.clear();
    this.appsMem.clear();
    this.profileReload$.forEach(s => s.next());
    this.appsReload$.forEach(s => s.next());
  }
}
