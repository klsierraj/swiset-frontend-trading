<template>
  <div class="verification-container">
    <h1 class="text-h5">Verifica tu Cuenta</h1>
    
    <div class="verification-content q-mt-md">
      <p class="text-body1">
        Hemos enviado un código de verificación a tu correo electrónico.
        Por favor, revisa tu bandeja de entrada e ingresa el código a continuación.
      </p>

      <div class="countdown-section q-mb-md">
        <template v-if="countdown > 0">
          <q-circular-progress
            show-value
            class="q-ma-md"
            :value="countdown"
            :max="60"
            :min="0"
            color="primary"
            size="50px"
          >
            {{ countdown }}
          </q-circular-progress>
          <p class="text-caption q-mt-sm">
            Podrás solicitar un nuevo código en {{ countdown }} segundos
          </p>
        </template>
        <q-btn
          v-else
          label="Reenviar Código"
          color="primary"
          :loading="isProcessing"
          @click="handleResendCode"
          class="q-mt-sm"
        />
      </div>

      <q-input
        ref="codeInput"
        v-model="activationCode"
        filled
        class="q-mt-lg"
        label="Código de Verificación"
        :rules="[codeRules]"
        :disable="isProcessing"
        :error="!!inputError"
        :error-message="inputError"
        mask="######"
        maxlength="6"
        type="number"
        @update:model-value="handleCodeInput"
      />
    </div>

    <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-center">{{ modalMessage }}</div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cerrar" color="primary" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useRegistrationStore } from '../../../application/stores/registrationStore';

const router = useRouter();
const store = useRegistrationStore();
const { 
  sendActivationCode, 
  validateActivationCode, 
  closeModal,
  startCountdown
} = store;

const { 
  showModal, 
  modalMessage, 
  countdown, 
  currentStep,
  isProcessing,

} = storeToRefs(store);

const activationCode = ref('');
const inputError = ref('');
const codeInput = ref<any | null>(null);

const codeRules = (val: string) => {
  if (!val) return 'El código es requerido';
  if (val.length !== 6) return 'El código debe tener 6 dígitos';
  if (!/^\d+$/.test(val)) return 'El código solo debe contener números';
  return true;
};

onMounted(() => {
  if (currentStep.value !== 3) {
    router.push('/register');
    return;
  }

  if (codeInput.value) {
    codeInput.value.focus();
  }
  startCountdown();
});

onUnmounted(() => {
  store.cleanup();
});

const handleCodeInput = async (value: string | number | null) => {
  inputError.value = '';
  
  const stringValue = String(value || '');  
  if (stringValue.length === 6) {
    await validateCode(stringValue);
  }
};

const validateCode = async (code: string) => {
  if (isProcessing.value) return;

  try {
    const isValid = await validateActivationCode(code);
    if (!isValid) {
      activationCode.value = '';
      codeInput.value?.focus();
    }
  } catch (error) {
    console.error('Error validando código:', error);
    activationCode.value = '';
    inputError.value = 'Ocurrió un error al validar el código. Por favor, intenta nuevamente.';
    codeInput.value?.focus();
  }
};

const handleResendCode = async () => {
  if (isProcessing.value || countdown.value > 0) return;

  try {
    await sendActivationCode();
    activationCode.value = '';
    inputError.value = '';
    codeInput.value?.focus();
  } catch (error) {
    console.error('Error al reenviar código:', error);
    inputError.value = 'Error al enviar el código. Por favor, intenta nuevamente.';
  }
};
</script>

<style scoped>
.verification-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  color: black;
  text-align: center;
}

.verification-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>