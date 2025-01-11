import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import router from '../../presentation/router';
import { Notify } from 'quasar';
const authRepository = new AuthRepository();

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken') || null);
  const isProcessing = ref(false);
  const errorMessage = ref('');

  const isAuthenticated = computed(() => !!token.value && !isTokenExpired(token.value));
  const decodeToken = (jwt: string): { [key: string]: any } | null => {
    try {
      const payload = jwt.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };


  const isTokenExpired = (jwt: string): boolean => {
    const decoded = decodeToken(jwt);
    if (!decoded || !decoded.exp) {
      return true; 
    }
    const currentTime = Math.floor(Date.now() / 1000); 
    return decoded.exp < currentTime; 
  };

  const login = async (username: string, password: string) => {
    try {
      isProcessing.value = true;
      errorMessage.value = '';

      const response = await authRepository.login(username, password);

      if (response.token) {
        token.value = response.token;
        localStorage.setItem('authToken', response.token);
        router.push({ name: 'journal' });
      }
    } catch (error: any) {
      Notify.create({ type: 'negative', message: error.message || 'Error al iniciar sesión.' });
      errorMessage.value = error.message || 'Error al intentar iniciar sesión.';
    } finally {
      isProcessing.value = false;
    }
  };
  const logout = () => {
    token.value = null;

    localStorage.removeItem('authToken');
    router.push({ name: 'login' });
  };

  return {
    token,
    isProcessing,
    errorMessage,
    isAuthenticated,
    login,
    logout,
  };
});
