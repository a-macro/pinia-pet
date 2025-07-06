import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMoviesStore } from './MoviesStore'

// export const useSearchStore = defineStore('searchStore', {
//     state: () => ({
//         movies: [],
//         isLoading: false,
//     }),
//     actions: {
//         async getMovies(search) {
//             this.isLoading = true
//             const res = await fetch(
//                 `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${search}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'X-API-KEY': 'b3b1bf9c-08ca-4cbc-a06f-1184d6b58a21',
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             )
//             const data = await res.json()
//             this.movies = data.films
//             this.isLoading = false
//             console.log(this.movies)
//         },
//         addToFav(movie) {
//             const moviesStore = usemoviesStore()
//             moviesStore.movies.push({ ...movie, isWatched: false })
//             moviesStore.activeTab = 1
//         },
//     },
// })

export const useSearchStore = defineStore('searchStore', () => {
    const movies = ref([])
    const isLoading = ref(false)
    const getMovies = async (search) => {
        isLoading.value = true
        const res = await fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${search}`,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': 'b3b1bf9c-08ca-4cbc-a06f-1184d6b58a21',
                    'Content-Type': 'application/json',
                },
            }
        )
        const data = await res.json()
        movies.value = data.films
        isLoading.value = false
    }
    const addToFav = (movie) => {
        const moviesStore = useMoviesStore()
        const i = moviesStore.movies?.findIndex((el) => el.filmId === movie.filmId)
        if (moviesStore.movies.length == 0 || i === -1) {
            moviesStore.movies.push({ ...movie, isWatched: false })
            moviesStore.activeTab = 1
        }
    }
    return { movies, isLoading, getMovies, addToFav }
})
