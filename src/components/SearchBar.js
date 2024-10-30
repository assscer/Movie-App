import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { AppBar, Toolbar, TextField, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieStore from '../stores/MovieStore';
import debounce from 'lodash.debounce';

const SearchBar = observer(() => {
    const handleSearch = useCallback(
        debounce((query) => {
            if (query.trim() === "") {
                MovieStore.setSearchQuery("Marvel");
                MovieStore.fetchMovies("Marvel");
            } else {
                MovieStore.setSearchQuery(query);
                MovieStore.fetchMovies(query);
            }
        }, 300),
        []
    );

    const onChange = (event) => {
        const query = event.target.value;
        handleSearch(query);
    };

    return (
        <AppBar position="static" className="AppBar">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h5" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                        🎬 Movie App
                    </Typography>
                    <TextField
                        label="Search Movies"
                        variant="outlined"
                        onChange={onChange}
                        style={{ marginRight: 20, backgroundColor: 'white', borderRadius: 4 }}
                    />
                    <Button
                        color="inherit"
                        component={Link}
                        to="/favorites"
                        variant="outlined"
                        style={{ color: 'white', borderColor: 'white' }}
                    >
                        Избранные
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
});

export default SearchBar;
