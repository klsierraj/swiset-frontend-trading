import axios from "axios";
import type { ICreateTrade } from "../../application/types/ICreateTrade";


const API_BASE_URL = "https://api.swiset.com/api/ext";

export class TradeRepository {
  async createTrade(payload: ICreateTrade, token: string): Promise<{ id: number }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/trades`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data; // El backend devuelve el ID del trade creado
    } catch (error: any) {
      console.error("Error en TradeRepository.createTrade:", error.message);
      throw new Error("Error al crear el trade.");
    }
  }
}
