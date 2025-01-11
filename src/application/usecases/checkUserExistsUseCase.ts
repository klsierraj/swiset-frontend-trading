import type { IUserRepository } from "../repositories/IUserRepository";

export class CheckUserExistsUseCase {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Ejecuta la lógica para verificar la existencia de un usuario por email o username.
   * 
   * @param email - Correo electrónico a verificar (opcional).
   * @param username - Nombre de usuario a verificar (opcional).
   * @returns {Promise<{ exists: boolean; message: string }>} - Resultado de la validación.
   */
  async execute(email: string = '', username: string = ''): Promise<{ exists: boolean; message: string }> {
    try {
      const response = await this.userRepository.checkUserExists(email, username);

      if (response === 1) {
        return { exists: true, message: 'El email ya está registrado. Por favor, inicia sesión.' };
      } else if (response === 2) {
        return { exists: true, message: 'El nombre de usuario ya está en uso. Intenta con otro.' };
      } else if (response === -1) {
        return { exists: false, message: '' };
      } else {
        return { exists: true, message: 'Respuesta inesperada del servidor.' };
      }
    } catch (error) {
      console.error('Error en CheckUserExistsUseCase:', error);
      throw new Error('No se pudo verificar el usuario.');
    }
  }
}
