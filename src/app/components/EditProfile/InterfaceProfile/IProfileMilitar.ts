// ✅ IProfileMilitar (arrays opcionales para evitar errores si vienen null)
export interface IProfileMilitar {
  id?: number;
  userId: number;
  profileImage?: string;
  name: string;
  cedula?: string;
  birthDate?: string | Date; // ← si parseas a Date en el front, deja union
  country?: string;
  nationality?: string;
  maritalStatus?: string;
  phone?: string;
  email?: string;
  address?: string;
  institution: number;       // si a veces es string, cámbialo a number | string
  rank?: string;
  specialization?: string;
  bio?: string;

  emergencyContact?: string;
  emergencyPhone?: string;
  skills?: string;

  // ← hazlos opcionales; cuando consumas, usa `perfil?.experience ?? []`
  experience?: IExperience[];
  education?: IEducation[];
}

export interface IExperience {
  company?: string;
  position?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  description?: string;
}

export interface IEducation {
  institution?: string;
  degree?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  certificatePdf?: string;
}
