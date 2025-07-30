import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private DataVacante = new BehaviorSubject<IVacanteDto>({} as IVacanteDto);
  currentVacante = this.DataVacante.asObservable();

  changeMessage(data: IVacanteDto) {
    this.DataVacante.next(data);
  }
}
