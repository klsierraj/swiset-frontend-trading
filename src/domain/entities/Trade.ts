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
      // Validación de tiempo de cierre > tiempo de apertura
      if (new Date(this.closeTime) <= new Date(this.openTime)) {
        throw new Error("El tiempo de cierre no puede ser menor o igual al tiempo de apertura.");
      }
  
      // Validación de precios y valores positivos
      if (this.entryPrice <= 0 || this.closePrice <= 0 || this.stopLossPrice <= 0) {
        throw new Error("Los precios de entrada, cierre y stop loss deben ser mayores a 0.");
      }
  
      // Validación de pipValue
      if (this.pipValue < 0) {
        throw new Error("El valor del pip no puede ser negativo.");
      }
  
      // Comisiones y netProfit pueden ser 0, pero no negativos
      if (this.commisions < 0) {
        throw new Error("Las comisiones no pueden ser negativas.");
      }
  
      if (this.netProfit < 0) {
        console.warn("El beneficio neto es negativo, revisa los valores ingresados.");
      }
    }
  }
  