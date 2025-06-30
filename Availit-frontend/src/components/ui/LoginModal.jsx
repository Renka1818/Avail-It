import React, { useState } from 'react';
import SignUpModal from './SignUpModal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = ({ open, onClose, role }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        const storage = keepSignedIn ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        storage.setItem('username', data.username);
        storage.setItem('role', data.role);
        // Remove from the other storage to avoid conflicts
        (keepSignedIn ? sessionStorage : localStorage).removeItem('token');
        (keepSignedIn ? sessionStorage : localStorage).removeItem('username');
        (keepSignedIn ? sessionStorage : localStorage).removeItem('role');
        if (data.role === 'ADMIN') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/user/dashboard';
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative animate-fade-in">
          <IconButton
            aria-label="close"
            onClick={onClose}
            className="!absolute !top-2 !right-2 !text-3xl !text-gray-400 hover:!text-red-500 hover:!bg-gray-100 !rounded-full !p-2 transition-colors duration-200 focus:!outline-none focus:!ring-2 focus:!ring-red-400"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <h2 className="text-2xl font-bold mb-4 text-center">{role} Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                value={role}
                readOnly
              />
            </div>
            <div className="flex items-center">
              <input
                id="keepSignedIn"
                type="checkbox"
                checked={keepSignedIn}
                onChange={e => setKeepSignedIn(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="keepSignedIn" className="text-sm">Keep me signed in</label>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">New here?{' '}</span>
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
              onClick={() => { setShowSignUp(true); }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <SignUpModal open={showSignUp} onClose={() => setShowSignUp(false)} defaultRole={role} />
    </>
  );
};

export default LoginModal; 