<template>
  <q-card class="q-pa-md container-add-trade" style="max-width: 800px;">
    <q-card-section>
      <div class="text-h5 text-center">Agrega un Trade</div>
    </q-card-section>
    <div class="row-section">
      <div>
        <q-select
          v-model="asset"
          :options="assetOptions"
          label="Activo"
          dense
          filled
          class="col-4"
          option-value="value"
          map-options
          emit-value
          option-label="label"
        />
      </div>
      <div>
        <q-select
          v-model="broker"
          :options="brokerOptions"
          label="Cuenta de Broker"
          dense
          filled
          class="col-4"
          option-value="value"
          map-options
          emit-value
          option-label="label"
        />
      </div>
      <div>
        <q-select
          v-model="side"
          :options="sideOptions"
          label="Lado"
          dense
          filled
          class="col-4"
          option-value="value"
        />
      </div>
    </div>

    <div class="row-section">
      <div>
        <q-input
          v-model="openDate"
          mask="##/##/####"
          label="Fecha de Apertura"
          dense
          filled
          class="col-4"
          stack-label
          type="date"
        >
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input
          v-model="openTime"
          mask="##:##"
          label="Tiempo de Apertura"
          dense
          filled
          class="col-4"
          stack-label
          type="time"
        >
          <template v-slot:append>
            <q-icon name="schedule" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input
          v-model="entryPrice"
          type="number"
          label="Precio de Apertura"
          dense
          filled
          class="col-4"
        >
          <template v-slot:append>
            <q-icon name="bar_chart" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row-section">
      <div>
        <q-input
          v-model="closeDate"
          mask="##/##/####"
          label="Fecha de Cierre"
          dense
          filled
          class="col-4"
          stack-label
          type="date"
        >
          <template v-slot:append>
            <q-icon name="event" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input
          v-model="closeTime"
          mask="##:##"
          label="Tiempo de Cierre"
          dense
          filled
          class="col-4"
          stack-label
          type="time"
        >
          <template v-slot:append>
            <q-icon name="schedule" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input
          v-model="exitPrice"
          type="number"
          label="Precio de Cierre"
          dense
          filled
          class="col-4"
        >
          <template v-slot:append>
            <q-icon name="bar_chart" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row-section">
      <div>
        <q-input
          v-model="stopLoss"
          type="number"
          label="Precio de Stop Loss"
          dense
          filled
          class="col-4"
        >
          <template v-slot:append>
            <q-icon name="money" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input
          v-model="grossProfit"
          type="number"
          label="Beneficio Bruto"
          dense
          filled
          class="col-4"
        >
          <template v-slot:append>
            <q-icon name="money" />
          </template>
        </q-input>
      </div>
      <div>
        <q-input
          v-model="tradeCommission"
          type="number"
          label="Comisiones del Trade"
          dense
          filled
          class="col-4"
        >
          <template v-slot:append>
            <q-icon name="money" />
          </template>
        </q-input>
      </div>
      <div>
        <q-select
          v-model="sentiment"
          :options="sentimentOptions"
          label="Mood"
          dense
          filled
          class="col-4"
          option-value="value"
        />
      </div>
    </div>

    <q-card-actions align="right">
      <q-btn label="Agregar Trade" color="green" @click="submitTrade" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Trade } from "../../../domain/entities/Trade";
import { useTradeStore } from "../../../application/stores/tradeStore";

const emit = defineEmits(["close"]);

// Campos del formulario
const asset = ref<number | null>(null);
const broker = ref<number | null>(null);
const side = ref<{ value: "BUY" | "SELL"; label: string } | null>(null);
const openDate = ref<string>("");
const openTime = ref<string>("");
const entryPrice = ref<string>("");
const closeDate = ref<string>("");
const closeTime = ref<string>("");
const exitPrice = ref<string>("");
const stopLoss = ref<string>("");
const grossProfit = ref<string>("");
const tradeCommission = ref<string>("");
const sentiment = ref<{ value: string; label: string } | null>(null);

// Opciones
const assetOptions = [
  { value: 529, label: "EURAUD" },
  { value: 530, label: "EURUSD" },
  { value: 531, label: "USDJPY" },
];
const brokerOptions = [
  { value: 524858, label: "360 Capital Ltd" },
  { value: 524859, label: "Broker X" },
];
const sideOptions = [
  { value: "BUY", label: "Buy" },
  { value: "SELL", label: "Sell" },
];
const sentimentOptions = [
  { value: "HAPPY", label: "Anxious" },
  { value: "ANXIOUS", label: "Happy" },
  { value: "RELAXED", label: "Relaxed" },
];

const onCloseDialog = () => emit("close");

const formatDateTime = (date: string, time: string) => {
  if (!date || !time) return null;
  const [year, month, day] = date.split("-");
  return `${year}-${month}-${day}T${time}:00Z`;
};

const tradeStore = useTradeStore();
const submitTrade = async () => {
  try {
    if (!asset.value || !broker.value || !side.value) {
      throw new Error("Por favor, selecciona todos los campos obligatorios.");
    }

    const formattedOpenTime = formatDateTime(openDate.value, openTime.value);
    const formattedCloseTime = formatDateTime(closeDate.value, closeTime.value);

    if (!formattedOpenTime || !formattedCloseTime) {
      throw new Error("Fechas y horas inválidas.");
    }

    const trade = new Trade(
      side.value.value, // Extraemos el valor del objeto
      sentiment.value?.value || "Neutral", // Extraemos el valor del objeto
      formattedOpenTime,
      formattedCloseTime,
      parseFloat(entryPrice.value),
      parseFloat(exitPrice.value),
      parseFloat(stopLoss.value),
      parseFloat(grossProfit.value),
      0, // pipValue por defecto
      parseFloat(tradeCommission.value),
      206473, // userId
      asset.value!,
      broker.value!
    );

    await tradeStore.createTrade(trade, localStorage.getItem("authToken")!);
    limpiarFormulario();
    onCloseDialog();
  } catch (error: any) {
    console.error("Error al enviar el trade:", error.message || "Error desconocido.");
  }
};

const limpiarFormulario = () => {
  asset.value = null;
  broker.value = null;
  side.value = null;
  openDate.value = "";
  openTime.value = "";
  entryPrice.value = "";
  closeDate.value = "";
  closeTime.value = "";
  exitPrice.value = "";
  stopLoss.value = "";
  grossProfit.value = "";
  tradeCommission.value = "";
  sentiment.value = null;
};
</script>

<style scoped>
.container-add-trade {
  color: black;
  text-align: center;
}
.row-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
  margin-top: 1em;
}
</style>
