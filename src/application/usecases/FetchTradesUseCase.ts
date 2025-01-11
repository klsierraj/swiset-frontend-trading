import type { TradeRepository } from "../../infrastructure/repositories/TradeRepository";
import type { PaginatedTradeResponse } from "../types/TradeResponse";


export class FetchTradesUseCase {
  constructor(private tradeRepository: TradeRepository) {}

  async execute(assetIds: string[], brokerAccountIds: number[], page: number, size: number, authToken: string): Promise<PaginatedTradeResponse> {
    return this.tradeRepository.fetchTrades( assetIds, brokerAccountIds, page, size, authToken);
  }
}
