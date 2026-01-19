import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../stores/auth.store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-6);
`;

const Message = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
`;

const ErrorMessage = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-danger);
`;

const RetryButton = styled.button`
  margin-top: var(--spacing-4);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // Check for OAuth errors
      if (errorParam) {
        setError(errorDescription || errorParam);
        return;
      }

      // Verify state
      const storedState = sessionStorage.getItem('oauth_state');
      if (state !== storedState) {
        setError('Invalid OAuth state. Please try again.');
        return;
      }

      if (!code) {
        setError('No authorization code received');
        return;
      }

      try {
        const redirectUri = `${window.location.origin}/oauth/callback`;
        await login(code, redirectUri);

        // Clear stored state
        sessionStorage.removeItem('oauth_state');

        // Redirect to workflows
        navigate('/workflows', { replace: true });
      } catch (err) {
        setError((err as Error).message);
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <Container>
        <ErrorMessage>Anmeldung fehlgeschlagen: {error}</ErrorMessage>
        <RetryButton onClick={() => navigate('/login')}>Erneut versuchen</RetryButton>
      </Container>
    );
  }

  return (
    <Container>
      <Message>Anmeldung wird abgeschlossen...</Message>
    </Container>
  );
}
