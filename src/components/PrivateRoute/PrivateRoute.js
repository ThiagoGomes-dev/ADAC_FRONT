import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8080/api/v1/account', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { profile } = response.data; // Pegamos o campo `profile`
        setUserProfile(profile);

        // Verifica se o perfil é compatível com a rota requerida
        if (requiredRole && profile !== requiredRole) {
          setUnauthorized(true);
        }
      } catch (error) {
        console.error('Erro ao validar perfil:', error);
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [requiredRole]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (unauthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
