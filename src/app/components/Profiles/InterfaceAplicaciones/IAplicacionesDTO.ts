export interface IAplicacionesDTO {
  id?: number;
  vacanteId:number;
  tituloVacante: string;
  departamento: string;
  ubicacion: string;
  fechaAplicacion: string;          // Se recibe como string ISO
  estado: string;
 estadoId:number;
  fechaentrevista: string | null;   // Nullable
  observaciones: string | null;     // Nullable
  matchPorcentaje: number;
}
