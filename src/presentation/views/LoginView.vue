<template>
  <div class="login-container q-pa-lg">
    <q-card class="q-mx-auto" style="max-width: 400px;">
      <q-card-section>
        <h2 style="color: black;" class="text-h5 text-center">Inicia Sesión</h2>
        <p class="text-subtitle1 text-center q-mt-none" style="color: black;">
          Ingresa tus credenciales para continuar.
        </p>
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="username"
          label="Correo Electrónico o Usuario"
          placeholder="Ingresa tu usuario o correo"
          class="q-mb-md"
          :disable="isProcessing"
          @keydown="handleKeydown"
        />
        <q-input
          filled
          v-model="password"
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          class="q-mb-md"
          :disable="isProcessing"
          @keydown="handleKeydown"
        />
        <q-btn
          label="Iniciar Sesión"
          class="full-width"
          style="background-color: var(--primary-color); color: black;"
          :disable="isProcessing || !isFormValid"
          @click="handleLogin"
        />
      </q-card-section>
      <q-card-section v-if="errorMessage" class="text-negative text-center">
        {{ errorMessage }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../../application/stores/authStore';
import { Notify } from 'quasar';

const username = ref('');
const password = ref('');

const authStore = useAuthStore();
const { login, isProcessing, errorMessage } = authStore;



const isFormValid = computed(() => username.value.trim() && password.value.trim());

const handleLogin = async () => {
  try {
    await login(username.value, password.value);
  } catch (error) {
    Notify.create({ type: 'negative', message: 'Error al iniciar sesión. Por favor, intenta nuevamente.' });
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && isFormValid.value && !isProcessing) {
    handleLogin();
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
