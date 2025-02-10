import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, MenuItem, Alert } from '@mui/material';
import AutoLayout from '../../components/AutoLayout/AutoLayout';
import { createUser } from '../../services/api'; // Função de criação de usuário
import './UserCreate.css';

const UserCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    middleName: '',
    email: '',
    profileName: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Perfis disponíveis
  const perfis = ['administrador', 'comum'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.middleName || !formData.email || !formData.profileName) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }

    try {
      await createUser(formData); // Chama a API para criar o usuário
      setSuccessMessage('Usuário criado com sucesso!');
      setErrorMessage('');

      setTimeout(() => {
        navigate('/usuarios');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao criar usuário. Tente novamente.');
    }
  };

  return (
    <AutoLayout>
      <Box className="user-create-container">
        <Typography variant="h4" gutterBottom>
          Cadastrar Usuário
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Box className="user-create-content">
          <Box className="user-profile-picture">
            <Box className="profile-placeholder" />
          </Box>

          <form onSubmit={handleSubmit} className="user-create-form">
            <TextField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Sobrenome"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Perfil"
              name="profileName"
              value={formData.profileName}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              required
            >
              {perfis.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Box className="box-btn">
              <Button variant="contained" color="error" onClick={() => navigate('/gerenciar-usuarios')}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </AutoLayout>
  );
};

export default UserCreate;
