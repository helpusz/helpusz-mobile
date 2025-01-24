import TypeAccountEnum from "../utils/TypeAccountEnum";
import OngCategoryEnum from "../utils/OngCategoryEnum";
import SocialLinks from "../utils/SocialLinks";
import Email from "../utils/Email";

export interface User {
  id?: string;
  name?: string;
  email?: Email;
  password: string;
  typeAccount?: TypeAccountEnum;
  socialLinks?: SocialLinks;
  profilePhotoUrl?: string;

  // Volunteer
  phone?: string;

  // Ong
  cnpj?: string;
  validationCode?: string;
  isValid?: boolean;
  category?: OngCategoryEnum;
}
