export interface IBrokerAccount {
    id: number;
    identifier: string;
    type: string;
    currency: string;
    user: {
      id: number;
      login: string;
      firstName: string;
      lastName: string;
      email: string;
      activated: boolean;
      langKey: string;
      imageUrl: string | null;
      resetDate: string | null;
    };
    broker: {
      id: number;
      name: string;
      integrated: boolean;
      logoUrl: string | null;
      downloadUrl: string | null;
      partner: string | null;
      iburl: string | null;
    };
    automated: boolean;
    verified: boolean;
    lastActivity: string | null;
    compounded_trades: boolean;

}