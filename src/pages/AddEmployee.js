import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addEmployee, updatedError } from '../services/api';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: 0,
        date_of_joining: new Date(),
        department: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addEmployee(formData)
            if (res.data.status) {
                toast.success(updatedError(res))
                navigate('/employees');
            } else {
                throw new Error(res)
            }
        } catch (error) {
            toast.error(updatedError(error))
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Add Employee</Typography>
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
                                Add Employee
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default AddEmployee;
