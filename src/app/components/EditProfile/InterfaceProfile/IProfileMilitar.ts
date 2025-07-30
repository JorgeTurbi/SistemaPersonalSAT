export interface IProfileMilitar {
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
  position?: string;
  company?: string;
  startDate?: string;            // formato ISO: 'YYYY-MM-DD'
  endDate?: string;              // formato ISO: 'YYYY-MM-DD'
  description?: string;
}

export interface IEducation {
  title?: string;
  institution?: string;
  startYear?: string;            // año o texto "En curso"
  endYear?: string;
  certificatePdf?: string;       // base64 opcional
}
