import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCog, FaLock, FaFileAlt } from 'react-icons/fa';
import axios from 'axios'; // Certifique-se de ter o axios configurado corretamente
import logo from '../../assets/Logo-white.png';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState('');

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado. Redirecionando para login.');
        }

        // Define o token no cabeçalho padrão
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Chama o endpoint para obter o perfil do usuário
        const response = await axios.get('http://localhost:8080/api/v1/account');
        const account = response.data;

        if (account?.profile) {
          setPerfil(account.profile); // Assume que o backend retorna "profile"
        } else {
          throw new Error('Perfil do usuário não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao obter perfil:', error.message);
        localStorage.removeItem('token');
        navigate('/login'); // Redireciona para o login em caso de erro
      }
    };

    fetchAccountInfo();
  }, [navigate]);

  return (
    <div className="sidebar">
      {/* Cabeçalho da Sidebar */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo ADAC" className="sidebar-logo" />
        <span className="sidebar-version">v1.0.0</span>
      </div>

      {/* Menu Principal */}
      <ul className="sidebar-menu">
        <li>
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
            <FaTachometerAlt className="icon" /> Home
          </Link>
        </li>

        {/* Menus visíveis apenas para Administrador */}
        {perfil === 'Administrador' && (
          <>
            <li>
              <Link
                to="/usuarios"
                className={location.pathname === '/usuarios' ? 'active' : ''}
              >
                <FaUsers className="icon" /> Gerenciar Usuários
              </Link>
            </li>
            <li>
              <Link
                to="/empresas"
                className={location.pathname === '/empresas' ? 'active' : ''}
              >
                <FaBuilding className="icon" /> Gerenciar Empresas
              </Link>
            </li>
            <li>
              <Link
                to="/perfis"
                className={location.pathname === '/perfis' ? 'active' : ''}
              >
                <FaCog className="icon" /> Gerenciar Perfis
              </Link>
            </li>
            <li>
              <Link
                to="/permissoes"
                className={location.pathname === '/permissoes' ? 'active' : ''}
              >
                <FaLock className="icon" /> Listagem de Permissões
              </Link>
            </li>
          </>
        )}

        {/* Seção de Análises Contábeis */}
        <h3 className="sidebar-section-title">Análises Contábeis</h3>
        <li>
          <Link
            to="/analise-notas-omissas"
            className={location.pathname === '/analise-notas-omissas' ? 'active' : ''}
          >
            <FaFileAlt className="icon" /> Análise Notas Omissas
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
