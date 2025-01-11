export interface TradeApiResponse {
    id: number;
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
    user: {
      id: number;
    };
    asset: {
      id: number;
    };
    brokerAccount: {
      id: number;
    };
  }
  
  export class Trade {
    constructor(
      public side: "BUY" | "SELL",
      public mood: string,
      public openTime: string,
      public closeTime: string,
      public entryPrice: number,
      public closePrice: number,
      public stopLossPrice: number,
      public netProfit: number,
      public pipValue: number,
      public commisions: number,
      public userId: number,
      public assetId: number,
      public brokerAccountId: number
    ) {}
  
    validate(): void {

      if (new Date(this.closeTime) <= new Date(this.openTime)) {
        throw new Error("El tiempo de cierre no puede ser menor o igual al tiempo de apertura.");
      }
      if (this.entryPrice <= 0) {
        throw new Error("El precio de entrada debe ser mayor a 0.");
      }
      if (this.closePrice <= 0) {
        throw new Error("El precio de cierre debe ser mayor a 0.");
      }
      if (this.stopLossPrice <= 0) {
        throw new Error("El precio de stop loss debe ser mayor a 0.");
      }
  

      if (this.pipValue < 0) {
        throw new Error("El valor del pip no puede ser negativo.");
      }

      if (this.commisions < 0) {
        throw new Error("Las comisiones no pueden ser negativas.");
      }
      if (this.netProfit < 0) {
        console.warn("El beneficio neto es negativo, revisa los valores ingresados.");
      }
    }
  
    static fromApiResponse(apiResponse: TradeApiResponse): Trade {
      return new Trade(
        apiResponse.side,
        apiResponse.mood,
        apiResponse.openTime,
        apiResponse.closeTime,
        apiResponse.entryPrice,
        apiResponse.closePrice,
        apiResponse.stopLossPrice,
        apiResponse.netProfit,
        apiResponse.pipValue,
        apiResponse.commisions,
        apiResponse.user.id,
        apiResponse.asset.id,
        apiResponse.brokerAccount.id
      );
    }
  
    toApiPayload(): Omit<TradeApiResponse, "id"> {
      return {
        side: this.side,
        mood: this.mood,
        openTime: this.openTime,
        closeTime: this.closeTime,
        entryPrice: this.entryPrice,
        closePrice: this.closePrice,
        stopLossPrice: this.stopLossPrice,
        netProfit: this.netProfit,
        pipValue: this.pipValue,
        commisions: this.commisions,
        user: { id: this.userId },
        asset: { id: this.assetId },
        brokerAccount: { id: this.brokerAccountId },
      };
    }
  }
  