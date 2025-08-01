export interface IAplicanteReclutadorDto {
  aplicanteId: number;
  userId: number;
  profileImage: string | null;      // Base64 desde API
  name: string | null;
  rango:string | null;
  specialization: string | null;
  estadoId: number;
  estado: string | null;
  fechaAplicacion: string;          // ISO date string, ej: "2025-08-01T12:30:00"
  matchPorcentaje: number;
}
