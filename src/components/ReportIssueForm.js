import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';

const ReportIssueForm = () => {
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Добавляем новый отзыв в массив отзывов
        setFeedbacks((prevFeedbacks) => [
            ...prevFeedbacks,
            { user: `user${feedbacks.length + 1}`, description },
        ]);

        setDescription(''); // Очищаем поле ввода
        alert('Ваш отзыв успешно отправлен!');
    };

    return (
        <Container>
            <Typography variant="h5" style={{ marginBottom: 20 }}>
                Сообщить о проблеме для фильма ID: {id}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Описание проблемы"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ marginBottom: 20 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Отправить
                </Button>
            </form>
            <Typography variant="h6" style={{ marginTop: 20 }}>Отзывы:</Typography>
            <ul>
                {feedbacks.map((feedback, index) => (
                    <li key={index}>
                        <strong>{feedback.user}:</strong> {feedback.description}
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default ReportIssueForm;
