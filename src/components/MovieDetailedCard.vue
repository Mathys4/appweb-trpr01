<script setup lang="ts">
import { type Movie } from "../scripts/movie.ts";
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    movie: Movie;
}>();

const toHomePage = () => {
    emit('back', props.movie);
};

const emit = defineEmits<{
    (event: 'back', movie: Movie): void
}>();
</script>

<template>

    <div class="modal-backdrop fade show"></div>
    <div class="modal fade show d-block">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">{{ movie.name }}</h3>
                    <button type="button" class="btn-close" @click="toHomePage"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 mb-3 rounded overflow-hidden">
                            <img :src="movie.imageUrl" :alt="movie.name" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div>
                                <h6 class="fw-semibold">Catégorie :</h6>
                                <p class="text-muted">{{ movie.category }}</p>
                            </div>
                            <div>
                                <h6 class="fw-semibold">Directeur : </h6>
                                <p class="text-muted">{{ movie.producer }}</p>
                            </div>
                            <div>
                                <h6 class="fw-semibold">Date de sortie :</h6>
                                <p class="text-muted">{{ movie.releaseDate }}</p>
                            </div>
                            <div>
                                <h6 class="fw-semibold">Durée (minutes) : </h6>
                                <p class="text-muted">{{ movie.duration }}</p>
                            </div>
                            <div>
                                <h6 class="fw-semibold">Description :</h6>
                                <p class="text-muted">{{ movie.description }}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between align-items-center">
                    <p class="mt-3 pb-2">
                        <span
                            :class="{ 'text-success': movie.stock > 5, 'text-warning': movie.stock > 3 && movie.stock <= 5, 'text-danger': movie.stock <= 3 }">
                            Stock: {{ movie.stock }}
                            <i
                                :class="{ 'bi bi-check-circle-fill': movie.stock > 5, 'bi bi-exclamation-triangle-fill': movie.stock > 3 && movie.stock <= 5, 'bi bi-x-circle-fill': movie.stock <= 3 }"></i>
                        </span>
                    </p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-secondary" @click="toHomePage">
                            <i class="bi bi-house-fill"></i> Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-details {
    margin-bottom: 1rem;
}

.movie-details p {
    margin-bottom: 0.25rem;
}
</style>