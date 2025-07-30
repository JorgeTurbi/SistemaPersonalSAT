export interface IProfileMilitar {
  id?:number;
  userId: number;
  profileImage?: string;
  name: string;
  cedula?: string;
  birthDate?: string;            // formato ISO: 'YYYY-MM-DD'
  country?: string;
  nationality?: string;
  maritalStatus?: string;
  phone?: string;
  email?: string;
  address?: string;
  institution:number;
  rank?: string;
  specialization?: string;
  bio?: string;

  // Contacto de emergencia
  emergencyContact?: string;
  emergencyPhone?: string;

  // Habilidades
  skills?: string;

  // Arrays dinámicos
  experience: IExperience[];
  education: IEducation[];
}

export interface IExperience {
  company?: string;
  position?: string;
  startDate?: string;  // formato ISO: 'YYYY-MM-DD'
  endDate?: string;
  description?: string;
}

export interface IEducation {
  institution?: string;
  degree?: string;
  startDate?: string;  // antes tenías startYear
  endDate?: string;    // antes tenías endYear
  certificatePdf?: string;      // base64 opcional
}
