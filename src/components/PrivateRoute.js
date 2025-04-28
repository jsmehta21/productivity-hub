import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext); // Get user from context

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
