<script setup>
import { computed } from 'vue'
import { useMoviesStore } from '../stores/MoviesStore'
import { useSearchStore } from '../stores/SearchStore'
const moviesStore = useMoviesStore()
const searchStore = useSearchStore()
const props = defineProps({
    movie: {
        type: Object,
        required: true,
        default: {},
    },
    isSearch: {
        type: Boolean,
        required: false,
        default: false,
    },
})
const inFav = computed(() => {
    let result = false
    if (props.isSearch) {
        let id = props.movie.filmId
        let index = moviesStore.movies.findIndex((el) => el.filmId == id)
        if (index != -1) {
            result = true
        }
    }
    return result
})
const toggleFav = (movie) => {
    if (!inFav.value) {
        searchStore.addToFav(movie)
    } else {
        moviesStore.deleteMovie(movie.filmId)
    }
}
</script>
<template>
    <div class="movie">
        <img class="movie-img" :src="`${movie.posterUrl}`" :alt="movie.nameRu" />
        <div>
            <div class="movie-name">{{ movie.nameRu }} ({{ movie.year }})</div>
            <span class="movie-overview">{{ movie.description }}</span>
            <div class="movie-buttons" v-if="!isSearch">
                <button
                    class="btn movie-buttons-watched"
                    @click="moviesStore.toggleWatch(movie.filmId)"
                >
                    <span v-if="!movie.isWatched">Watched</span>
                    <span v-else>Unwatched</span>
                </button>
                <button
                    class="btn movie-buttons-delete"
                    @click="moviesStore.deleteMovie(movie.filmId)"
                >
                    Delete
                </button>
            </div>
            <div class="movie-buttons" v-else>
                <button
                    class="btn"
                    :class="inFav ? 'btn_red' : 'btn_green'"
                    @click="toggleFav(movie)"
                >
                    <span v-if="!inFav">To fav</span>
                    <span v-else>Delete from fav</span>
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.movie {
    display: grid;
    grid-template-columns: 200px 1fr;
    column-gap: 30px;
    margin-bottom: 20px;
    border: 2px solid #efefef;
    padding: 10px;
    border-radius: 10px;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: center;
    }
}

.movie-accept {
    margin-right: 10px;
}

.movie-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
}

.movie-name {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 20px;
}

.movie-overview {
    display: block;
    margin-bottom: 20px;
}

.movie-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
}

.movie-buttons-watched {
    color: #fff;
    background: #1eb4c3;
}

.movie-buttons-watched__icon {
    width: 15px;
    margin-left: 10px;
}

.movie-buttons-delete {
    color: #fff;
    background: #ff2a2a;
}
</style>
