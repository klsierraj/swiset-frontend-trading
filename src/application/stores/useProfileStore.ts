import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { FetchAccountDetailsUseCase } from '../../application/usecases/FetchAccountDetailsUseCase';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { AuthenticatedUser } from '../../domain/entities/AuthenticatedUser';
import type { Asset } from '../../domain/entities/Asset';
import { FetchUserAssetsUseCase } from '../usecases/FetchUserAssetsUseCase';
import type { IBrokerAccount } from '../types/IBrokerAccount';
import { FetchUserBrokersUseCase } from '../usecases/FetchUserBrokersUseCase';
import { AddBrokerUseCase } from '../usecases/AddBrokerUseCase';

const userRepository = new UserRepository();
const fetchAccountDetailsUseCase = new FetchAccountDetailsUseCase(userRepository);
const fetchUserAssetsUseCase = new FetchUserAssetsUseCase(userRepository);
const fetchUserBrokersUseCase = new FetchUserBrokersUseCase(userRepository);
const addBrokerUseCase = new AddBrokerUseCase(userRepository); 

export const useProfileStore = defineStore('profile', () => {
  const userInfo = ref<AuthenticatedUser | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref('');
  const userAssets = ref<Asset[]>([]);
  const brokers = ref<IBrokerAccount[]>([]);
  const isLoadingAssets = ref(false);
  const isProcessing = ref(false); 

  const candAddTrade = computed(() => {
    return userAssets.value.length > 0 && brokers.value.length > 0;
  });

  const shouldAddAsset = computed(() => {
    return userAssets.value.length === 0;
  });

  const shouldAddBroker = computed(() => {
    return brokers.value.length === 0;
  });

  const fetchAccountDetails = async (token: string) => {
    try {
      isLoading.value = true;
      errorMessage.value = '';
      userInfo.value = await fetchAccountDetailsUseCase.execute(token);
    } catch (error: any) {
      errorMessage.value = error.message || 'Error al cargar los detalles del usuario.';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUserAssets = async (userId: number, token: string) => {
    try {
      isLoadingAssets.value = true;
      userAssets.value = await fetchUserAssetsUseCase.execute(userId, token);
    } catch (error: any) {
      console.error('Error en fetchUserAssets:', error);
    } finally {
      isLoadingAssets.value = false;
    }
  };

  const fetchUserBrokers = async (token: string) => {
    try {
      isLoading.value = true;
      brokers.value = await fetchUserBrokersUseCase.execute(token);
    } catch (error: any) {
      errorMessage.value = 'Error al obtener los brokers del usuario.';
    } finally {
      isLoading.value = false;
    }
  };

  const addBroker = async (payload: {
    broker: { id: number };
    user: { id: number };
    type: string;
    identifier: string;
    currency: string;
    token: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      isLoading.value = true;
      const result = await addBrokerUseCase.execute(payload);
      await fetchUserBrokers(payload.token);
      return result;
    } catch (error: any) {
      console.error("Error en addBroker:", error);
      errorMessage.value = error.message || "Error al agregar el broker.";
      return { success: false, message: error.message || "Error al agregar el broker." };
    } finally {
      isLoading.value = false;
    }
  };

  const hasAssets = computed(() => userAssets.value.length > 0);

  return {
    userInfo,
    isLoading,
    isLoadingAssets,
    isProcessing,
    userAssets,
    errorMessage,
    fetchAccountDetails,
    fetchUserAssets,
    hasAssets,
    fetchUserBrokers,
    candAddTrade,
    shouldAddAsset,
    shouldAddBroker,
    brokers,
    addBroker, 
  };
});
