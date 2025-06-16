import { useState, useCallback } from 'react';
import { postSignup, postLogin, getAccessToken, logout, RequestUser, ResponseToken } from '../api'; // Adjust path as needed
import { getEncryptStorage, setEncryptStorage, removeEncryptStorage } from '../utils'; // Adjust path as needed

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  error: string | null;
  isLoading: boolean;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    accessToken: null,
    error: null,
    isLoading: false,
  });

  const signup = useCallback(async (userData: RequestUser) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await postSignup(userData);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      }));
    }
  }, []);

  const login = useCallback(async ({ name, password }: Pick<RequestUser, 'name' | 'password'>) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { accessToken, refreshToken } = await postLogin({ name, password });
      await setEncryptStorage('accessToken', accessToken);
      await setEncryptStorage('refreshToken', refreshToken);
      setAuthState({
        isAuthenticated: true,
        accessToken,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { accessToken, refreshToken } = await getAccessToken();
      await setEncryptStorage('accessToken', accessToken);
      await setEncryptStorage('refreshToken', refreshToken);
      setAuthState({
        isAuthenticated: true,
        accessToken,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        accessToken: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Token refresh failed',
      }));
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await logout();
      await removeEncryptStorage('accessToken');
      await removeEncryptStorage('refreshToken');
      setAuthState({
        isAuthenticated: false,
        accessToken: null,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  }, []);

  return {
    ...authState,
    signup,
    login,
    refreshAccessToken,
    signOut,
  };
};

export default useAuth;