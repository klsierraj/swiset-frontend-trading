import type { IUserRepository } from "../repositories/IUserRepository";


export class ValidateActivationCodeUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, key: string): Promise<{ success: boolean; message: string }> {
    const response = await this.userRepository.validateActivationCode(email, key);
    return {
      success: response.success,
      message: response.success ? response.message || 'Código validado con éxito.' : response.message || 'Código inválido.',
    };
  }
}
