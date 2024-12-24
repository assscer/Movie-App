import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const RegisterPage = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Обработка регистрации
    const handleRegister = () => {
        // Проверяем, существует ли уже такой email
        const existingUser = localStorage.getItem(email);
        if (existingUser) {
            setError('Этот email уже зарегистрирован');
            return;
        }

        // Сохраняем нового пользователя
        const newUser = { email, password };
        localStorage.setItem(email, JSON.stringify(newUser)); // Сохраняем пользователя в localStorage

        // Устанавливаем пользователя в состояние и переходим на главную
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser)); // Сохраняем в localStorage текущего пользователя
        navigate('/'); // Переходим на главную страницу
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Регистрация
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
                onClick={handleRegister}
                style={{ marginTop: 20 }}
            >
                Зарегистрироваться
            </Button>
        </Container>
    );
};

export default RegisterPage;
