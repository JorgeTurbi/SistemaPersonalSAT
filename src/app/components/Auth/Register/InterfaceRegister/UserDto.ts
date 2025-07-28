export interface UserDto {
  id?: number; // opcional porque es Identity
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

