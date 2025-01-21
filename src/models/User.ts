import TypeAccountEnum from "../utils/TypeAccountEnum";
import OngCategoryEnum from "../utils/OngCategoryEnum";
import SocialLinks from "../utils/SocialLinks";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password: string;
  typeAccount?: TypeAccountEnum;
  socialLinks?: SocialLinks;

  // Volunteer
  phone?: string;

  // Ong
  cnpj?: string;
  validationCode?: string;
  isValid?: boolean;
  category?: OngCategoryEnum;
}
