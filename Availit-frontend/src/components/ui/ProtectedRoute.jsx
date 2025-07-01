import React from 'react';
import { Navigate } from 'react-router-dom';

const getAuthItem = (key) => localStorage.getItem(key) || sessionStorage.getItem(key);

const ProtectedRoute = ({ children, role }) => {
  const token = getAuthItem('token');
  const userRole = getAuthItem('role');

  if (!token) {
    return <Navigate to="/role" replace />;
  }
  if (role && userRole !== role) {
    if (userRole === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'USER') return <Navigate to="/user/dashboard" replace />;
    return <Navigate to="/role" replace />;
  }
  return children;
};

export default ProtectedRoute; 