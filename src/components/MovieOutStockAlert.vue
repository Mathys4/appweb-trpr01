<script setup lang="ts">
import { defineProps } from 'vue';
import { type Movie } from '../scripts/movie';

const props = defineProps<{
    outOfStockMovies: Movie[];
}>()

const emit = defineEmits<{
    (event: 'close'): void
}>()

const close = () => {
    emit('close')
}
</script>

<template>
    <div class="alert alert-warning d-flex align-items-center">
        <i class="bi bi-exclamation-triangle-fill text-warning me-3 fs-4"></i>
        <div>
            <p class="fw-medium text-warning m-0">
                {{ props.outOfStockMovies.length }}
                films sont en rupture de stock !
            </p>
            <p class="text-warning-emphasis small mt-1">
                Films concernés : {{props.outOfStockMovies.map(movie => movie.name).join(', ')}}
            </p>
        </div>
        <button type="button" class="btn-close ms-auto" @click="close"></button>
    </div>
</template>

<style scoped></style>