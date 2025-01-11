import type { IUserRepository } from "../repositories/IUserRepository";


export class SendActivationCodeUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<{ success: boolean; message: string }> {
    const response = await this.userRepository.sendActivationCode(email);
    return {
      success: response.success,
      message: response.success ? 'Código enviado con éxito.' : response.message || 'Error al enviar el código.',
    };
  }
}
