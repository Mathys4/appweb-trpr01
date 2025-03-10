<script setup lang="ts">
import { type Movie } from "../scripts/movie";

const props = defineProps<{
    movieListToImport: Movie[]
}>();

const exportMovies = () => {
    exportMoviesToCSV(props.movieListToImport, "movies");
};

function exportMoviesToCSV(movies: (Movie)[], filename: string): void {
    if (movies.length === 0) return

    const headers = Array.from(
        new Set(movies.flatMap(movie => Object.keys(movie)))
    )

    const rows = movies.map(movie =>
        headers.map(header => (movie as any)[header] ?? "").join(", ")
    )

    const csvContent = [headers.join(", "), ...rows].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", `${filename}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
</script>

<template>
    <div class="btn-group">
        <button @click="exportMovies" class="btn text-white bg-info px-4">
            <i class="bi bi-filetype-csv me-2"></i>Exporter en CSV
        </button>
    </div>
</template>

<style scoped></style>