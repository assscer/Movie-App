import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Обработка сброса пароля
    const handleResetPassword = () => {
        const storedUser = localStorage.getItem(email);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            user.password = newPassword; // Обновляем пароль пользователя
            localStorage.setItem(email, JSON.stringify(user)); // Сохраняем новый пароль в localStorage
            navigate('/login'); // Перенаправляем на страницу входа после успешного сброса пароля
        } else {
            setError('Пользователь не найден');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Сброс пароля
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
                label="Новый пароль"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && <Typography color="error" align="center">{error}</Typography>}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleResetPassword}
                style={{ marginTop: 20 }}
            >
                Сбросить пароль
            </Button>
        </Container>
    );
};

export default ForgotPasswordPage;
