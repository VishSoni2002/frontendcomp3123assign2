import React, { useState } from 'react';
import { signup, updatedError } from '../services/api';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await signup({ username: userName, email, password });
            toast.success(updatedError(res));
            setEmail("")
            setPassword("")
            setUserName("")
        } catch (error) {
            toast.error(updatedError(error));
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>Signup</Typography>
                <form onSubmit={handleSignup}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
                        <Button type="button" onClick={() => navigate('/')} variant="contained" color="error" fullWidth>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit" fullWidth>Signup</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Signup;
