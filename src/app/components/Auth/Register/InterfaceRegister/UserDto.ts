// (opcional) UserDto – sin cambios necesarios
export interface UserDto {
  id?: number;
  institutionId: number;
  departamentoId: number;
  nombres: string;
  apellidos: string;
  usuario: string;
  userType: string;
  email: string;
  passwordHash: string;
  cedula: string;
}
