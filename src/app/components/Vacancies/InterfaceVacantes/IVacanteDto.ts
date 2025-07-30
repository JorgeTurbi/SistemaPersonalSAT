export interface IVacanteDto {
  id: number;
  userId: number;
  titulo: string;
  tipoContrato: number;
  salarioCompensacion: string;
  fechaLimiteAplicacion: string; // o Date si deseas convertirlo a fecha
  horarioTrabajo: string;
  duracionContrato: string;
  descripcionPuesto: string;
  responsabilidadesEspecificas: string;
  requisitosGenerales: string[];
  educacionRequerida: string;
  experienciaRequerida: string;
  habilidadesCompetencias: string;
  beneficiosCompensaciones: string;
  telefono: string;
  email: string;
  direccion:string;
  isActive: boolean;
  createdAt: string; // o Date si deseas convertirlo a fecha
  updatedAt: string | null;
  institucionId: number;
  institucionNombre: string;
  provinciaId: number;
  provinciaNombre: string;
  categoriaId: number;
  categoriaNombre: string;
}
