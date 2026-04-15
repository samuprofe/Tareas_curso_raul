import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import type { ReactNode } from 'react';

export function GuestRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <div className="page-shell items-center justify-center text-stone-300">Cargando sesion...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}

