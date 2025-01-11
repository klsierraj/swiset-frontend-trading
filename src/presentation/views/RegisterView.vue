<template>
  <div class="q-pa-md">
    <q-stepper v-model="registrationStore.currentStep" ref="stepper" animated>
      <q-step :name="1" prefix="1" title="Información Personal">
        <PersonalInformation />
      </q-step>
      <q-step :name="2" prefix="2" title="Credenciales">
        <CredentialsForm />
      </q-step>
      <q-step :name="3" prefix="3" title="Verificación">
        <VerificationForm />
      </q-step>
    </q-stepper>
  </div>
</template>

<script setup lang="ts">
import { useRegistrationStore } from "../../application/stores/registrationStore";
import PersonalInformation from "../components/registration/PersonalInformation.vue";
import CredentialsForm from "../components/registration/CredentialsForm.vue";
import VerificationForm from "../components/registration/VerificationForm.vue";

const registrationStore = useRegistrationStore();
</script>

<style scoped></style>
