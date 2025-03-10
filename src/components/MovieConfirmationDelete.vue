<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
    (event: 'confirm'): void
    (event: 'cancel'): void
}>()

const confirm = () => {
    emit('confirm')
}

const cancel = () => {
    emit('cancel')
}
</script>

<template>
    <div class="card bg-danger text-white rounded-3">
        <div class="card-body text-center p-4">
            <h2 class="fw-bold">Voulez-vous vraiment supprimer ce film ?</h2>
            <p class="fs-5">Cette action est irréversible.</p>
            <div class="d-flex justify-content-center gap-3 mt-4">
                <button @click="confirm" type="button" class="btn btn-light btn-lg fw-bold">
                    <i class="bi bi-check-circle-fill"></i> Oui, Supprimer
                </button>
                <button @click="cancel" type="button" class="btn btn-light btn-lg fw-bold">
                    <i class="bi bi-x-circle"></i> Non, Annuler
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>