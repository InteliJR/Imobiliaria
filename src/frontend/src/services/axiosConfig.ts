import axios from 'axios';

const axiosInstance = axios.create();

// add o token jwt em cada requisição
axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
