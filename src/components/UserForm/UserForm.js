import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';

const UserForm = ({ mode, userData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: userData.name || '',
    surname: userData.surname || '',
    email: userData.email || '',
    profile: userData.profile || '',
  });

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      maxWidth="600px"
      margin="0 auto"
      p={2}
    >
      <Typography variant="h5" mb={2}>
        {mode === 'create' ? 'Cadastrar Usuário' : mode === 'edit' ? 'Editar Usuário' : 'Visualizar Dados'}
      </Typography>

      <TextField
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={isViewMode}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Sobrenome"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        disabled={isViewMode}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="E-mail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled={isViewMode}
        required
        type="email"
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Perfil"
        name="profile"
        value={formData.profile}
        onChange={handleChange}
        disabled={isViewMode}
        required
        fullWidth
        margin="normal"
      >
        <MenuItem value="Administrador">Administrador</MenuItem>
        <MenuItem value="Usuário">Usuário</MenuItem>
      </TextField>

      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
        {mode !== 'view' && (
          <Button variant="contained" color="primary" type="submit">
            {isEditMode ? 'Salvar' : 'Cadastrar'}
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={() => window.history.back()}>
          {isViewMode ? 'Voltar' : 'Cancelar'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
