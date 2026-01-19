import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import styled from 'styled-components';

interface ProtectedRouteProps {
  children: ReactNode;
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
`;

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, checkAuth, accessToken } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (accessToken) {
        await checkAuth();
      }
      setIsChecking(false);
    };
    verify();
  }, [accessToken, checkAuth]);

  if (isChecking) {
    return <LoadingContainer>Lade...</LoadingContainer>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
