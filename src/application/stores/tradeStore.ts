import { defineStore } from "pinia";
import { ref } from "vue";
import { CreateTradeUseCase } from "../../application/usecases/CreateTradeUseCase";
import { TradeRepository } from "../../infrastructure/repositories/TradeRepository";
import { Trade } from "../../domain/entities/Trade";
import { FetchTradesUseCase } from "../usecases/FetchTradesUseCase";
import type { TradeResponse } from "../types/TradeResponse";
import { Notify } from "quasar";

const tradeRepository = new TradeRepository();
const createTradeUseCase = new CreateTradeUseCase(tradeRepository);
const fetchTradesUseCase = new FetchTradesUseCase(tradeRepository);

export const useTradeStore = defineStore("trade", () => {
  const isLoading = ref(false);
  const trades = ref<TradeResponse[]>([]);
  const errorMessage = ref("");
  const selectedTrade = ref<Trade | null>(null);

  const setSelectedTrade = (trade: Trade | null) => {
    
    selectedTrade.value = trade;
  }
  const clearSelectedTrade = () => {
    selectedTrade.value = null;
  };

  const createTrade = async (trade: Trade, token: string): Promise<{ id: number }> => {
    try {
      isLoading.value = true;
      return await createTradeUseCase.execute(trade, token);
    } catch (error: any) {
      errorMessage.value = error.message || "Error al crear el trade.";
      Notify.create({ type: "negative", message: errorMessage.value });
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchTrades = async (
    assetIds: string[],
    brokerAccountIds: number[],
    page: number,
    size: number,
    authToken: string
  ) => {
    try {
      isLoading.value = true;
      errorMessage.value = "";

      const response = await fetchTradesUseCase.execute(
        assetIds,
        brokerAccountIds,
        page,
        size,
        authToken
      );

      trades.value = response.content; // Guardamos los trades en el estado
    } catch (error: any) {
      console.error("Error al obtener los trades:", error.message);
      errorMessage.value = error.message || "Error al obtener los trades.";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    errorMessage,
    trades,
    selectedTrade,
    createTrade,
    fetchTrades,
    setSelectedTrade,
    clearSelectedTrade
  };
});
