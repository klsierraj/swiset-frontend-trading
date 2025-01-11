import type { IUserRepository } from '../repositories/IUserRepository';
import type { IBrokerAccount } from '../types/IBrokerAccount';

export class FetchUserBrokersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(token: string): Promise<IBrokerAccount[]> {
    try {
      return await this.userRepository.fetchUserBrokers(token);
    } catch (error: any) {
      console.error('Error en FetchUserBrokersUseCase:', error.message);
      throw new Error('No se pudieron obtener los brokers.');
    }
  }
}
