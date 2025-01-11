import { defineStore } from "pinia";
import { ref } from "vue";
import { CreateTradeUseCase } from "../../application/usecases/CreateTradeUseCase";
import { TradeRepository } from "../../infrastructure/repositories/TradeRepository";
import { Trade } from "../../domain/entities/Trade";

const tradeRepository = new TradeRepository();
const createTradeUseCase = new CreateTradeUseCase(tradeRepository);

export const useTradeStore = defineStore("trade", () => {
  const isLoading = ref(false);
  const errorMessage = ref("");

  const createTrade = async (trade: Trade, token: string): Promise<{ id: number }> => {
    try {
      isLoading.value = true;
      return await createTradeUseCase.execute(trade, token);
    } catch (error: any) {
      errorMessage.value = error.message || "Error al crear el trade.";
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    errorMessage,
    createTrade,
  };
});
