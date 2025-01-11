<template>
  <q-card class="trade-detail-container q-pa-md">
    <q-card-section>
      <div class="text-h5 text-center q-mb-md">Detalles del Trade</div>
    </q-card-section>
    <q-card-section>
      <div v-if="trade" class="trade-info">
        <div class="trade-info-row">
          <span class="trade-label"><b>Side:</b></span>
          <span class="trade-value">{{ trade.side }}</span>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Mood:</b></span>
          <div class="trade-value mood-icon-container">
            <q-icon :name="getMoodIcon(trade.mood)" class="mood-icon" />
            <q-badge color="primary">{{ trade.mood }}</q-badge>
          </div>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Open Time:</b></span>
          <span class="trade-value">{{ formatDate(trade.openTime) }}</span>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Close Time:</b></span>
          <span class="trade-value">{{ formatDate(trade.closeTime) }}</span>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Entry Price:</b></span>
          <span class="trade-value">{{ trade.entryPrice }}</span>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Close Price:</b></span>
          <span class="trade-value">{{ trade.closePrice }}</span>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Stop Loss Price:</b></span>
          <span class="trade-value">{{ trade.stopLossPrice }}</span>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Net Profit:</b></span>
          <span class="trade-value">{{ trade.netProfit }}</span>
        </div>
        <div class="trade-info-row">
          <span class="trade-label"><b>Commissions:</b></span>
          <span class="trade-value">{{ trade.commisions }}</span>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cerrar" color="primary" @click="closeDetail" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTradeStore } from "../../../application/stores/tradeStore";
import { getMoodIcon } from "../../../shared/moodIcons";


const tradeStore = useTradeStore();
const trade = computed(() => tradeStore.selectedTrade);
const emit = defineEmits(["close"]);

const closeDetail = () => {
  tradeStore.clearSelectedTrade();
  emit('close');
};

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.trade-detail-container {
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: black;
}

.trade-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
}

.trade-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
}

.trade-label {
  font-weight: bold;
  font-size: 14px;
}

.trade-value {
  font-size: 14px;
}

.mood-icon-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mood-icon {
  font-size: 20px;
  color: #4caf50;
}
</style>
