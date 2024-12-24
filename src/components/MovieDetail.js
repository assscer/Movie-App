import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Container,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
} from '@mui/material';
import MovieStore from '../stores/MovieStore';
import FavoritesStore from '../stores/FavoritesStore';

const MovieDetail = observer(() => {
    const { id } = useParams();
    const playerRef = useRef(null);
    const localStorageKey = `movie-${id}-time`;

    const [openDialog, setOpenDialog] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem(`movie-${id}-reviews`)) || [];
        setReviews(savedReviews);
    }, [id]);

    const saveReviewsToLocalStorage = (newReviews) => {
        localStorage.setItem(`movie-${id}-reviews`, JSON.stringify(newReviews));
    };

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

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const handleSubmitReview = () => {
        const newReview = {
            id: Date.now(),
            user: `user${reviews.length + 1}`,
            text: reviewText,
        };
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        saveReviewsToLocalStorage(updatedReviews);
        setReviewText("");
        handleDialogClose();
    };

    return (
        <Container className="MovieDetailContainer">
            <Card>
                <CardContent>
                    <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: 10 }}>
                        {movie.Title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {movie.Genre} | {movie.Director} | Rating: {movie.imdbRating}
                    </Typography>
                    <Typography variant="body1" paragraph>{movie.Plot}</Typography>

                    {/* Контейнер для адаптивного видео */}
                    <div style={{ position: "relative", paddingTop: "56.25%", marginBottom: 20 }}>
                        <div
                            id="yt-player"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        ></div>
                    </div>
                </CardContent>
            </Card>

            <Box display="flex" justifyContent="center" gap={2} mt={2} mb={4}>
                <Button
                    variant="contained"
                    color={isFavorite ? "secondary" : "primary"}
                    onClick={toggleFavorite}
                >
                    {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDialogOpen}
                >
                    Сообщить о проблеме
                </Button>
            </Box>

            <Container>
                <Typography variant="h5" style={{ marginTop: 20 }}>Отзывы:</Typography>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card key={review.id} style={{ marginTop: 10 }}>
                            <CardContent>
                                <Typography variant="subtitle2">
                                    <b style={{ color: "#3f51b5" }}>{review.user}:</b>
                                </Typography>
                                <Typography variant="body2" style={{ marginTop: 5 }}>
                                    {review.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: 10 }}>
                        Пока нет отзывов.
                    </Typography>
                )}
            </Container>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle style={{ backgroundColor: "#f5f5f5", fontWeight: "bold", color: "#3f51b5" }}>
                    Сообщить о проблеме
                </DialogTitle>
                <DialogContent style={{ backgroundColor: "#f5f5f5" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="review"
                        label="Опишите проблему"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">Отмена</Button>
                    <Button onClick={handleSubmitReview} color="primary">Отправить</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
});

export default MovieDetail;
