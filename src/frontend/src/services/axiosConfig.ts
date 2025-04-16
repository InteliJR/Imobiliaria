import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
    baseURL: baseUrl, // https://gateway-2ev7.onrender.com/
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

// Interceptor de resposta para capturar erros globais
axiosInstance.interceptors.response.use(
    (response) => {
        // Se a resposta for bem-sucedida, simplesmente retorne a resposta
        return response;
    },
    (error) => {
        // Captura erros da requisição
        if (error.response) {
            // Erro com resposta do servidor (status 4xx ou 5xx)
            if (error.response.status === 401) {
                // Erro 401 Unauthorized
                const token = localStorage.getItem('jwtToken');

                if (!token) {
                    // Se o usuário não estiver logado, redirecione para a página de login
                    console.error('Usuário não autenticado. Redirecionando para login...');
                    window.location.href = '/login'; // Redireciona para a página de login
                } else {
                    // Se o usuário estiver logado, mas não tiver permissão
                    console.error('Acesso negado: você não tem permissão para acessar este recurso.');
                    window.location.href = '/unauthorized'; // Redireciona para uma página de "Acesso Negado"
                }
            } else {
                // Outros erros (500, 404, etc.)
                console.error('Erro na requisição:', error.response.data.message || 'Erro desconhecido');
            }
        } else if (error.request) {
            // Erro sem resposta do servidor (falha na rede, servidor offline, etc.)
            console.error('Não foi possível conectar ao servidor.');
        } else {
            // Outros erros
            console.error('Ocorreu um erro inesperado:', error.message);
        }

        // Rejeita a promessa para que o erro seja tratado no código que fez a requisição
        return Promise.reject(error);
    }
);



export default axiosInstance;
