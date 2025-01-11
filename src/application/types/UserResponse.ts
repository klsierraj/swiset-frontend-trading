export interface RegisterResponse {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    activated: boolean;
    langKey: string;
    imageUrl: string | null;
    resetDate: string | null;
  }
  