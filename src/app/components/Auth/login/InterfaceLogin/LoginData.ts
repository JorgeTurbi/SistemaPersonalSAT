import { UserProfile } from "./UserProfile";

export interface LoginData {
  token: string;
  expiresAt: string; // Puedes convertirlo a Date si deseas
  user: UserProfile;
}
