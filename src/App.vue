<script setup>
import { useMoviesStore } from './stores/MoviesStore'
import Movie from './components/Movie.vue'
import Search from './components/Search.vue'
const moviesStore = useMoviesStore()
const setTab = (id) => {
    moviesStore.setActiveTab(id)
}
</script>

<template>
    <main>
        <header class="header">
            <img class="header-logo" src="/img/logo.svg" alt="" />
            <h1>My Favourite movies</h1>
        </header>
        <div class="tabs">
            <button :class="['btn', { btn_green: moviesStore.activeTab === 1 }]" @click="setTab(1)">
                Favourite
            </button>
            <button :class="['btn', { btn_green: moviesStore.activeTab === 2 }]" @click="setTab(2)">
                Search
            </button>
        </div>
        <div class="movies" v-if="moviesStore.activeTab == 1">
            <div v-if="moviesStore.watchedMovies.length > 0">
                <h2>Watched movies ({{ moviesStore.watchedMovies.length }})</h2>
                <div>
                    <Movie
                        :key="'wathcedMovie' + movie.filmId"
                        v-for="movie in moviesStore.watchedMovies"
                        :movie="movie"
                    ></Movie>
                </div>
            </div>
            <h2>All movies ({{ moviesStore.moviesLen }})</h2>
            <div>
                <Movie
                    :key="'movie' + movie.filmId"
                    v-for="movie in moviesStore.movies"
                    :movie="movie"
                ></Movie>
            </div>
        </div>
        <Search v-else></Search>
    </main>
</template>

<style scoped lang="scss">
main {
    padding: 0 24px;
    min-height: 100dvh;
    background: #f7f7f7;
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    h1 {
        @media (max-width: 400px) {
            font-size: 22px;
        }
    }
    &-logo {
        max-width: 50px;
        margin-right: 10px;
    }
}

.tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}
</style>
