export interface IAccountDetails {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string | null;
    activated: boolean;
    langKey: string;
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    authorities: string[];
  }
  