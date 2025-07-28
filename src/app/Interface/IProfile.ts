export interface IProfile
{
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  usuario: string;
  userType: string;
  role: string;
  isActive: boolean;
  createdAt: string; // o Date si luego lo parseas
  departamentoId: number;
  departamentoDireccion: string;
  departamentoDirector: string;
  institutionId: number;
  institucionCodigo: string;
  institucionNombre: string;
}
