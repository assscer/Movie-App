import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = () => {
        const storedUser = localStorage.getItem(email);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.password === password) {
                localStorage.setItem('user', JSON.stringify(user)); // Сохраняем данные авторизованного пользователя
                navigate('/');
            } else {
                setError('Неверный пароль');
            }
        } else {
            setError('Пользователь не найден');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    const handleForgotPasswordRedirect = () => {
        navigate('/forgot-password'); // Переход на страницу сброса пароля
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Вход
            </Typography>
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Пароль"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error" align="center">{error}</Typography>}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                style={{ marginTop: 20 }}
            >
                Войти
            </Button>
            <Button
                variant="text"
                color="primary"
                fullWidth
                onClick={handleRegisterRedirect}
                style={{ marginTop: 20 }}
            >
                Зарегистрировать
            </Button>
            <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={handleForgotPasswordRedirect}
                style={{ marginTop: 10 }}
            >
                Забыли пароль?
            </Button>
        </Container>
    );
};

export default AuthPage;
