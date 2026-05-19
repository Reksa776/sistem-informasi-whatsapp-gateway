import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .post('http://103.127.97.79:5000/login/protected', {},{
          headers: { Authorization: token },
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ?  <Navigate to="/dashboard" replace />: children; // Use Navigate instead of Redirect
};
