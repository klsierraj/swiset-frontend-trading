export class AuthenticatedUser {
    constructor(
      public id: number,
      public login: string,
      public firstName: string,
      public lastName: string,
      public email: string,
      public imageUrl: string | null,
      public activated: boolean
    ) {}
    getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  