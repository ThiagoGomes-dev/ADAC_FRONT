import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { ExpandMore, Logout, Person } from '@mui/icons-material';
import { getAccountInfo } from '../../services/authService'; // Importa o serviço para buscar informações da conta
import './TopMenu.css';
import api from '../../services/api';

const TopMenu = () => {
  const [username, setUsername] = useState('Usuário');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Função estável para logout

  const handleLogout = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        await api.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('token'); // Remove o token do armazenamento local
      navigate('/login'); // Redireciona para login
    }
  }, [navigate]);
  

  // Busca o nome do usuário ao carregar o componente
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const account = await getAccountInfo(); // Chama o endpoint para buscar informações do usuário
        setUsername(account.email); // Assume que o backend retorna o campo `emajl`
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        handleLogout(); // Redireciona para login em caso de erro
      }
    };

    fetchAccount();
  }, [handleLogout]); // Agora `handleLogout` é estável e pode ser incluído como dependência

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="top-menu">
      <div className="user-info" onClick={handleMenuOpen}>
        <Avatar alt={username} src="/broken-image.jpg" /> {/* Ícone do Avatar */}
        <Typography variant="body1" className="username">
          {username}
        </Typography>
        <ExpandMore className="dropdown-icon" /> {/* Ícone de seta */}
      </div>

      {/* Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
        PaperProps={{
          style: { width: '180px' },
        }}
      >
        <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>
          <Person fontSize="small" style={{ marginRight: '8px' }} />
          Perfil
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" style={{ marginRight: '8px', color: 'red' }} />
          <Typography color="error">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TopMenu;
