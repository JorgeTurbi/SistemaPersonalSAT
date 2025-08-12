// ✅ LoginData (token/expiresAt opcionales; perfil opcional o null; refresh opcional)
import { IProfileMilitar } from "../../../EditProfile/InterfaceProfile/IProfileMilitar";
import { UserProfile } from "./UserProfile";

export interface LoginData {
  token?: string;                 // ← opcional: ahora el JWT va en cookie
  expiresAt?: string | Date;      // ← opcional y flexible
  refreshToken?: string;          // ← opcional (si el backend lo expone)
  refreshExpiresAt?: string | Date; // ← opcional (si el backend lo expone)

  user: UserProfile;
  perfil?: IProfileMilitar | null; // ← puede no existir o venir null
}
