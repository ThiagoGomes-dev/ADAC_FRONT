import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa o createRoot
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme'; // Importa o tema customizado

// Obtém o elemento root do HTML
const container = document.getElementById('root');
const root = createRoot(container); // Cria a raiz do React 18

// Renderiza o aplicativo
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Aplica o reset global de estilos */}
    <App />
  </ThemeProvider>
);
