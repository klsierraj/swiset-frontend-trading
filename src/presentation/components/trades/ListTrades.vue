<template>
  <div>
    <q-table
      :rows="tradeStore.trades"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
      flat
      bordered
    >
      <template v-slot:body-cell-side="props">
        <q-td>{{ props.row.side }}</q-td>
      </template>

      <template v-slot:body-cell-mood="props">
        <q-td>
          <q-icon :name="getMoodIcon(props.row.mood)" class="mood-icon" />
          <q-badge color="primary">{{ props.row.mood }}</q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-openTime="props">
        <q-td>{{ formatDate(props.row.openTime) }}</q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td>
          <q-btn
            flat
            round
            dense
            icon="visibility"
            color="primary"
            @click="openTradeDetail(props.row)"
          />
        </q-td>
      </template>
    </q-table>


    <q-dialog v-model="showTradeDetailModal" >
      <TradeDetail :trade="selectedTrade" @close="closeTradeDetailModal" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { useProfileStore } from "../../../application/stores/useProfileStore";
import { useTradeStore } from "../../../application/stores/tradeStore";
import TradeDetail from "./TradeDetail.vue";
import { getMoodIcon } from "../../../shared/moodIcons";


const profileStore = useProfileStore();
const tradeStore = useTradeStore();

const page = ref(0);
const size = ref(15);
const isLoading = ref(false);

const showTradeDetailModal = ref(false); 
const selectedTrade = ref(); 

const openTradeDetail = (trade: any) => {
tradeStore.selectedTrade = trade;
showTradeDetailModal.value = true;
};


const closeTradeDetailModal = () => {
  showTradeDetailModal.value = false;
  tradeStore.selectedTrade = null;
};

const fetchTrades = async () => {
  try {
    isLoading.value = true;

    const assetIds = profileStore.userAssets.map((asset) => asset.ticker);
    const brokerAccountIds = profileStore.brokers.map((broker) => broker.id);

    if (assetIds.length === 0 || brokerAccountIds.length === 0) {
      console.warn("Los datos del perfil no están disponibles todavía.");
      return;
    }

    await tradeStore.fetchTrades(
      assetIds,
      brokerAccountIds,
      page.value,
      size.value,
      localStorage.getItem("authToken") || ""
    );
  } catch (error) {
    console.error("Error al obtener los trades:", error);
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => [profileStore.userAssets, profileStore.brokers],
  ([newUserAssets, newBrokers]) => {
    if (newUserAssets.length > 0 && newBrokers.length > 0) {
      fetchTrades();
    }
  }
);

onMounted(() => {
  if (profileStore.userAssets.length > 0 && profileStore.brokers.length > 0) {
    fetchTrades();
  }
});

const columns: {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: "right" | "left" | "center";
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  headerClasses?: string;
}[] = [
  { name: "side", label: "Side", field: "side", align: "left", sortable: true },
  { name: "mood", label: "Mood", field: "mood", align: "left", sortable: true },
  { name: "openTime", label: "Open Time", field: "openTime", align: "left", sortable: true },
  { name: "actions", label: "Actions", field: "actions", align: "center" },
];

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
