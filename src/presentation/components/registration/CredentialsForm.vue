<template>
  <div>
    <h1 class="text-h5">Credenciales</h1>
    <q-input
      filled
      v-model="formData.username"
      label="Nombre de Usuario"
      placeholder="Ingresa tu nombre de usuario"
      class="q-mt-md"
    />
    <q-input
      filled
      v-model="formData.password"
      type="password"
      label="Contraseña"
      placeholder="Ingresa tu contraseña"
      class="q-mt-md"
    />
    <div class="row justify-between q-mt-md">
      <q-btn label="← Atrás" outlined @click="goToPreviousStep" style="background-color: var(--primary-color); color: black;" />
      <q-btn
        label="Siguiente »"

        style="background-color: var(--primary-color); color: black;"
        :disable="!isComplete"
        @click="handleNext"
      />
    </div>
    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section>
          <p>{{ modalMessage }}</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Entendido" color="primary" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRegistrationStore } from '../../../application/stores/registrationStore';
import { storeToRefs } from 'pinia';

const registrationStore = useRegistrationStore();
const { formData, validateAndRegister, closeModal, goToPreviousStep } = registrationStore;
const { showModal, modalMessage } = storeToRefs(registrationStore);

const isComplete = computed(() => {
  return formData.username.trim() && formData.password.length >= 7;
});


const handleNext = async () => {
await validateAndRegister();
}
</script>
