<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["search"]);
const searchQuery = ref("");

const researchInMovieList = () => {
  emit("search", searchQuery.value);
};
</script>

<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
        <i class="bi bi-search text-gray-400"></i>
      </span>
    </div>
    <input v-model="searchQuery" @input="researchInMovieList" type="text" class="form-control"
      placeholder="Rechercher un film..." />
  </div>
</template>

<style scoped></style>