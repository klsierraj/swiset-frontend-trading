import type { IUserRepository } from "../repositories/IUserRepository";

export class AddBrokerUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(payload: {
    broker: { id: number };
    user: { id: number };
    type: string;
    identifier: string;
    currency: string;
    token: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.userRepository.addBroker(payload);
      return { success: true, message: `Broker agregado con éxito. ID: ${result.id}` };
    } catch (error: any) {
      console.error("Error en AddBrokerUseCase:", error.message);
      return { success: false, message: error.message || "Error al agregar el broker." };
    }
  }
}
