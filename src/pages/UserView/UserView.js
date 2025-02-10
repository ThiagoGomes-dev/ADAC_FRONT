import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, CircularProgress, Box, Alert } from '@mui/material';
import './UserView.css';
import { fetchUserById } from '../../services/api';
import AutoLayout from '../../components/AutoLayout/AutoLayout';

function UserView() {
  const { id } = useParams(); // Obtém o ID do usuário a partir da URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    middleName: '',
    email: '',
    profileName: '',
    statusName: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Busca os dados do usuário ao carregar a página
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const user = await fetchUserById(id); // Busca os dados do usuário pelo ID
        setUserData({
          name: user.name,
          middleName: user.middleName,
          email: user.email,
          profileName: user.profileName,
          statusName: user.statusName === 'ATIVO' ? 'Ativo' : 'Inativo',
        });
      } catch (err) {
        setError('Erro ao carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  return (
    <AutoLayout>
      <div className="user-view-container">
        <Typography variant="h4" className="title">
          Visualizar Usuário
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" marginTop={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && <Alert severity="error" className="alert">{error}</Alert>}

            <Box className="form-container">
              <TextField
                label="Nome"
                value={userData.name}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }} // Torna o campo somente leitura
              />

              <TextField
                label="Sobrenome"
                value={userData.middleName}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }} // Torna o campo somente leitura
              />

              <TextField
                label="Email"
                value={userData.email}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }} // Torna o campo somente leitura
              />

              <TextField
                label="Perfil"
                value={userData.profileName}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }} // Torna o campo somente leitura
              />

              <TextField
                label="Status"
                value={userData.statusName}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }} // Torna o campo somente leitura
              />

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate('/usuarios')}
                style={{ marginTop: '20px' }}
              >
                Voltar
              </Button>
            </Box>
          </>
        )}
      </div>
    </AutoLayout>
  );
}

export default UserView;
