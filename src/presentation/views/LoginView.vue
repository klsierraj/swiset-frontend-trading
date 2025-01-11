<template>
    <div class="login-container q-pa-lg">
      <q-card class="q-mx-auto" style="max-width: 400px;">
        <!-- Encabezado -->
        <q-card-section>
          <h2 style="color: black;" class="text-h5 text-center">Inicia Sesión</h2>
          <p class="text-subtitle1 text-center q-mt-none" style="color: black;">
            Ingresa tus credenciales para continuar.
          </p>
        </q-card-section>
  
        <!-- Formulario -->
        <q-card-section>
          <q-input
            filled
            v-model="username"
            label="Correo Electrónico o Usuario"
            placeholder="Ingresa tu usuario o correo"
            class="q-mb-md"
            :disable="isProcessing"
          />
          <q-input
            filled
            v-model="password"
            label="Contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
            class="q-mb-md"
            :disable="isProcessing"
          />
          <q-btn
            label="Iniciar Sesión"
            class="full-width"
            style="background-color: var(--primary-color); color: black;"
            :disable="isProcessing || !isFormValid"
            @click="handleLogin"
          />
        </q-card-section>
  
        <!-- Mensaje de error -->
        <q-card-section v-if="errorMessage" class="text-negative text-center">
          {{ errorMessage }}
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
import { useAuthStore } from '../../application/stores/authStore';

  
  // Variables locales
  const username = ref('');
  const password = ref('');
  
  // Acceso al store de autenticación
  const authStore = useAuthStore();
  const { login, isProcessing, errorMessage } = authStore;
  
  // Validación del formulario
  const isFormValid = computed(() => username.value.trim() && password.value.trim());
  
  // Manejo del evento de login
  const handleLogin = async () => {
    try {
      await login(username.value, password.value);
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  