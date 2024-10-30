import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';
import MovieStore from '../stores/MovieStore';
import FavoritesStore from '../stores/FavoritesStore';

const MovieDetail = observer(() => {
    const { id } = useParams();
    const playerRef = useRef(null);
    const localStorageKey = `movie-${id}-time`;

    useEffect(() => {
        MovieStore.fetchMovieDetails(id);
        const initializePlayer = () => {
            playerRef.current = new window.YT.Player('yt-player', {
                videoId: "2xiHwyDD6QY",
                events: {
                    onReady: (event) => {
                        const savedTime = parseFloat(localStorage.getItem(localStorageKey));
                        if (savedTime) {
                            event.target.seekTo(savedTime);
                        }
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            const interval = setInterval(() => {
                                const currentTime = playerRef.current.getCurrentTime();
                                localStorage.setItem(localStorageKey, currentTime);
                            }, 1000);
                            event.target.addEventListener('onStateChange', (e) => {
                                if (e.data !== window.YT.PlayerState.PLAYING) {
                                    clearInterval(interval);
                                }
                            });
                        }
                    },
                },
            });
        };
        const loadYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                initializePlayer();
            } else {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = () => {
                    setTimeout(initializePlayer, 500);
                };
            }
        };
        loadYouTubeAPI();
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [id]);

    const movie = MovieStore.currentMovie;
    if (!movie) return <p>Loading...</p>;

    const isFavorite = FavoritesStore.isFavorite(movie.imdbID);
    const toggleFavorite = () => {
        if (isFavorite) {
            FavoritesStore.removeFavorite(movie.imdbID);
        } else {
            FavoritesStore.addFavorite(movie);
        }
    };

    return (
        <Container className="MovieDetailContainer">
            <Card>
                <CardContent>
                    <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: 10 }}>{movie.Title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {movie.Genre} | {movie.Director} | Rating: {movie.imdbRating}
                    </Typography>
                    <Typography variant="body1" paragraph>{movie.Plot}</Typography>
                    <Button
                        variant="contained"
                        color={isFavorite ? "secondary" : "primary"}
                        onClick={toggleFavorite}
                        style={{ marginBottom: 20 }}
                    >
                        {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                    </Button>
                    <div id="yt-player" className="yt-player"></div>
                </CardContent>
            </Card>
        </Container>
    );
});

export default MovieDetail;
