import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, MenuItem, Select } from '@mui/material';
import MovieStore from '../stores/MovieStore';
import FavoritesStore from '../stores/FavoritesStore';
import { Link } from 'react-router-dom';

const MovieList = observer(() => {
    useEffect(() => {
        // Загружаем фильмы, если список пустой
        if (MovieStore.movies.length === 0) {
            MovieStore.fetchMovies('Marvel'); // Начальный запрос (например, "Marvel")
        }
    }, []);

    // Обработчик изменения поискового запроса
    const handleSearchChange = (event) => {
        MovieStore.setSearchQuery(event.target.value); // Устанавливаем поисковый запрос
    };

    // Обработчик изменения выбранной категории
    const handleCategoryChange = (event) => {
        MovieStore.setSelectedCategory(event.target.value); // Устанавливаем категорию
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Поле ввода для поиска */}
            <div style={{ marginBottom: '20px' }}>
                {/* <input
                    type="text"
                    placeholder="Поиск фильмов..."
                    value={MovieStore.searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        padding: '10px',
                        width: '100%',
                        maxWidth: '400px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                /> */}
            </div>

            {/* Выпадающее меню для выбора категории */}
            <Select
                value={MovieStore.selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                style={{ marginBottom: '20px', width: '200px' }}
            >
                <MenuItem value="">Все категории</MenuItem>
                <MenuItem value="movie">Фильмы</MenuItem>
                <MenuItem value="series">Сериалы</MenuItem>
                <MenuItem value="episode">Эпизоды</MenuItem>
            </Select>

            {/* Отображение фильмов */}
            <Grid container spacing={3}>
                {MovieStore.filteredMovies.length > 0 ? (
                    MovieStore.filteredMovies.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                            <Card className="MovieCard">
                                <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                                        alt={movie.Title}
                                        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                            {movie.Title} ({movie.Year})
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <Button
                                    variant="contained"
                                    color={FavoritesStore.isFavorite(movie.imdbID) ? 'secondary' : 'primary'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (FavoritesStore.isFavorite(movie.imdbID)) {
                                            FavoritesStore.removeFavorite(movie.imdbID);
                                        } else {
                                            FavoritesStore.addFavorite(movie);
                                        }
                                    }}
                                    style={{ margin: '10px' }}
                                >
                                    {FavoritesStore.isFavorite(movie.imdbID) ? 'Удалить из избранного' : 'Добавить в избранное'}
                                </Button>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h5" style={{ margin: '20px auto', textAlign: 'center', width: '100%' }}>
                        Фильмы не найдены
                    </Typography>
                )}
            </Grid>
        </div>
    );
});

export default MovieList;
