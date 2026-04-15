import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authApi } from '../../../lib/api';
import { clearStoredAuth, getStoredToken, getStoredUser, setStoredAuth } from '../../../lib/storage';
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from '../../../types';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapAuthResponse(response: AuthResponse): AuthUser {
  return {
    userId: response.userId,
    email: response.email,
    nombreCompleto: response.nombreCompleto,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      clearStoredAuth();
    }

    setIsBootstrapping(false);
  }, []);

  const saveAuth = useCallback((response: AuthResponse) => {
    const nextUser = mapAuthResponse(response);
    setStoredAuth(response.token, nextUser);
    setToken(response.token);
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const response = await authApi.login(payload);
      saveAuth(response);
    },
    [saveAuth],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const response = await authApi.register(payload);
      saveAuth(response);
    },
    [saveAuth],
  );

  const logout = useCallback(() => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isBootstrapping,
      login,
      register,
      logout,
    }),
    [isBootstrapping, login, logout, register, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}

