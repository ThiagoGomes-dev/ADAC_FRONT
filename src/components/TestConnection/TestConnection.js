import React, { useEffect, useState } from 'react';
import { testConnection } from '../../services/api';
import { Alert, CircularProgress, Typography, Box } from '@mui/material';

const TestConnection = () => {
  const [status, setStatus] = useState({ success: null, data: null, message: '' });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const data = await testConnection();
        setStatus({ success: true, data, message: 'Conexão bem-sucedida!' });
        console.log('data', data)
      } catch (error) {
        setStatus({ success: false, data: null, message: 'Falha ao conectar com o backend. Verifique o servidor.',});
      }
    };
    checkConnection();
  }, []);
  console.log(status)
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Teste de Conexão com o Backend
      </Typography>

      {status.success === null && <CircularProgress />}

      {status.success && status.data && (
        <Alert severity="success" style={{ width: '500px' }}>
          <Typography variant="h6">{status.message}</Typography>
          <Typography>Nome da Aplicação: {status.data.nome}</Typography>
          <Typography>Versão: {status.data.versao}</Typography>
          <Typography>Data e Hora: {status.data.dataHora}</Typography>
        </Alert>
      )}

      {status.success === false && <Alert severity="error">{status.message}</Alert>}
    </Box>
  );
};

export default TestConnection;
