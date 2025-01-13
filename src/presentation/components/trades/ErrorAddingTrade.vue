<template>
    <div class="error-adding-trade-container">
        <h2>No puedes añadir un trade</h2>
        <h6>Razones</h6>
        <p>Para añadir un trade debes agregar un broker </p>
        <p>Para agregar un trade debes agregar un activo</p>
        <q-btn @click="navigateToAddBrokerAndAsset">Agregar broker y activos</q-btn>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['navigate']);
const navigateToAddBrokerAndAsset = () => {
    emit('navigate');
}
</script>

<style scoped>
.error-adding-trade-container {
text-align: center;
border: 1px solid #ccc;
padding: 2em;
}
</style>