import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProfileMilitar } from '../../EditProfile/InterfaceProfile/IProfileMilitar';

@Injectable({ providedIn: 'root' })
export class AplicanteProfileService {
  // ✅ Ahora el estado permite null de forma segura
  private readonly aplicanteProfileSubject = new BehaviorSubject<IProfileMilitar | null>(null);
  readonly aplicanteProfile$: Observable<IProfileMilitar | null> = this.aplicanteProfileSubject.asObservable();

  // ✅ Sin constructor: ya no cargamos nada de localStorage

  setAplicanteProfile(profile: IProfileMilitar | null): void {
    this.aplicanteProfileSubject.next(profile);
  }

  getAplicanteProfile(): IProfileMilitar | null {
    return this.aplicanteProfileSubject.value;
  }

  // ✅ Renombrado para coincidir con el uso en el componente
  clear(): void {
    this.aplicanteProfileSubject.next(null);
  }
}
