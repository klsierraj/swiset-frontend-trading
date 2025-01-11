<template>
    <div>
      <div>
        <h2>Journal</h2>
      </div>
      <div>
        <q-btn
          style="background-color: var(--primary-color); color: black;"
          @click="addTrade"
        >
          <q-icon name="add" />
          Add trade
        </q-btn>
          <q-dialog v-model="showErrorModal">
          <ErrorAddingTrade @close="closeErrorModal" @navigate="navigateToAddBrokerAndAsset" />
        </q-dialog>
          <q-dialog v-model="showAddTradeModal">
          <AddTradeForm  @close="closeAddTradeModal" />
        </q-dialog>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useProfileStore } from '../../application/stores/useProfileStore';
  import ErrorAddingTrade from '../components/trades/ErrorAddingTrade.vue';
  import AddTradeForm from '../components/trades/AddTradeForm.vue';
import router from '../router';
  
  // Modales
  const showErrorModal = ref(false);
  const showAddTradeModal = ref(false);
  
  // Store
  const profileStore = useProfileStore();
  
  // Métodos
  const addTrade = () => {
    if (profileStore.candAddTrade) {
      showAddTradeModal.value = true; 
    } else {
      showErrorModal.value = true; 
    }
  };

  const navigateToAddBrokerAndAsset = () => {
      router.push({ name: 'watchlist' });
      closeErrorModal();
  }
  const closeErrorModal = () => {
    showErrorModal.value = false;
  };
  
  const closeAddTradeModal = () => {
    showAddTradeModal.value = false;
  };
  </script>
  