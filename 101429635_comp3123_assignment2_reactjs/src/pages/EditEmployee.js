import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEmployeeById, updateEmployee, updatedError } from '../services/api';

const EditEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: 0,
        date_of_joining: '',
        department: ''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const employeeId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        if (employeeId) {
            fetchEmployeeData(employeeId);
        }
    }, [employeeId]);

    const fetchEmployeeData = async (id) => {
        try {
            const res = await getEmployeeById(id);
            if (res.data.status) {
                setFormData({ ...res.data.data, date_of_joining: new Date(res.data.data?.date_of_joining).toISOString().split('T')[0] || '' });
            } else {
                throw new Error(res);
            }
        } catch (error) {
            toast.error(updatedError(error));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateEmployee(employeeId, formData);
            if (res.data.status) {
                toast.success(updatedError(res));
                navigate('/employees');
            } else {
                throw new Error(res);
            }
        } catch (error) {
            toast.error(updatedError(error));
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Edit Employee</Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            type="email"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            label="Date of Joining"
                            name="date_of_joining"
                            value={formData.date_of_joining}
                            onChange={handleChange}
                            variant="outlined"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
                            <Button type="button" onClick={() => navigate('/employees')} variant="contained" color="error" fullWidth>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default EditEmployee;
