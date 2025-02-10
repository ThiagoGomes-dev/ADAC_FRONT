import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Alert, CircularProgress, Box } from '@mui/material';
import './UserEdit.css';
import { fetchUserById, editUser } from '../../services/api';
import AutoLayout from '../../components/AutoLayout/AutoLayout';

function UserEdit() {
  const { id } = useParams(); // Obtém o ID do usuário a partir da URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    middleName: '',
    email: '',
    profileName: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Busca os dados do usuário ao carregar a página
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        console.log(`Buscando usuário com ID: ${id}`); // Log para verificar o ID
        const userId = parseInt(id, 10); // Certifique-se de converter para número
        const user = await fetchUserById(userId);
        console.log("Usuário carregado:", user);
        setUserData({
          name: user.name,
          middleName: user.middleName,
          email: user.email,
          profileName: user.profileName,
        });
      } catch (err) {
        console.error(err.message);
        setError('Erro ao buscar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };
  
    loadUser();
  }, [id]);
  
  

  // Atualiza os valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Envia os dados atualizados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await editUser(id, userData); // Envia os dados editados para o backend
      setSuccessMessage('Usuário atualizado com sucesso!');
      setTimeout(() => navigate('/usuarios'), 3000); // Redireciona após 3 segundos
    } catch (err) {
      setError('Erro ao atualizar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AutoLayout>
      <div className="user-edit-container">
        <Typography variant="h4" className="title">
          Editar Usuário
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" marginTop={4}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit} className="form-container">
            {error && <Alert severity="error" className="alert">{error}</Alert>}
            {successMessage && <Alert severity="success" className="alert">{successMessage}</Alert>}

            <TextField
              label="Nome"
              name="name"
              value={userData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Sobrenome"
              name="middleName"
              value={userData.middleName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Perfil"
              name="profileName"
              value={userData.profileName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/usuarios')}
              style={{ marginTop: '10px' }}
            >
              Cancelar
            </Button>
          </form>
        )}
      </div>
    </AutoLayout>
  );
}

export default UserEdit;