import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

// Tipe data dari JWT payload (ubah sesuai payload aslimu)
interface JwtPayload {
  role: string;
  [key: string]: any; // kalau ada field lain
}

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string[]; // role bisa berupa array string
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [data, setData] = useState<JwtPayload | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .post('http://103.127.97.79:5000/login/protected', {}, {
          headers: { Authorization: token },
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    } else {
      setIsAuthenticated(false);
    }
    loadRole();
  }, []);

  const loadRole = () => {
    if (!token) return;
    const response = jwtDecode<JwtPayload>(token);
    setData(response);
  };

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (isAuthenticated) {
    if (role && data && !role.includes(data.role)) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <>{children}</>; // pakai fragment biar valid JSX
    }
  } else {
    return <Navigate to="/" replace />;
  }
};
