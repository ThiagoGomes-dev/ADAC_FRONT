import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Cor principal
    },
    secondary: {
      main: '#FF5722', // Cor secundária
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none', // Remove o texto em maiúsculas
        },
      },
    },
  },
});

export default theme;
