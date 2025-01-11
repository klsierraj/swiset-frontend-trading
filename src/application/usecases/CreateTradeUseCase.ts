import { Trade } from "../../domain/entities/Trade";
import { TradeRepository } from "../../infrastructure/repositories/TradeRepository";
import type { ICreateTrade } from "../types/ICreateTrade";


export class CreateTradeUseCase {
  constructor(private tradeRepository: TradeRepository) {}

  async execute(trade: Trade, token: string): Promise<{ id: number }> {
    trade.validate();
    const payload: ICreateTrade = {
      side: trade.side,
      mood: trade.mood,
      openTime: trade.openTime,
      closeTime: trade.closeTime,
      entryPrice: trade.entryPrice,
      closePrice: trade.closePrice,
      stopLossPrice: trade.stopLossPrice,
      netProfit: trade.netProfit,
      pipValue: trade.pipValue,
      commisions: trade.commisions,
      user: { id: trade.userId },
      asset: { id: trade.assetId },
      brokerAccount: { id: trade.brokerAccountId },
    };

    return this.tradeRepository.createTrade(payload, token);
  }
}
