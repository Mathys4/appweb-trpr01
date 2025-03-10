<script setup lang="ts">
import MovieSideBar from './MovieSideBar.vue'
import MovieInteractiveList from './MovieInteractiveList.vue';
import MovieNavBar from './MovieNavBar.vue';
import { type MovieCategory } from '../scripts/movie';
import { ref } from 'vue';

const selectedCategory = ref<MovieCategory>("Horreur");

const selectedCategoryToFilter = (category: MovieCategory) => {
  selectedCategory.value = category;
};
</script>

<template>
  <div class="container-fluid p-0 min-vh-100 d-flex flex-column bg-secondary bg-opacity-10">
    <div class="row flex-grow-1 g-0">
      <div class="col-md-2 p-0">
        <div class="position-fixed h-100">
          <MovieSideBar @select="selectedCategoryToFilter" />
        </div>
      </div>
      <div class="col-md-10 d-flex flex-column">
        <MovieNavBar />
        <main class="flex-grow-1 mb-5">
          <MovieInteractiveList :selectedCategory />
        </main>
      </div>
      <footer class="bg-black text-white text-center p-3 mt-auto">
        <div>
          <p class="mb-0">Copyright Mathys Lacasse</p>
          <p class="mb-0">© 2025 FilmoBox / appweb_trpr01</p>
        </div>
      </footer>
    </div>
  </div>
</template>
<style scoped></style>
