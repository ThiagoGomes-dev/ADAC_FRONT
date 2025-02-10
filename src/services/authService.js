import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password }, { withCredentials: false });
    
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token); // Armazena o novo token
    }

    console.log('Login bem-sucedido:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error.response?.data || error.message);
    throw new Error('Credenciais inválidas. Verifique e tente novamente.');
  }
};


export const getAccountInfo = async () => {
  try {
    const response = await api.get('/account', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}, withCredentials:false 
    });
    return response.data; // Retorna os dados da conta
  } catch (error) {
    console.error('Erro ao buscar informações da conta:', error.response?.data || error.message);
    throw new Error('Erro ao buscar informações da conta. Faça login novamente.');
  }
};

// Interceptor para adicionar o token Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Token expirado, redirecionando para login...');
      localStorage.removeItem('token'); // Remove token inválido
      window.location.href = '/login'; // Redireciona para login
    }
    return Promise.reject(error);
  }
);