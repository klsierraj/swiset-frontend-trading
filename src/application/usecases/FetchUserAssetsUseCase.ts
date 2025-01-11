import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Asset } from '../../domain/entities/Asset';

export class FetchUserAssetsUseCase {
  constructor(private userRepository: UserRepository) {}

  /**
   * Ejecuta el caso de uso para obtener los assets de un usuario.
   * @param userId - ID del usuario.
   * @param token - Token de autenticación.
   * @returns Lista de assets del usuario.
   */
  async execute(userId: number, token: string): Promise<Asset[]> {
    try {
      const assets = await this.userRepository.fetchUserAssets(userId, token);
      return assets;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error en FetchUserAssetsUseCase:', error.message);
        throw new Error('No se pudo obtener los assets del usuario.');
      } else {
        console.error('Error inesperado:', error);
        throw new Error('Ha ocurrido un error desconocido.');
      }
    }
  }
}

