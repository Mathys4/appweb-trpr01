<script setup lang="ts">
import { movieCategories, type MovieCategory } from '../scripts/movie';
import { ref, defineEmits } from 'vue';

const selectedCategory = ref<MovieCategory>("Horreur");

const emit = defineEmits<{
  (e: 'select', category: MovieCategory): void;
}>();

const handleSelect = (category: MovieCategory) => {
  selectedCategory.value = category;
  emit('select', category);
};
</script>

<template>
  <div class="col-md-2 shadow-lg position-fixed h-100">
    <div class="p-3 border-bottom">
      <h4 class="fw-semibold text-dark"><i class="bi bi-film me-2"></i>Catégories de films</h4>
    </div>
    <nav class="p-3">
      <ul class="list-unstyled">
        <li v-for="category in movieCategories" :key="category" @click="handleSelect(category)"
          :class="{ 'bg-primary-subtle text-primary': category === selectedCategory, 'text-dark': category !== selectedCategory }"
          class="d-flex align-items-center p-2 rounded cursor-pointer category-card">
          <span>{{ category }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.category-card:hover {
  background-color: #e8f1fa;
}
</style>