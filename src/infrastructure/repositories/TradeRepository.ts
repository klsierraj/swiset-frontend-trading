import axios from "axios";
import type { ICreateTrade } from "../../application/types/ICreateTrade";
import type { PaginatedTradeResponse } from "../../application/types/TradeResponse";


const API_BASE_URL = "https://api.swiset.com/api";

export class TradeRepository {
  async createTrade(payload: ICreateTrade, token: string): Promise<{ id: number }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/ext/trades`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error("Error al crear el trade.");
    }
  }

  async fetchTrades(
    assetIds: string[],
    brokerAccountIds: number[],
    page: number,
    size: number,
    authToken: string
  ): Promise<PaginatedTradeResponse> {
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1); 
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 1); 

    const payload = {
      allStrategies: true,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      side: "All",
      mood: [
        "ANXIOUS", "HAPPY", "RELAXED", "CAUTIOUS", "CONCENTRATED",
        "CONFIDENT", "EXCITED", "OPTIMISTIC", "AGGRESSIVE", "ANGRY",
        "BORED", "HURT", "MAD", "NERVOUS", "SAD", "UPSET", "SICK", "NONE",
      ],
      asset: assetIds,
      brokerAccount: brokerAccountIds,
      result: "All",
      strategy: ["-1"],
    };

    const response = await axios.post<PaginatedTradeResponse>(
      `${API_BASE_URL}/ext/trades/filter/?size=${size}&page=${page}&sort=openTime,desc`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
}
