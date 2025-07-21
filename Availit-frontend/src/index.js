import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

const getInitialDark = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  return false;
};

function Root() {
  const [isDark, setIsDark] = useState(getInitialDark);
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  const theme = useMemo(() => getTheme(isDark ? 'dark' : 'light'), [isDark]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App isDark={isDark} setIsDark={setIsDark} />
      </Router>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
reportWebVitals();
