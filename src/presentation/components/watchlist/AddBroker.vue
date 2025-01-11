<template>
  <q-card class="q-pa-md container-add-broker" style="max-width: 400px;">
    <q-card-section>
      <div>Agregar Cuenta de Broker</div>
    </q-card-section>

    <q-card-section>
      <q-select
        v-model="selectedBroker"
        :options="brokerOptions"
        label="Broker"
        option-label="label"
        option-value="value"
        filled
        dense
      />
      <q-input
        v-model="accountId"
        label="ID de Cuenta"
        filled
        dense
        class="q-mt-sm"
        placeholder="(Opcional)"
      />
      <q-select
        v-model="selectedAccountType"
        :options="accountTypeOptions"
        label="Tipo de Cuenta"
        option-label="label"
        option-value="value"
        filled
        dense
        class="q-mt-sm"
      />
      <q-select
        v-model="currency"
        :options="currencyOptions"
        label="Moneda de Cuenta"
        filled
        dense
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        label="Agregar Cuenta"
        color="primary"
        class="q-mt-md"
        @click="submitAccount"
        :disable="!isFormValid"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProfileStore } from "../../../application/stores/useProfileStore";

const emit = defineEmits(['close']);

// Interfaces
interface BrokerOption {
  value: number;
  label: string;
}

interface AccountTypeOption {
  value: string;
  label: string;
}

// Campos del formulario
const selectedBroker = ref<BrokerOption | null>(null);
const accountId = ref("");
const selectedAccountType = ref<AccountTypeOption | null>(null);
const currency = ref("");

const brokerOptions: BrokerOption[] = [
  { value: 318, label: "360 Capital Ltd" }
];

const accountTypeOptions: AccountTypeOption[] = [
  { value: "DEMO", label: "Demo" },
  { value: "LIVE", label: "Live" },
];

const currencyOptions: string[] = ["USD", "EUR", "GBP", "COP"];
const isFormValid = computed(() => {
  return selectedBroker.value && selectedAccountType.value && currency.value;
});

const profileStore = useProfileStore();

const submitAccount = async () => {
  if (!isFormValid.value) {
    console.error("Formulario inválido. Por favor completa todos los campos.");
    return;
  }

  if (!selectedBroker.value || !selectedAccountType.value) {
    console.error("Broker y tipo de cuenta son requeridos");
    return;
  }

  const payload = {
    broker: {
      id: Number(selectedBroker.value.value) 
    },
    user: {
      id: profileStore.userInfo?.id || 0
    },
    type: String(selectedAccountType.value.value), 
    identifier: accountId.value || "",
    currency: currency.value,
    token: localStorage.getItem("authToken") || "",
  };

  try {
    const result = await profileStore.addBroker(payload);
    if (result.success) {
      emit('close')
      resetForm();
    } else {
      console.error("Error al agregar cuenta de broker:", result.message);
    }
  } catch (error) {
    console.error("Error en submitAccount:", error);
  }
};
const resetForm = () => {
  selectedBroker.value = null;
  accountId.value = "";
  selectedAccountType.value = null;
  currency.value = "";
};
</script>

<style scoped>
.container-add-broker {
  color: black;
  text-align: center;
}
</style>