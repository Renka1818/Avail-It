import { createTheme } from '@mui/material/styles';

export function getTheme(mode = 'light') {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff9800',
      },
      background: mode === 'dark'
        ? {
            default: '#181A20',
            paper: '#23272F',
          }
        : {
            default: '#f4f6fa',
            paper: '#fff',
          },
    },
    typography: {
      h3: {
        fontWeight: 700,
        color: '#1976d2',
      },
      h6: {
        color: mode === 'dark' ? '#fff' : '#333',
      },
    },
  });
} 