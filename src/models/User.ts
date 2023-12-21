class User {
  public name: string;
  public email: string;
  public password: string;
  public typeAccountEnum: TypeAccountEnum;

  // Volunteer
  public phone?: string;

  // Ong
  public cnpj?: string;

  constructor(name: string, email: string, password: string, typeAccountEnum: TypeAccountEnum, phone?: string, cpnj?: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.typeAccountEnum = typeAccountEnum;
    this.phone = phone;
    this.cnpj = cpnj;
  }
}
