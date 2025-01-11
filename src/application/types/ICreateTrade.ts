export interface ICreateTrade {
    side: "BUY" | "SELL";
    mood: string;
    openTime: string;
    closeTime: string;
    entryPrice: number;
    closePrice: number;
    stopLossPrice: number;
    netProfit: number;
    pipValue: number;
    commisions: number;
    user: { id: number };
    asset: { id: number };
    brokerAccount: { id: number };
  }
  