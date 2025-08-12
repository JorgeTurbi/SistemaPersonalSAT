import { Injectable, computed, signal } from '@angular/core';
import { IVacanteResumen } from '../../recruiter/InterfaceRecruiter/IVacanteResumen';
import { IAplicanteReclutadorDto } from '../../recruiter/InterfaceRecruiter/IAplicanteReclutadorDto';


@Injectable({ providedIn: 'root' })
export class ResumenVacanteStore {
  // Estado
  private readonly _resumenVacantes = signal<IVacanteResumen[]>([]);
  private readonly _selectedVacanteId = signal<number | null>(null);
  private readonly _aplicantes = signal<IAplicanteReclutadorDto[]>([]);

  // Selectores (lectura)
  resumenVacantes = computed(() => this._resumenVacantes());
  selectedVacanteId = computed(() => this._selectedVacanteId());
  aplicantes = computed(() => this._aplicantes());

  selectedVacante = computed(() => {
    const id = this._selectedVacanteId();
    if (!id) return null;
    return this._resumenVacantes().find(v => v.vacanteId === id) ?? null;
  });

  // Métricas
  totalAplicaciones = computed(() => this._aplicantes().length);

  promedioMatch = computed(() => {
    const list = this._aplicantes();
    if (!list.length) return 0;
    const sum = list.reduce((acc, a) => acc + (a.matchPorcentaje || 0), 0);
    return +(sum / list.length).toFixed(2);
  });

  entrevista = computed(() => this._aplicantes().filter(a => a.estadoId === 5).length);
  seleccionado = computed(() => this._aplicantes().filter(a => a.estadoId === 3).length);

  // Acciones (escritura)
  setResumenVacantes(list: IVacanteResumen[]) {
    this._resumenVacantes.set(list ?? []);
  }

  setSelectedVacante(id: number | null) {
    this._selectedVacanteId.set(id);
  }

  setAplicantes(list: IAplicanteReclutadorDto[]) {
    this._aplicantes.set(list ?? []);
  }

  clear() {
    this._resumenVacantes.set([]);
    this._selectedVacanteId.set(null);
    this._aplicantes.set([]);
  }
}
