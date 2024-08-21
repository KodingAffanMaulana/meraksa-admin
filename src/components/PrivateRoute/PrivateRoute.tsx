import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;