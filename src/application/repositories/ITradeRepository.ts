import type { Trade } from "../../domain/entities/Trade";

export interface ITradeRepository {
    createTrade(trade: Trade): Promise<{ id: number }>;
  }
  