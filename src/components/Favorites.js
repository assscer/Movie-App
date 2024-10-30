import React from 'react';
import { observer } from 'mobx-react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import FavoritesStore from '../stores/FavoritesStore';
import { Link } from 'react-router-dom';

const Favorites = observer(() => {
    return (
        <Grid container spacing={3}>
            {FavoritesStore.favorites.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={movie.Poster}
                                alt={movie.Title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {movie.Title} ({movie.Year})
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        FavoritesStore.removeFavorite(movie.imdbID);
                                    }}
                                >
                                    Удалить из избранного
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
});

export default Favorites;
