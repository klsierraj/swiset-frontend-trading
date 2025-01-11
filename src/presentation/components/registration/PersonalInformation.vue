<template>
  <div class="personal-information-container">
    <h2 class="text-h5">Información Personal</h2>
    <p>Completa la siguiente información para continuar con tu registro.</p>

    <q-input
      filled
      v-model="formData.firstName"
      label="Nombres"
      placeholder="Ingresa tus nombres"
      class="q-mt-md"
    />

    <!-- Campo para el apellido -->
    <q-input
      filled
      v-model="formData.lastName"
      label="Apellidos"
      placeholder="Ingresa tus apellidos"
      class="q-mt-md"
    />


    <q-input
      filled
      v-model="formData.email"
      label="Email"
      placeholder="Ingresa tu email"
      class="q-mt-md"
    />

    <q-btn
      label="Siguiente »"
      class="q-mt-md full-width"
       style="background-color: var(--primary-color); color: black;"
      :disable="!isComplete"
      @click="handleNext"
    />

    <!-- Modal para mensajes -->
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
const { formData, validateEmail, closeModal } = registrationStore;
const { showModal, modalMessage } = storeToRefs(registrationStore);
const isComplete = computed(() => {
  return (
    formData.firstName.trim() && 
    formData.lastName.trim() && 
    formData.email.trim()
  );
});

const handleNext = async () => {
  try {
    await validateEmail();
  } catch (error) {
    console.error('Error al avanzar:', error); 
  }
};
</script>

<style scoped>
.personal-information-container {
  text-align: center;
}
.personal-information-container, h2 {
color: black;
}
</style>
