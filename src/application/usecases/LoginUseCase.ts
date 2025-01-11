import type { IAuthRepository } from "../repositories/IAuthRepository";

export class LoginUseCase {
    constructor(private authRepository: IAuthRepository) {}
  
    async execute(username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
      try {
        const response = await this.authRepository.login(username, password);
        return {
          success: true,
          token: response.token,
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message || 'Error al intentar iniciar sesión.',
        };
      }
    }
  }