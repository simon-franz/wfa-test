import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../stores/auth.store';
import { apiClient } from '../api/client';
import type { LoginResponse } from 'shared/types';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-6);
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-white) 100%);
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-8);
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
`;

const Logo = styled.h1`
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
`;

const Subtitle = styled.p`
  margin-bottom: var(--spacing-8);
  color: var(--color-gray-600);
  text-align: center;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    background-color: var(--color-gray-400);
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin: var(--spacing-6) 0;
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--color-gray-200);
  }
`;

const DevLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  width: 100%;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-700);
  background-color: var(--color-gray-100);
  border: 1px dashed var(--color-gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-200);
    border-color: var(--color-gray-400);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DevBadge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 600;
  color: var(--color-warning);
  background-color: #fff8e6;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
`;

const ErrorMessage = styled.div`
  margin-top: var(--spacing-4);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-danger);
  background-color: #fce8e8;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
`;

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, error, clearError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [devLoginError, setDevLoginError] = useState<string | null>(null);

  useEffect(() => {
    // Check if dev mode is enabled
    apiClient
      .get<{ devMode: boolean }>('/auth/dev-mode')
      .then((res) => setIsDevMode(res.devMode))
      .catch(() => setIsDevMode(false));
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/workflows" replace />;
  }

  const handleLogin = async () => {
    setIsLoading(true);
    clearError();

    try {
      const redirectUri = `${window.location.origin}/oauth/callback`;
      const response = await apiClient.get<{ url: string; state: string }>(
        `/auth/authorize?redirectUri=${encodeURIComponent(redirectUri)}`,
      );

      // Store state for verification
      sessionStorage.setItem('oauth_state', response.state);

      // Redirect to HR WORKS OAuth
      window.location.href = response.url;
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleDevLogin = async () => {
    setIsLoading(true);
    setDevLoginError(null);
    clearError();

    try {
      const response = await apiClient.post<LoginResponse>('/auth/dev-login');

      // Store in auth store
      useAuthStore.setState({
        user: response.user,
        accessToken: response.accessToken,
        isAuthenticated: true,
      });

      navigate('/workflows', { replace: true });
    } catch (err) {
      setDevLoginError((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>Workflow Automation</Logo>
        <Subtitle>Melden Sie sich mit Ihrem HR WORKS Konto an</Subtitle>

        <LoginButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Weiterleitung...' : 'Mit HR WORKS anmelden'}
        </LoginButton>

        {isDevMode && (
          <>
            <Divider>oder</Divider>

            <DevLoginButton onClick={handleDevLogin} disabled={isLoading}>
              <DevBadge>DEV</DevBadge>
              Als Server-Admin anmelden
            </DevLoginButton>
          </>
        )}

        {(error || devLoginError) && <ErrorMessage>{error || devLoginError}</ErrorMessage>}
      </LoginCard>
    </LoginContainer>
  );
}
