export interface ConsultaJceResponse {

  cedula: string;
  nombres: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: string; // Formato: "4/23/1984 12:00:00 AM" (puedes convertirlo a Date si lo necesitas)
  lugarNacimiento: string;
  idSexo: string; // Ejemplo: "M"
  foto: string;   // Base64 de imagen
}
