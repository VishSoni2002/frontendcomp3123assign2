import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import PrivateRoute from './components/PrivateRoute';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import ViewEmployee from './pages/ViewEmployee';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-employee" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
        <Route path="/edit-employee" element={<PrivateRoute><EditEmployee /></PrivateRoute>} />
        <Route path="/view-employee" element={<PrivateRoute><ViewEmployee /></PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
