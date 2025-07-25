// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

function ProtectedRoute({ children }) {
  const user = auth.currentUser;
  if (!user) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
