export interface IVacante {
  userId: number;
  institucionId: number;
  provinciaId: number;
  categoriaId: number;
  titulo: string;
  tipoContrato: ITipoContrato;
  salarioCompensacion?: string;
  fechaLimiteAplicacion?: string; // ISO format (yyyy-MM-ddTHH:mm:ss)
  horarioTrabajo?: string;
  duracionContrato?: string;
  descripcionPuesto: string;
  requisitosGenerales: string;
  responsabilidadesEspecificas?: string;
  educacionRequerida?: string;
  experienciaRequerida?: string;
  habilidadesCompetencias?: string;
  beneficiosCompensaciones?: string;
  informacionContacto: string;
  isActive: boolean;
}


export enum ITipoContrato {
  TiempoCompleto = 1,
  MedioTiempo = 2,
  Contrato = 3,
  Temporal = 4
}
