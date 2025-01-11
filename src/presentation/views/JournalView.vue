<template>
    <div>
      <div>
        <h2>Journal</h2>
      </div>
      <div>
        <span>Nota para la persona que revise:</span>
        <br>
        <span>No logré encontrar el endpoint para agregar un asset a un usuario. Asegurate de tener un usuario con assets agregandolo desde la App de SWISET para poder crear un trade</span>
        <br>
        <q-btn
          style="background-color: var(--primary-color); color: black;"
          @click="addTrade"
        >
          <q-icon name="add" />
          Crear trade
        </q-btn>
        <div style="margin-top: 2em;">
          <ListTrades />
        </div>
       

          <q-dialog v-model="showErrorModal">
          <ErrorAddingTrade @close="closeErrorModal" @navigate="navigateToAddBrokerAndAsset" />
        </q-dialog>
          <q-dialog v-model="showAddTradeModal">
          <AddTradeForm  @close="closeAddTradeModal" @tradeAdded = "onTradeAdded" />
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
import ListTrades from '../components/trades/ListTrades.vue';
import { useTradeStore } from '../../application/stores/tradeStore';
import type { TradeResponse } from '../../application/types/TradeResponse';
  
  // Modales
  const showErrorModal = ref(false);
  const showAddTradeModal = ref(false);
  
  // Store
  const profileStore = useProfileStore();
  const tradeStore = useTradeStore();
  
  const onTradeAdded = (newTrade: TradeResponse) => {
    tradeStore.trades.unshift(newTrade); 
  }

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
  