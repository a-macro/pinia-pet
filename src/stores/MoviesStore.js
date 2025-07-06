import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// export const useMoviesStore = defineStore('moviesStore', {
//     state: () => ({
//         movies: [],
//         activeTab: 2,
//     }),
//     getters: {
//         watchedMovies() {
//             return this.movies.filter((movie) => movie.isWatched)
//         },
//         moviesLen() {
//             return this.movies.length
//         },
//     },
//     actions: {
//         setActiveTab(filmId) {
//             this.activeTab = filmId
//         },
//         toggleWatch(filmId) {
//             const i = this.movies.findIndex((el) => el.filmId === filmId)
//             this.movies[i].isWatched = !this.movies[i].isWatched
//         },
//         deleteMovie(filmId) {
//             this.movies = this.movies.filter((el) => el.filmId != filmId)
//         },
//     },
// })
export const useMoviesStore = defineStore('moviesStore', () => {
    const movies = ref([])
    const activeTab = ref(1)
    const initializeFromLocalStorage = () => {
        try {
            const moviesInLocalStorage = localStorage.getItem('movies')
            if (moviesInLocalStorage) {
                movies.value = JSON.parse(moviesInLocalStorage)
            }
        } catch (error) {
            console.error('Ошибка при чтении из localStorage:', error)
            localStorage.removeItem('movies')
        }
    }

    initializeFromLocalStorage()
    const setActiveTab = (filmId) => {
        activeTab.value = filmId
    }
    const toggleWatch = (filmId) => {
        const i = movies.value.findIndex((el) => el.filmId === filmId)
        if (i !== -1) {
            movies.value[i].isWatched = !movies.value[i].isWatched
        }
    }
    const deleteMovie = (filmId) => {
        movies.value = movies.value.filter((el) => el.filmId !== filmId)
    }
    const watchedMovies = computed(() => {
        return movies.value.filter((movie) => movie.isWatched)
    })
    const moviesLen = computed(() => {
        return movies.value.length
    })
    watch(
        movies,
        (newMovies) => {
            localStorage.setItem('movies', JSON.stringify(newMovies))
        },
        { deep: true }
    )

    return { movies, activeTab, setActiveTab, toggleWatch, deleteMovie, moviesLen, watchedMovies }
})
