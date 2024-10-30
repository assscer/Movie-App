import { makeAutoObservable } from 'mobx';

class FavoritesStore {
    favorites = [];

    constructor() {
        makeAutoObservable(this);
        this.loadFavorites(); 
    }

    addFavorite(movie) {
        if (!this.favorites.find((fav) => fav.imdbID === movie.imdbID)) {
            this.favorites.push(movie);
            this.saveFavorites(); 
        }
    }

    removeFavorite(movieId) {
        this.favorites = this.favorites.filter((fav) => fav.imdbID !== movieId);
        this.saveFavorites(); 
    }

    isFavorite(movieId) {
        return this.favorites.some((fav) => fav.imdbID === movieId);
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            this.favorites = JSON.parse(storedFavorites);
        }
    }
}

export default new FavoritesStore();
