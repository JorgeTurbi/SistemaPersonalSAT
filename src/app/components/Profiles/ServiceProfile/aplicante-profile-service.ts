import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProfileMilitar } from '../../EditProfile/InterfaceProfile/IProfileMilitar';

@Injectable({
  providedIn: 'root'
})
export class AplicanteProfileService {
  private aplicanteProfileSubject = new BehaviorSubject<IProfileMilitar>(null!);
  aplicanteProfile$ = this.aplicanteProfileSubject.asObservable();

  constructor() {
    // Si hay data guardada en localStorage, la cargamos al iniciar la app
    const storedProfile = localStorage.getItem('AplicanteProfile');
    if (storedProfile) {
      this.aplicanteProfileSubject.next(JSON.parse(storedProfile));
    }
  }

  setAplicanteProfile(profile: IProfileMilitar) {
    this.aplicanteProfileSubject.next(profile);
    sessionStorage.setItem('AplicanteProfile', JSON.stringify(profile));
  }

  getAplicanteProfile() {
    return this.aplicanteProfileSubject.value;
  }

  clearAplicanteProfile() {
    this.aplicanteProfileSubject.next(null!);
    sessionStorage.removeItem('AplicanteProfile');
  }
}
