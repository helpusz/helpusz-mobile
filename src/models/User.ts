import TypeAccountEnum from "../utils/TypeAccountEnum";
import OngCategoryEnum from "../utils/OngCategoryEnum";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password: string;
  typeAccount?: TypeAccountEnum;

  // Volunteer
  phone?: string;

  // Ong
  cnpj?: string;
  validationCode?: string;
  isValid?: boolean;
  category?: OngCategoryEnum;
}
