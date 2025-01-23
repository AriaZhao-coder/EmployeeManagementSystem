import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
});

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

request.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
);

export default request;
