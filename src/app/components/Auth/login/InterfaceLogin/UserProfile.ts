// ✅ UserProfile (sin cambios si el backend ya mapea así)
export interface UserProfile {
  id: number;
  nombres: string;
  apellidos: string;
  usuario: string;
  email: string;
  cedula: string;
  role: string;
  isActive: boolean;
  createdAt: string | Date;  // ← opcional si quieres parsear
  institutionId: number;
  institucionNombre: string;
  institucionCodigo: string;
  departamentoId: number;
  departamentoDireccion: string;
  departamentoDirector: string;
}
