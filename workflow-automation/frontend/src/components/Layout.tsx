import { Outlet, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../stores/auth.store';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow-sm);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--color-gray-700)')};
  font-weight: ${(props) => (props.$active ? '500' : '400')};
  text-decoration: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-100);
    text-decoration: none;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
`;

const UserName = styled.span`
  color: var(--color-gray-700);
  font-size: var(--font-size-sm);
`;

const LogoutButton = styled.button`
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  background: none;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-400);
  }
`;

const Main = styled.main`
  flex: 1;
  padding: var(--spacing-6);
`;

export function Layout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <LayoutContainer>
      <Header>
        <Logo to="/">
          <span>Workflow Automation</span>
        </Logo>

        <Nav>
          <NavLink to="/workflows" $active={location.pathname.startsWith('/workflows')}>
            Workflows
          </NavLink>
          <NavLink to="/settings" $active={location.pathname.startsWith('/settings')}>
            Einstellungen
          </NavLink>
        </Nav>

        <UserSection>
          {user && (
            <UserName>
              {user.firstName} {user.lastName}
            </UserName>
          )}
          <LogoutButton onClick={logout}>Abmelden</LogoutButton>
        </UserSection>
      </Header>

      <Main>
        <Outlet />
      </Main>
    </LayoutContainer>
  );
}
