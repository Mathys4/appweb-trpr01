<script setup lang="ts">
import { movies } from "../scripts/baseMovies.ts";
import { type Movie, type MovieCategory, type StockFilter, MovieCategoryEnum } from "../scripts/movie.ts";
import MovieCard from "./MovieCard.vue";
import MovieDetailedCard from "./MovieDetailedCard.vue";
import { ref, watch, onMounted } from 'vue';
import MovieUploadForm from "./MovieUploadForm.vue";
import MovieModifyForm from "./MovieModifyForm.vue";
import MovieConfirmationDelete from "./MovieConfirmationDelete.vue";
import MovieDuplicateForm from "./MovieDuplicateForm.vue";
import MovieOutStockAlert from "./MovieOutStockAlert.vue";
import MovieStockFilter from "./MovieStockFilter.vue";
import ExportButton from "./ExportButton.vue";
import MovieSearch from "./MovieSearch.vue";

const props = defineProps<{
    selectedCategory: MovieCategory
}>()

const initialMovieList = ref<(Movie)[]>(movies)
const moviesInteractiveList = ref<(Movie)[]>(initialMovieList.value)
const outOfStockMovies = ref<(Movie)[]>([])

onMounted(() => {
    isAnyMovieOutOfStock()
    sortMoviesByCategory()
})

watch(() => props.selectedCategory, () => {
    sortMoviesByCategory()
})

watch(() => initialMovieList.value, () => {
    moviesInteractiveList.value = [...initialMovieList.value]
    isAnyMovieOutOfStock()
    sortMoviesByCategory()
}, { deep: true })

const sortMoviesByCategory = () => {
    moviesInteractiveList.value = initialMovieList.value
    moviesInteractiveList.value = initialMovieList.value.filter((movie) => movie.category === props.selectedCategory)
}

const isAnyMovieOutOfStock = () => {
    outOfStockMovies.value = initialMovieList.value.filter((movie) => movie.stock === 0)
    if (outOfStockMovies.value.length !== 0) {
        showAlertOutOfStock.value = true
    }
    else {
        showAlertOutOfStock.value = false
    }
}

const showModifyForm = ref(false)
const showDuplicateForm = ref(false)
const showDetailedView = ref(false)
const showDeleteConfirmationMessage = ref(false)
const showAlertOutOfStock = ref(false)


const emptyMovie: Movie = {
    id: 0,
    name: "",
    producer: "",
    releaseDate: "",
    duration: 0,
    category: MovieCategoryEnum.Horreur,
    description: "",
    stock: 0,
    imageUrl: ""
}

const selectedMovieToModify = ref<Movie>({ ...emptyMovie })
const selectedMovieToDelete = ref<Movie>({ ...emptyMovie })
const selectedMovieToDuplicate = ref<Movie>({ ...emptyMovie })
const selectedMovieToViewDetail = ref<Movie>({ ...emptyMovie })

const addNewMovie = (movie: Movie) => {
    movie.id = initialMovieList.value.length + 1
    initialMovieList.value.push(movie)
}

const duplicateMovie = (movieToDuplicate: Movie | null) => {
    if (movieToDuplicate !== null) {
        addNewMovie(movieToDuplicate)
    }
    showDuplicateForm.value = false
}

const modifyMovie = (movieToModify: Movie) => {
    const index = initialMovieList.value.findIndex(movie => movie.id === movieToModify.id)
    if (index !== -1) {
        initialMovieList.value[index] = movieToModify
    }
    showModifyForm.value = false
}

const deleteMovie = () => {
    const index = initialMovieList.value.findIndex(movie => movie.id === selectedMovieToDelete.value.id)
    if (index !== -1) {
        initialMovieList.value.splice(index, 1)
    }
    showDeleteConfirmationMessage.value = false
}

const handleMovieAction = (movie: Movie, action: 'view' | 'modify' | 'duplicate' | 'delete') => {
    switch (action) {
        case 'view':
            selectedMovieToViewDetail.value = movie;
            showDetailedView.value = true;
            break
        case 'modify':
            selectedMovieToModify.value = movie;
            showModifyForm.value = true;
            break
        case 'duplicate':
            selectedMovieToDuplicate.value = movie;
            showDuplicateForm.value = true;
            break
        case 'delete':
            selectedMovieToDelete.value = movie;
            showDeleteConfirmationMessage.value = true;
            break
    }
}


const researchInMovieList = (inputQuery: string) => {
    moviesInteractiveList.value = initialMovieList.value;
    if (inputQuery.trim() === '') {
        moviesInteractiveList.value = moviesInteractiveList.value;
        sortMoviesByCategory()
    } else {
        moviesInteractiveList.value = moviesInteractiveList.value.filter((movie) =>
            movie.name.toLowerCase().includes(inputQuery.toLowerCase())
        )
    }
}

const researchInMovieListWithStock = (filter: StockFilter) => {
    sortMoviesByCategory()
    if (filter === 'Dispo') {
        moviesInteractiveList.value = moviesInteractiveList.value.filter((movie) =>
            movie.stock > 0
        )
    }
    if (filter === 'Aucun') {
        moviesInteractiveList.value = moviesInteractiveList.value.filter((movie) =>
            movie.stock === 0
        )
    }
    if (filter === 'Tous') {
        moviesInteractiveList.value = moviesInteractiveList.value
    }
}
</script>

<template>
    <div class="container mt-4">
        <div v-if="showAlertOutOfStock">
            <MovieOutStockAlert :outOfStockMovies="outOfStockMovies" @close="showAlertOutOfStock = false" />
        </div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="h1 text-dark">Liste des films</h1>
            <MovieUploadForm @submit="addNewMovie" />
        </div>
        <div class="d-flex flex-wrap gap-2 mb-4">
            <MovieStockFilter @changeFilter="researchInMovieListWithStock" />
            <ExportButton :movie-list-to-import="moviesInteractiveList" />
        </div>
        <MovieSearch @search="researchInMovieList" />
    </div>
    <div v-if="!showDeleteConfirmationMessage" class="container">
        <div class="d-flex justify-content-center flex-wrap gap-4">
            <div v-for="movie in moviesInteractiveList" :key="movie.id">
                <MovieCard :movie="movie" @modify="() => handleMovieAction(movie, 'modify')"
                    @delete="() => handleMovieAction(movie, 'delete')"
                    @duplicate="() => handleMovieAction(movie, 'duplicate')"
                    @click="handleMovieAction(movie, 'view')" />
            </div>
        </div>
    </div>
    <div v-if="showDeleteConfirmationMessage" class="container mt-4">
        <MovieConfirmationDelete @confirm="deleteMovie" @cancel="showDeleteConfirmationMessage = false" />
    </div>
    <div v-if="showDetailedView" class="container py-4">
        <MovieDetailedCard :movie="selectedMovieToViewDetail" @back="showDetailedView = false" />
    </div>
    <div v-if="showModifyForm" class="container py-4">
        <MovieModifyForm :selectedMovie=selectedMovieToModify @submit="modifyMovie" />
    </div>
    <div v-if="showDuplicateForm" class="container py-4">
        <MovieDuplicateForm :selectedMovie=selectedMovieToDuplicate @submit="duplicateMovie" />
    </div>
</template>

<style scoped></style>