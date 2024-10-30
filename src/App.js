import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import NavigationBar from './components/NavigationBar';

function App() {
    return (
        <Router>
            <div className="App">
                <NavigationBar />  
                <SearchBar />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
