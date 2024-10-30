import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const NavigationBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goHome = () => {
        navigate('/');
    };

    const goBack = () => {
        navigate(-1);
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
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
