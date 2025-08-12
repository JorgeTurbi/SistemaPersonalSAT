export interface IAsignacionMensaje{
   userId: number;
  aplicanteId: number;
  nombreAplicante: string;
  vacanteId: number;
  vacante: string;
  direccion: string;
  ubicacion: string;
  estadoId: number;
  departamentoId: number;
  nombreDepartamento: string;
  estado: string;
  fechaPublicacionVacante: string; // ISO date string
  fechaLimite: string; // ISO date string
  proximosPasos: string[] | null;
  nombreContacto: string;
  correo: string;
  telefono: string;
}
