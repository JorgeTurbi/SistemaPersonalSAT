// src/app/auth/models/otp.models.ts
export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  // Opcional: solo en dev podrías devolver el código
  devCode?: string | null;
  // Opcional: cuándo expira
  expiresAt?: string | null; // ISO
}

export interface VerifyOtpRequest {
  email: string;
  code: string; // "123" (3 dígitos) o "123456" si cambiaste longitud
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  // Si la verificación activa la cuenta, puedes incluir banderas
  isActivated?: boolean;
}
