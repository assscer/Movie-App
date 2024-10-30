import { makeAutoObservable } from 'mobx';

class MovieStore {
    movies = [];
    currentMovie = null;
    searchQuery = 'Marvel';

    constructor() {
        makeAutoObservable(this);
    }

    setMovies(movies) {
        this.movies = movies;
    }

    setCurrentMovie(movie) {
        this.currentMovie = movie;
    }

    setSearchQuery(query) {
        this.searchQuery = query;
    }

    async fetchMovies(query) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=7e59b8de&s=${query}`);
            const data = await response.json();
            if (data.Response === "True" && data.Search) {
                this.setMovies(data.Search);
            } else {
                this.setMovies([]);
            }
        } catch (error) {
            console.error("Ошибка при загрузке фильмов:", error);
            this.setMovies([]); 
        }
    }

    async fetchMovieDetails(id) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=7e59b8de&i=${id}`);
            const data = await response.json();
            this.setCurrentMovie(data);
        } catch (error) {
            console.error("Ошибка при загрузке деталей фильма:", error);
            this.setCurrentMovie(null); 
        }
    }
}

export default new MovieStore();
