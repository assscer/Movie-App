import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const NavigationBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Проверяем, авторизован ли пользователь
    const user = localStorage.getItem('user');

    const goHome = () => {
        navigate('/');
    };

    const goBack = () => {
        navigate(-1);
    };

    const logout = () => {
        // Удаляем данные пользователя из localStorage и перенаправляем на страницу логина
        localStorage.removeItem('user');
        navigate('/login');
    };

    const goEmployees = () => {
        // Переход на страницу сотрудников
        navigate('/employees');
    };

    return (
        <AppBar position="static" style={{ marginBottom: 20, backgroundColor: '#3f51b5' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Movie App
                </Typography>

                {location.pathname !== '/' && (
                    <Button
                        onClick={goHome}
                        variant="outlined"
                        color="inherit"
                        style={{
                            marginRight: '10px',
                            borderColor: 'white',
                            color: 'white',
                            textTransform: 'none',
                        }}
                    >
                        Домой
                    </Button>
                )}

                {/* Кнопка "Сотрудники" */}
                {user && (
                    <Button
                        onClick={goEmployees}
                        variant="outlined"
                        color="inherit"
                        style={{
                            marginRight: '10px',
                            borderColor: 'white',
                            color: 'white',
                            textTransform: 'none',
                        }}
                    >
                        Сотрудники
                    </Button>
                )}

                {/* Кнопка "Назад" всегда отображается */}
                <Button
                    onClick={goBack}
                    variant="outlined"
                    color="inherit"
                    style={{
                        borderColor: 'white',
                        color: 'white',
                        textTransform: 'none',
                    }}
                >
                    Назад
                </Button>

                {/* Если пользователь авторизован, показываем кнопку "Выйти" */}
                {user ? (
                    <Button
                        onClick={logout}
                        variant="outlined"
                        color="inherit"
                        style={{
                            marginLeft: '10px',
                            borderColor: 'white',
                            color: 'white',
                            textTransform: 'none',
                        }}
                    >
                        Выйти
                    </Button>
                ) : (
                    // Если пользователь не авторизован, показываем кнопку "Войти"
                    location.pathname !== '/login' && (
                        <Button
                            onClick={() => navigate('/login')}
                            variant="outlined"
                            color="inherit"
                            style={{
                                marginLeft: '10px',
                                borderColor: 'white',
                                color: 'white',
                                textTransform: 'none',
                            }}
                        >
                            Войти
                        </Button>
                    )
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
