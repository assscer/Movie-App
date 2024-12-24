import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import NavigationBar from './components/NavigationBar';
import AuthPage from './components/AuthPage'; // Страница авторизации
import RegisterPage from './components/RegisterPage'; // Страница регистрации
import ForgotPasswordPage from './components/ForgotPasswordPage'; // Страница сброса пароля
import EmployeesPage from './components/EmployeesPage'; // Страница сотрудников
import ReportIssueForm from './components/ReportIssueForm';


function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <NavigationBar user={user} setUser={setUser} />
                {user && <SearchBar />}
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/register" element={<RegisterPage setUser={setUser} />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Страница сброса пароля */}
                    <Route path="/" element={user ? <MovieList /> : <AuthPage />} />
                    <Route path="/movie/:id" element={user ? <MovieDetail /> : <AuthPage />} />
                    <Route path="/favorites" element={user ? <Favorites /> : <AuthPage />} />
                    <Route path="/report-issue/:id" element={<ReportIssueForm />} />
                    <Route path="/employees" element={user ? <EmployeesPage /> : <AuthPage />} /> {/* Страница сотрудников */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
