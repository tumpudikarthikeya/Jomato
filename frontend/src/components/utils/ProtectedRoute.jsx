import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  // Check if userId exists in session storage
  const userId = sessionStorage.getItem('user_id');

  // If userId is not found, redirect to signin
  if (!userId) {
    return <Navigate to="/signin" />;
  }

  // If userId is found, render the requested element
  return <>{element}</>;
};

export default ProtectedRoute;
