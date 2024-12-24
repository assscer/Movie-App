import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ name: '', position: '', salary: '' });
    const [editEmployee, setEditEmployee] = useState(null);

    // Загружаем сотрудников из localStorage при монтировании компонента
    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        }
    }, []);

    // Сохраняем сотрудников в localStorage каждый раз, когда данные изменяются
    useEffect(() => {
        if (employees.length > 0) {
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    }, [employees]);

    // Обработчик добавления нового сотрудника
    const handleAddEmployee = () => {
        const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
        const updatedEmployees = [...employees, { id: newId, ...newEmployee }];
        setEmployees(updatedEmployees);
        setNewEmployee({ name: '', position: '', salary: '' });
    };

    // Обработчик редактирования сотрудника
    const handleEditEmployee = (id) => {
        const employee = employees.find(emp => emp.id === id);
        setEditEmployee({ ...employee });
    };

    // Обработчик сохранения изменений сотрудника
    const handleSaveEmployee = () => {
        const updatedEmployees = employees.map(emp =>
            emp.id === editEmployee.id ? editEmployee : emp
        );
        setEmployees(updatedEmployees);
        setEditEmployee(null);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Сотрудники
            </Typography>
            <Typography variant="h6" gutterBottom>
                Добавить нового сотрудника
            </Typography>
            <TextField
                label="Имя"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Должность"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Зарплата"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddEmployee}
                style={{ marginTop: 20 }}
            >
                Добавить сотрудника
            </Button>

            <Typography variant="h6" gutterBottom style={{ marginTop: 40 }}>
                Список сотрудников
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя</TableCell>
                            <TableCell>Должность</TableCell>
                            <TableCell>Зарплата</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>
                                    {editEmployee && editEmployee.id === employee.id ? (
                                        <TextField
                                            value={editEmployee.name}
                                            onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
                                            fullWidth
                                        />
                                    ) : (
                                        employee.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editEmployee && editEmployee.id === employee.id ? (
                                        <TextField
                                            value={editEmployee.position}
                                            onChange={(e) => setEditEmployee({ ...editEmployee, position: e.target.value })}
                                            fullWidth
                                        />
                                    ) : (
                                        employee.position
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editEmployee && editEmployee.id === employee.id ? (
                                        <TextField
                                            value={editEmployee.salary}
                                            onChange={(e) => setEditEmployee({ ...editEmployee, salary: e.target.value })}
                                            fullWidth
                                        />
                                    ) : (
                                        employee.salary
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editEmployee && editEmployee.id === employee.id ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSaveEmployee}
                                        >
                                            Сохранить
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleEditEmployee(employee.id)}
                                        >
                                            Редактировать
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EmployeesPage;
