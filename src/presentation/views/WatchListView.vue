<template>
  <div class="watching-list-container">
    <h2 class="text-h5">Lista de seguimiento</h2>
    <div class="tracking-section">
      <h4 class="text-subtitle1">Tu Lista de seguimiento de cuentas de brokers</h4>
      <div class="broker-container">
        <q-card bordered class="tracking-card" @click="onOpenDialog('broker')">
        <q-card-section>
          <div class="add-item">
            <q-icon name="add" size="lg" />
            <span>Add Broker Account</span>
          </div>
        </q-card-section>
      </q-card>
      <div v-for="broker in brokers">
        <q-card bordered class="tracking-card">
          <q-card-section>
            <div class="broker-item"> 
              <span class="broker-label">Broker:</span>
              <span class="broker-name">{{ broker.broker.name }}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
     

      </div>
    </div>

    <div class="tracking-section">
      <h4 class="text-subtitle1">Tu Lista de seguimiento de activos</h4>
      <div class  ="assets-container">
        <q-card bordered class="tracking-card" @click="onOpenDialog('asset')">
        <q-card-section>
          <div class="add-item">
            <q-icon name="add" size="lg" />
            <span>Agregar Activo</span>
          </div>
        </q-card-section>
      </q-card>
      </div>
      
      
    </div>

    <q-dialog v-model="showBrokerDialog">
      <AddBroker @close="onCloseDialog('broker')" />
    </q-dialog>

    <q-dialog v-model="showAssetDialog">
      <AddAsset @close="onCloseDialog('asset')" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddBroker from '../components/watchlist/AddBroker.vue';
import AddAsset from '../components/watchlist/AddAsset.vue';
import { useProfileStore } from '../../application/stores/useProfileStore';
import { storeToRefs } from 'pinia';

const showBrokerDialog = ref(false);
const showAssetDialog = ref(false);
const profileStore = useProfileStore();

const {brokers} = storeToRefs(profileStore);


const onOpenDialog = (type: 'broker' | 'asset') => {
  if (type === 'broker') {
    showBrokerDialog.value = true;
  } else if (type === 'asset') {
    showAssetDialog.value = true;
  }
};
const onCloseDialog = (type: 'broker' | 'asset') => {
  if (type === 'broker') {
    showBrokerDialog.value = false;
  } else if (type === 'asset') {
    showAssetDialog.value = false;
  }
};
</script>

<style scoped>
.watching-list-container {
  padding: 2rem;
}

.tracking-section {
  margin-bottom: 2rem;
}

.tracking-card {
  max-width: 300px;
  margin: 1rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #bbb;
  background-color: #1c1c1c;
}

.add-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bbb;
}

.add-item:hover {
  color: var(--q-primary);
}
.broker-container {
    display: flex;
    align-items: center;
    gap: 3em;
}

.add-item span {
  margin-top: 0.5rem;
}
</style>
