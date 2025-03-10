<script setup lang="ts">
import { type Movie } from "../scripts/movie.ts";
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    movie: Movie;
}>();

const openModifyForm = () => {
    emit('modify', props.movie);
};

const deleteMovie = () => {
    emit('delete', props.movie);
};

const duplicateMovie = () => {
    emit('duplicate', props.movie);
};

const emit = defineEmits<{
    (event: 'modify', movie: Movie): void
    (event: 'delete', movie: Movie): void
    (event: 'duplicate', movie: Movie): void
}>();


</script>

<template>
    <div class="p-3 bg-white rounded-4 movie-card">
        <div class="ratio ratio-1x1 mb-4 rounded overflow-hidden">
            <img :src="movie.imageUrl" :alt="movie.name" class="img-cover object-fit-cover" />
        </div>
        <h3 class="fs-5 fw-semibold text-dark mb-2">
            {{ movie.name }}
        </h3>
        <p class="fs-6 text-secondary mb-4">
            Directeur : {{ movie.producer }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
            <span
                :class="{ 'text-success': movie.stock > 5, 'text-warning': movie.stock > 0 && movie.stock <= 5, 'text-danger': movie.stock === 0 }">
                Stock: {{ movie.stock }}
                <i
                    :class="{ 'bi bi-check-circle-fill': movie.stock > 5, 'bi bi-exclamation-triangle-fill': movie.stock > 0 && movie.stock <= 5, 'bi bi-x-circle-fill': movie.stock === 0 }"></i>
            </span>
            <div class="btn-group gap-1">
                <button class="col btn btn-primary btn-sm rounded" @click.stop="openModifyForm">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="col btn btn-danger btn-sm rounded" @click.stop="deleteMovie">
                    <i class="bi bi-trash"></i>
                </button>
                <button class="col btn btn-warning btn-sm rounded" @click.stop="duplicateMovie">
                    <i class="bi bi-back"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-card {
    width: 280px;
    height: 430px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>