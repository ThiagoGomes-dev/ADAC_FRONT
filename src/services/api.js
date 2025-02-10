import axios from 'axios';

// Criação da instância do axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Permitir envio de cookies/credenciais
});

// Interceptor para adicionar o token Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Busca o token no localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
  }
  return config;
});

// Testar conexão com o backend
export const testConnection = async () => {
  try {
    const response = await api.get('/app-info');
    return response.data;
  } catch (error) {
    throw new Error('Falha ao conectar com o backend.');
  }
};

// Criar usuário
export const createUser = async (userData) => {
  try {
    const response = await api.post('/usuarios/criar', userData, {withCredentials:false});
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error.response?.data || error.message);
    throw new Error('Falha ao criar usuário. Verifique os dados informados.');
  }
};

// Editar usuário
export const editUser = async (id, userData) => {
  try {
    const response = await api.put(`/usuarios/editar/${id}`, userData, { withCredentials: false });
    return response.data; // Retorna os dados atualizados ou uma mensagem de sucesso
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error.response?.data || error.message);
    throw new Error('Erro ao atualizar o usuário.');
  }
};


// Excluir usuário
export const deleteUser = async (id) => {
  try {
    await api.delete(`/usuarios/delete/${id}`, {withCredentials: false});
  } catch (error) {
    console.error('Erro ao excluir usuário:', error.response?.data || error.message);
    throw error;
  }
};

// Ativar usuário
export const activateUser = async (id) => {
  try {
    const response = await api.put(`/usuarios/ativar/${id}`, null, { withCredentials: false });
    return response.data;
  } catch (error) {
    console.error('Erro ao ativar usuário:', error.response?.data || error.message);
    throw new Error('Falha ao ativar o usuário. Verifique os dados informados.');
  }
};

// Desativar usuário
export const deactivateUser = async (id) => {
  try {
    const response = await api.put(`/usuarios/desativar/${id}`, null, { withCredentials: false });
    return response.data;
  } catch (error) {
    console.error('Erro ao desativar usuário:', error.response?.data || error.message);
    throw new Error('Falha ao desativar o usuário. Verifique os dados informados.');
  }
};

// Buscar usuários
export const fetchUsers = async (page) => {
  try {
    const response = await api.get('/usuarios/buscarTodos', {
      params: { page }, // Agora enviamos diretamente o número correto da página

      withCredentials: false,
    });
    
    // Adapta os dados para incluir a estrutura esperada no front-end
    return {
      users: response.data.content || [], // Pegando a lista dentro do `content`
      totalPages: response.data.totalPages || 1,
    };
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.response?.data || error.message);
    throw error;
  }
};

// Buscar usuário por ID
export const fetchUserById = async (id) => {
  try {
    console.log(`Enviando requisição para /findById com ID: ${id}`);
    const response = await api.get(`/usuarios/findById/${id}`, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário por ID: ${error.response?.data || error.message}`);
    throw new Error('Erro ao buscar o usuário. Tente novamente.');
  }
};






export default api;
