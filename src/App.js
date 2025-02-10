import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import UserList from './pages/UserList/UserList';
import UserCreate from './pages/UserCreate/UserCreate';
import TestConnection from './components/TestConnection/TestConnection';
import UserEdit from './pages/UserEdit/UserEdit';
import UserView from './pages/UserView/UserView';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública: Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Rota de Teste de Conexão */}
        <Route path="/test-connection" element={<TestConnection />} />

        {/* Rotas protegidas com AutoLayout */}
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
        />
        <Route path="/usuarios" element={
          <PrivateRoute requiredRole="Administrador">
            <UserList />
          </PrivateRoute>
        }
        />
        <Route path="/usuarios/criar" element={
          <PrivateRoute requiredRole="Administrador">
            <UserCreate />
          </PrivateRoute>
        }
        />
        <Route
          path="/usuarios/editar/:id"
          element={
            <PrivateRoute requiredRole="Administrador">
              <UserEdit />
            </PrivateRoute>
          }
        />
        <Route path="/usuarios/visualizar/:id" element={
          <PrivateRoute>
            <UserView />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
