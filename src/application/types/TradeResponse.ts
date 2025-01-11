export interface TradeResponse {
    id: number;
    side: "BUY" | "SELL";
    mood: string;
    openTime: string;
    closeTime: string;
    tradeTime: string;
    entryPrice: number;
    closePrice: number;
    stopLossPrice: number;
    pipValue: number;
    netProfit: number;
    commisions: number;
    asset: {
      id: number;
      ticker: string;
      assetName: string;
    };
    brokerAccount: {
      id: number;
      type: string;
      currency: string;
    };
  }
  
  export interface PaginatedTradeResponse {
    content: TradeResponse[];
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    totalElements: number;
    totalPages: number;
  }
  