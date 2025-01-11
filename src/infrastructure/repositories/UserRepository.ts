import axios from 'axios';

import { RegisteringUser } from '../../domain/entities/RegisteringUser';
import type { IUserRepository } from '../../application/repositories/IUserRepository';
import type { RegisterResponse } from '../../application/types/UserResponse';
import type { IAccountDetails } from '../../application/types/IAccountDetails';
import  { Asset } from '../../domain/entities/Asset';
import type { IBrokerAccount } from '../../application/types/IBrokerAccount';

const API_BASE_URL = 'https://api.swiset.com/api';

export class UserRepository implements IUserRepository {
    async checkUserExists(email: string = '', username: string = ''): Promise<number> {
        const params = {
          email,
          username,
        };
    
        try {
          const response = await axios.get(`${API_BASE_URL}/ext/users/exists`, { params });
          return response.data;
        } catch (error) {
          console.error('Error en UserRepository.checkUserExists:', error);
          throw new Error('No se pudo verificar la existencia del usuario.');
        }
      }

  async registerUser(user: RegisteringUser): Promise<RegisterResponse> {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      phoneNumber: 'NOT REGISTERED',
      langKey: 'es',
      channel: 'OTHER',
      withoutAuth: true,
    };

    const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/register-collapsed`, payload);
    return response.data as RegisterResponse;
  }

  async sendActivationCode(email: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/account/get-activation-key`,
        new URLSearchParams({ [email]: '' }).toString(),
        { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      );
      return { success: response.status === 200 };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Error al enviar el código.';
      return { success: false, message: errorMessage };
    }
  }

  async validateActivationCode(email: string, key: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/activate?email=${encodeURIComponent(email)}&key=${key}`
      );
 
      if (typeof response.data === 'string') {
        return { success: true, message: response.data };
      }
  
      return { success: false, message: 'Respuesta inesperada del servidor.' };
    } catch (error: any) {
      if (error.response?.status === 500) {
        const errorMessage = error.response?.data?.detail || 'Error desconocido en el servidor.';
        return { success: false, message: errorMessage };
      }
      return { success: false, message: 'Error de conexión. Intenta nuevamente.' };
    }
  }

  async fetchAccountDetails(token: string): Promise<IAccountDetails> {
    try {
      const response = await axios.get<IAccountDetails>(`${API_BASE_URL}/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener los detalles de la cuenta:', error.message);

      if (error.response?.status === 401) {
        throw new Error('No autorizado. Verifica tus credenciales.');
      }

      throw new Error('No se pudo obtener la información del usuario.');
    }
  }

  async fetchUserAssets(userId: number, token: string): Promise<Asset[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/ext/assets/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      return response.data.map((asset: any) => {
        return new Asset(
          asset.id,
          asset.ticker,
          asset.assetName,
          asset.market.name,
          asset.market.description
        );
      });
    } catch (error: any) {
      console.error('Error en fetchUserAssets:', error);
      throw new Error('No se pudieron obtener los assets del usuario.');
    }
  }

  async fetchUserBrokers(token: string): Promise<IBrokerAccount[]> {
    try {
      const response = await axios.get<IBrokerAccount[]>(
        `${API_BASE_URL}/ext/broker-accounts/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
  
      return response.data;
    } catch (error: any) {
      console.error('Error en UserRepository.fetchUserBrokers:', error.message);
      throw new Error('No se pudo obtener la información de los brokers.');
    }
  }
  async addBroker(payload: {
    broker: { id: number };
    user: { id: number };
    type: string;
    identifier: string;
    currency: string;
    token: string;
  }): Promise<{ id: number }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/broker-accounts`,
        {
          broker: payload.broker,
          user: payload.user,
          type: payload.type,
          identifier: payload.identifier,
          currency: payload.currency,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en UserRepository.addBroker:", error.message);
      throw new Error("Error al agregar el broker.");
    }
  }
  
  
  
  
}
