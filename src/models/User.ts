import TypeAccountEnum from "../utils/TypeAccountEnum";

class User {
  public email: string;
  public password: string;
  public typeAccount: TypeAccountEnum;

  public name?: string;

  // Volunteer
  public phone?: string;

  // Ong
  public cnpj?: string;

  constructor(email: string, password: string, typeAccount?: TypeAccountEnum, name?: string, phone?: string, cpnj?: string) {
    this.email = email;
    this.password = password;
    this.typeAccount = typeAccount;
    this.name = name;
    this.phone = phone;
    this.cnpj = cpnj;
  }
}

export default User;
