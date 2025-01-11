export class RegisteringUser {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public password: string
  ) {}

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isValidUsername(): boolean {
    return this.username.length >= 7;
  }

  isValidPassword(): boolean {
    return this.password.length >= 6;
  }
}
