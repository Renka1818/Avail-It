import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SignUpModal = ({ open, onClose, defaultRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(defaultRole || 'USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordStrengthColor, setPasswordStrengthColor] = useState('');

  function getPasswordStrength(pw) {
    if (!pw) return { label: '', color: '' };
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (pw.length < 6) return { label: 'Weak', color: 'text-red-500' };
    if (!specialChar.test(pw)) return { label: 'Medium', color: 'text-yellow-500' };
    if (pw.length >= 8 && specialChar.test(pw)) return { label: 'Strong', color: 'text-green-600' };
    return { label: 'Medium', color: 'text-yellow-500' };
  }

  React.useEffect(() => {
    const { label, color } = getPasswordStrength(password);
    setPasswordStrength(label);
    setPasswordStrengthColor(color);
  }, [password]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { label } = getPasswordStrength(password);
    if (label === 'Weak' || !label) {
      setError('Password must be at least 6 characters and contain at least one special character.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registration successful! You can now log in.');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md relative animate-fade-in">
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="!absolute !top-2 !right-2 !text-3xl !text-gray-400 hover:!text-red-500 hover:!bg-gray-100 !rounded-full !p-2 transition-colors duration-200 focus:!outline-none focus:!ring-2 focus:!ring-red-400"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
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
            <div className="text-xs text-gray-500 mb-1">Password should be at least 6 characters long and must contain at least one special character.</div>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {password && (
              <div className={`mt-1 text-xs font-semibold ${passwordStrengthColor}`}>Password strength: {passwordStrength}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal; 