import axios from 'axios';
import type { IAuthRepository } from '../../application/repositories/IAuthRepository';

export class AuthRepository implements IAuthRepository {
  private readonly API_BASE_URL = 'https://api.swiset.com/api';

  async login(username: string, password: string): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${this.API_BASE_URL}/authenticate`, {
        username,
        password,
    
      });
      if (response.data.id_token) {
        return { token: response.data.id_token };
      } else {
        throw new Error('No se recibió un token válido del servidor.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        throw new Error('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
      }
      console.error('Error en AuthRepository.login:', error);
      throw new Error('No se pudo completar el login. Intenta nuevamente.');
    }
  }
}
