import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

function Root() {
  const theme = getTheme('light');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
reportWebVitals();
