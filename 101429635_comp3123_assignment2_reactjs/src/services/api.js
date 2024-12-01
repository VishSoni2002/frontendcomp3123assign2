import axios from 'axios';

const API_BASE_URL = 'https://bbackendcomp3123assign2-e1o5.vercel.app/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

// Auth APIs
export const loginApi = (data) => apiClient.post('/user/login', data);
export const signup = (data) => apiClient.post('/user/signup', data);

// Employee APIs
export const getEmployees = () => apiClient.get('/emp/employees');
export const getEmployeeById = (id) => apiClient.get(`/emp/employees/${id}`);
export const addEmployee = (data) => apiClient.post(`/emp/employees`, data);
export const updateEmployee = (id, data) => apiClient.put(`/emp/employees/${id}`, data);
export const deleteEmployees = (id) => apiClient.delete(`/emp/employees/${id}`);



export const updatedError = (error) => {
    return error?.data?.message || error?.response?.data?.message || error?.response?.data?.errors[0]?.msg || error?.response?.message
}

export default API_BASE_URL;
