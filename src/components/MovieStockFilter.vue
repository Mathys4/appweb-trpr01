<script setup lang="ts">
import { ref, defineEmits } from "vue";
import type { StockFilter } from "../scripts/movie";

const currentFilter = ref<StockFilter>('Tous')

const emit = defineEmits(["changeFilter"]);

const setFiltreStock = (filtre: StockFilter) => {
  currentFilter.value = filtre
  emit("changeFilter", filtre);
};
</script>

<template>

  <div class="btn-group">
    <button @click="setFiltreStock('Tous')"
      :class="{ 'btn-secondary': currentFilter === 'Tous', 'btn-outline-secondary': currentFilter !== 'Tous' }"
      class="btn px-4 py-2">
      <i class="bi bi-list mr-2"></i>
      Tous
    </button>
    <button @click="setFiltreStock('Dispo')"
      :class="{ 'btn-success': currentFilter === 'Dispo', 'btn-outline-success': currentFilter !== 'Dispo' }"
      class="btn px-4">
      <i class="bi bi-check-circle-fill mr-2"></i>
      Disponibles
    </button>
    <button @click="setFiltreStock('Aucun')"
      :class="{ 'btn-danger': currentFilter === 'Aucun', 'btn-outline-danger': currentFilter !== 'Aucun' }"
      class="btn px-4">
      <i class="bi bi-x-circle-fill mr-2"></i>
      Hors Stock
    </button>
  </div>
</template>

<style scoped></style>