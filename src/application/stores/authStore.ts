import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import router from '../../presentation/router';

// Instancia del repositorio
const authRepository = new AuthRepository();

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('authToken') || null);
  const isProcessing = ref(false);
  const errorMessage = ref('');

  // Computed: Determina si el usuario está autenticado y el token no está expirado
  const isAuthenticated = computed(() => !!token.value && !isTokenExpired(token.value));

  // Decodificar el payload del JWT
  const decodeToken = (jwt: string): { [key: string]: any } | null => {
    try {
      const payload = jwt.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

  // Verificar si el token ha expirado
  const isTokenExpired = (jwt: string): boolean => {
    const decoded = decodeToken(jwt);
    if (!decoded || !decoded.exp) {
      return true; // Token inválido o sin expiración
    }
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decoded.exp < currentTime; // Comparar expiración con el tiempo actual
  };

  // Login
  const login = async (username: string, password: string) => {
    try {
      isProcessing.value = true;
      errorMessage.value = '';

      const response = await authRepository.login(username, password);

      if (response.token) {
        token.value = response.token;

        // Guardar token en localStorage
        localStorage.setItem('authToken', response.token);
        router.push({ name: 'journal' });
      }
    } catch (error: any) {
      console.error('Error en login:', error);
      errorMessage.value = error.message || 'Error al intentar iniciar sesión.';
    } finally {
      isProcessing.value = false;
    }
  };

  // Logout
  const logout = () => {
    token.value = null;

    // Eliminar token de localStorage
    localStorage.removeItem('authToken');

    // Redirigir al login
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
