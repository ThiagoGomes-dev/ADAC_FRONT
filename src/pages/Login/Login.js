import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { Alert } from '@mui/material';
import logo from '../../assets/Logo.png'; 
import backgroundlogo from '../../assets/background-logo.png';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [successMessage] = useState(false); // State para o Alert
  const [showPassword, setShowPassword] = useState(false); // Controle do ícone do olho
  const [rememberMe, setRememberMe] = useState(false); // Checkbox "Mantenha-me conectado"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    if (!email || !password) {
      setError('Email e senha são obrigatórios.');
      setLoading(false);
      return;
    }
  
    try {
      const data = await login(email, password);
      if (data?.token) {
        localStorage.setItem('token', data.token); // Salva o token no localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        navigate('/home'); // Redireciona para a página inicial
      } else {
        throw new Error('Token não recebido do servidor.');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err.message || err);
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo ADAC" className="logo" />
        <span className="version">v1.0.0</span>
      </div>
      {/* Imagem de fundo desfocada */}
      <img src={backgroundlogo} alt="Fundo Desfocado" className="background-logo" />
      {/* Alerta */}
      {successMessage && (
        <Alert severity="success" className="alert">
          Login realizado com sucesso!
        </Alert>
      )}  
      <div className="login-card">
        <h2>Análise de Auditoria Contábil</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit} className="form-login">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className='input-tile'>Email</label>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label className='input-tile'>Senha</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Mantenha-me conectado
            </label>
            <button
              type="button"
              onClick={() => alert('Funcionalidade em desenvolvimento')}
              className="link-button"
            >
              Esqueceu sua senha?
            </button>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Carregando...' : 'Login'}
          </button>

          <div className="register-link">
            <button
              type="button"
              onClick={() => alert('Funcionalidade em desenvolvimento')}
              className="link-button"
            >
              Não tem uma conta?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
