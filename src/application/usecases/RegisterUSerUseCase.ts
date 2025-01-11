
import { RegisteringUser} from '../../domain/entities/RegisteringUser';
import type { IUserRepository } from '../repositories/IUserRepository';
import type { RegisterResponse } from '../types/UserResponse';


export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: RegisteringUser): Promise<{ success: boolean; data?: RegisterResponse; message: string }> {
    try {
      const response = await this.userRepository.registerUser(user);

      if (response && response.id) {
        return {
          success: true,
          data: response, 
          message: 'Usuario registrado con éxito.',
        };
      } else {
        return {
          success: false,
          message: 'Error inesperado al registrar el usuario. Intenta nuevamente.',
        };
      }
    } catch (error: any) {
      console.error('Error en RegisterUserUseCase:', error);

      const errorMessage = error.response?.data?.message || 'No se pudo completar el registro. Intenta nuevamente.';
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}
