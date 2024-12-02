import React, { useEffect, useState } from 'react';
import { getEmployees, updatedError, deleteEmployee, deleteEmployees } from '../services/api';
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response?.data?.data || []);
        } catch (error) {
            toast.error(updatedError(error));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const res = await deleteEmployees(id);
                toast.success(updatedError(res))
                fetchEmployees();
                toast.success("Employee deleted successfully!");
            } catch (error) {
                toast.error(updatedError(error));
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-employee?id=${id}`);
    };

    const handleView = (id) => {
        navigate(`/view-employee?id=${id}`);
    };

    const handleAdd = () => {
        navigate(`/add-employee`);
    };

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Employee List</Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Box display="flex" justifyContent="flex-end" padding={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleAdd()}
                        >
                            Add Employee
                        </Button>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">Position</TableCell>
                                <TableCell align="left">Salary</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow key={employee._id}>
                                    <TableCell align="left">{employee.first_name}</TableCell>
                                    <TableCell align="left">{employee.last_name}</TableCell>
                                    <TableCell align="left">{employee.position}</TableCell>
                                    <TableCell align="left">{employee.salary}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            sx={{ marginRight: 1 }}
                                            onClick={() => handleView(employee._id)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{ marginRight: 1 }}
                                            onClick={() => handleEdit(employee._id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(employee._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default EmployeeList;
