import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://gateway-2ev7.onrender.com/',
    withCredentials: true, // Necessário para enviar cookies/credenciais
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adiciona o token JWT em cada requisição, se existir
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default axiosInstance;
