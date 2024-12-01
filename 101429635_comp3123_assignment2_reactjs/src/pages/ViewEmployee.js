import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEmployeeById, updatedError } from '../services/api';

const ViewEmployee = () => {
    const [employee, setEmployee] = useState({
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
                setEmployee({
                    ...res.data.data,
                    date_of_joining: new Date(res.data.data?.date_of_joining).toISOString().split('T')[0] || ''
                });
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
                <Typography variant="h4" gutterBottom>
                    Employee Details
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {employee.first_name} {employee.last_name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Email:</strong> {employee.email}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Position:</strong> {employee.position}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Salary:</strong> ${employee.salary}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Date of Joining:</strong> {employee.date_of_joining}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Department:</strong> {employee.department}
                        </Typography>
                    </CardContent>
                </Card>
                <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
                    <Button type="button" onClick={() => navigate('/employees')} variant="contained" color="error" fullWidth>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/employees')}
                        fullWidth
                    >
                        Back to Employee List
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ViewEmployee;
