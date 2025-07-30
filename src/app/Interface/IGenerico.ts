export interface IRango {
  id: number;
  institucionMilitarId: number;
  nombre: string;
}

export interface IInstitucionMilitar {
  id: number;
  institucion: string;
  rangos?: IRango[]; // opcional si quieres cargar los rangos
}
