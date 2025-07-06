<script setup>
import { ref } from 'vue'
import Loader from './Loader.vue'
import Movie from './Movie.vue'
import { useSearchStore } from '../stores/SearchStore'
const searchStore = useSearchStore()
const searchMovie = ref('')
let debounceTimer = null

const debounceSearch = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        searchStore.getMovies(searchMovie.value)
    }, 500)
}
</script>
<template>
    <form @submit.prevent="">
        <input
            type="text"
            class="search-input"
            placeholder="Input movie name"
            v-model="searchMovie"
            @input="debounceSearch"
        />
    </form>
    <Loader v-if="searchStore.isLoading" />
    <div v-else-if="searchStore.movies">
        <Movie
            :key="'search' + movie.filmId"
            v-for="movie in searchStore.movies"
            :movie="movie"
            :isSearch="true"
        />
    </div>
</template>
<style lang="scss" scoped>
.search-input {
    border: 1px solid #e7e7e7;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 20px;
    border-radius: 12px;
}
</style>
