import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import MovieStore from '../stores/MovieStore';
import FavoritesStore from '../stores/FavoritesStore';
import { Link } from 'react-router-dom';

const MovieList = observer(() => {
    useEffect(() => {
        if (MovieStore.movies.length === 0) {
            MovieStore.fetchMovies(MovieStore.searchQuery);
        }
    }, []);

    return (
        <Grid container spacing={3} style={{ padding: '20px' }}>
            {MovieStore.movies.length > 0 ? (
                MovieStore.movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                        <Card className="MovieCard">
                            <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={movie.Poster}
                                    alt={movie.Title}
                                    style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                />
                                <CardContent className="MovieCardContent">
                                    <Typography gutterBottom variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                        {movie.Title} ({movie.Year})
                                    </Typography>
                                </CardContent>
                            </Link>
                            <Button
                                variant="contained"
                                color={FavoritesStore.isFavorite(movie.imdbID) ? "secondary" : "primary"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (FavoritesStore.isFavorite(movie.imdbID)) {
                                        FavoritesStore.removeFavorite(movie.imdbID);
                                    } else {
                                        FavoritesStore.addFavorite(movie);
                                    }
                                }}
                                className="MovieCardButton"
                                style={{ margin: '10px' }}
                            >
                                {FavoritesStore.isFavorite(movie.imdbID) ? "Удалить из избранного" : "Добавить в избранное"}
                            </Button>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="h5" style={{ margin: '20px auto', textAlign: 'center', width: '100%' }}>
                    Not Found
                </Typography>
            )}
        </Grid>
    );
});

export default MovieList;
