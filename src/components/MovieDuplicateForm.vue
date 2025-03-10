<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue'
import { MovieCategoryEnum } from "../scripts/movie.ts"
import { type Movie } from "../scripts/movie.ts"


const props = defineProps<{
    selectedMovie: Movie
}>();

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

const movieToDuplicate = ref<Movie>({ ...emptyMovie })

watch(() => props.selectedMovie, (newMovie) => {
    movieToDuplicate.value = { ...newMovie }
}, { immediate: true })

const formErrors = ref<Record<string, string>>({})



function validateForm(): boolean {
    formErrors.value = {}
    let isValid = true

    if (!movieToDuplicate.value.name.trim()) {
        formErrors.value.name = "Le titre du film est requis"
        isValid = false
    }

    if (!movieToDuplicate.value.producer.trim()) {
        formErrors.value.producer = "Le nom du réalisateur est requis"
        isValid = false
    }

    if (!movieToDuplicate.value.releaseDate) {
        formErrors.value.releaseDate = "La date de sortie est requise"
        isValid = false
    }

    if (!movieToDuplicate.value.duration) {
        formErrors.value.duration = "La durée du film est requise"
        isValid = false
    }
    else if (movieToDuplicate.value.duration <= 0) {
        formErrors.value.duration = "La durée doit être un nombre positif"
        isValid = false
    }

    if (!movieToDuplicate.value.category) {
        formErrors.value.category = "Veuillez sélectionner une catégorie valide"
        isValid = false
    }

    if (!movieToDuplicate.value.description.trim()) {
        formErrors.value.description = "La description du film est requise"
        isValid = false
    }

    if (movieToDuplicate.value.stock < 0) {
        formErrors.value.stock = "Le stock ne peut pas être négatif"
        isValid = false
    }

    return isValid
}

const resetForm = () => {
    movieToDuplicate.value = { ...emptyMovie }
    formErrors.value = {}
}

const emit = defineEmits<{
    (event: 'submit', movie: Movie | null): void
}>()

const submitMovie = () => {
    if (validateForm()) {
        emit('submit', movieToDuplicate.value)
        resetForm()
    }
}
const abortModifying = () => {
    emit('submit', null)
    resetForm()
}
</script>

<template>
    <div>
        <div class="modal-backdrop fade show"></div>
        <div class="modal fade show d-block">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Dupliquer un film</h5>
                        <button type="button" class="btn-close" @click="abortModifying">
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group mb-3"> <label for="movieName" class="form-label">Titre</label> <input
                                    v-model="movieToDuplicate.name" type="text" class="form-control"
                                    :class="{ 'is-invalid': formErrors.name }" id="movieName" />
                                <div v-if="formErrors.name" class="invalid-feedback"> {{ formErrors.name }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="movieProducer"
                                    class="form-label">Directeur</label> <input v-model="movieToDuplicate.producer"
                                    type="text" class="form-control" :class="{ 'is-invalid': formErrors.producer }"
                                    id="movieProducer" />
                                <div v-if="formErrors.producer" class="invalid-feedback"> {{ formErrors.producer }}
                                </div>
                            </div>
                            <div class="form-group mb-3"> <label for="movieReleaseDate" class="form-label">Date de
                                    sortie</label> <input v-model="movieToDuplicate.releaseDate" type="date"
                                    class="form-control" :class="{ 'is-invalid': formErrors.releaseDate }"
                                    id="movieReleaseDate" />
                                <div v-if="formErrors.releaseDate" class="invalid-feedback"> {{ formErrors.releaseDate
                                }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="movieDuration" class="form-label">Durée
                                    (minutes)</label> <input v-model.number="movieToDuplicate.duration" type="number"
                                    class="form-control" :class="{ 'is-invalid': formErrors.duration }"
                                    id="movieDuration" />
                                <div v-if="formErrors.duration" class="invalid-feedback"> {{ formErrors.duration }}
                                </div>
                            </div>
                            <div class="form-group mb-3"> <label for="movieCategory"
                                    class="form-label">Catégorie</label> <select class="form-select"
                                    :class="{ 'is-invalid': formErrors.category }" id="movieCategory"
                                    v-model="movieToDuplicate.category">
                                    <option value="" disabled>Sélectionnez une catégorie</option>
                                    <option v-for="category in MovieCategoryEnum" :key="category" :value="category"> {{
                                        category }} </option>
                                </select>
                                <div v-if="formErrors.category" class="invalid-feedback"> {{ formErrors.category }}
                                </div>
                            </div>
                            <div class="form-group mb-3"> <label for="movieStock" class="form-label">Stock</label>
                                <input v-model.number="movieToDuplicate.stock" type="number" class="form-control"
                                    :class="{ 'is-invalid': formErrors.stock }" id="movieStock" />
                                <div v-if="formErrors.stock" class="invalid-feedback"> {{ formErrors.stock }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="movieImageUrl" class="form-label">URL de
                                    l'image</label> <input v-model="movieToDuplicate.imageUrl" type="text"
                                    class="form-control" :class="{ 'is-invalid': formErrors.imageUrl }"
                                    id="movieImageUrl" />
                                <div v-if="formErrors.imageUrl" class="invalid-feedback"> {{ formErrors.imageUrl }}
                                </div>
                            </div>
                            <div class="form-group mb-3"> <label for="movieDescription"
                                    class="form-label">Description</label> <textarea
                                    v-model="movieToDuplicate.description" class="form-control"
                                    :class="{ 'is-invalid': formErrors.description }" id="movieDescription"
                                    rows="3"> </textarea>
                                <div v-if="formErrors.description" class="invalid-feedback"> {{ formErrors.description
                                }} </div>
                            </div>
                            <div class="d-flex justify-content-end gap-4">
                                <button type="button" @click="abortModifying" class="btn btn-secondary">
                                    Annuler
                                </button>
                                <button type="button" @click="submitMovie" class="btn btn-success">
                                    Confirmer les modifications et Dupliquer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>