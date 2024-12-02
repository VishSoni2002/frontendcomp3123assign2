import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(UserContext);

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    My Employees
                </Typography>

                <Box>
                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" component={Link} to="/employees">
                                Employees
                            </Button>
                            <Button onClick={logout} color="inherit" component={Link} to="/">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
