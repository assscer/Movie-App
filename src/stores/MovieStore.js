import { makeAutoObservable } from 'mobx';

class MovieStore {
    movies = []; // Все фильмы
    filteredMovies = []; // Отфильтрованные фильмы
    currentMovie = null; // Текущий выбранный фильм
    searchQuery = ''; // По умолчанию пустой запрос
    selectedCategory = ''; // Хранение выбранной категории
    

    constructor() {
        makeAutoObservable(this); // Делаем MovieStore реактивным
    }

    // Устанавливаем загруженные фильмы
    setMovies(movies) {
        this.movies = movies;
        this.filterMovies(); // Применяем фильтрацию после загрузки фильмов
    }

    // Устанавливаем отфильтрованные фильмы
    setFilteredMovies(movies) {
        this.filteredMovies = movies;
    }

    // Устанавливаем текущий фильм
    setCurrentMovie(movie) {
        this.currentMovie = movie;
    }

    // Устанавливаем поисковый запрос
    setSearchQuery(query) {
        this.searchQuery = query;
        this.fetchMovies(query); // Загружаем фильмы заново при изменении запроса
    }

    // Устанавливаем выбранную категорию
    setSelectedCategory(category) {
        this.selectedCategory = category;
        this.filterMovies(); // Применяем фильтрацию после выбора категории
    }

    // Метод загрузки фильмов
    async fetchMovies(query) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=7e59b8de&s=${query}`);
            const data = await response.json();

            if (data.Response === 'True' && data.Search) {
                this.setMovies(data.Search); // Устанавливаем фильмы
            } else {
                this.setMovies([]); // Если фильмы не найдены
            }
        } catch (error) {
            console.error('Ошибка при загрузке фильмов:', error);
            this.setMovies([]); // Очищаем список фильмов при ошибке
        }
    }

    // Метод загрузки деталей фильма (если нужно)
    async fetchMovieDetails(id) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=7e59b8de&i=${id}`);
            const data = await response.json();
            this.setCurrentMovie(data); // Устанавливаем текущий фильм
        } catch (error) {
            console.error('Ошибка при загрузке деталей фильма:', error);
            this.setCurrentMovie(null);
        }
    }

    // Метод фильтрации фильмов
    filterMovies() {
        let filtered = this.movies;

        // Если есть поисковый запрос
        if (this.searchQuery) {
            filtered = filtered.filter(movie =>
                movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // Если выбрана категория
        if (this.selectedCategory) {
            filtered = filtered.filter(movie =>
                movie.Type && movie.Type.toLowerCase() === this.selectedCategory.toLowerCase()
            );
        }

        this.setFilteredMovies(filtered); // Обновляем отфильтрованные фильмы
    }
}

export default new MovieStore();
