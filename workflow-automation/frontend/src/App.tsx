import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import { useThemeStore } from './stores/theme.store';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { OAuthCallbackPage } from './pages/OAuthCallbackPage';
import { WorkflowListPage } from './pages/WorkflowListPage';
import { WorkflowDesignerPage } from './pages/WorkflowDesignerPage';
import { WorkflowExecutionsPage } from './pages/WorkflowExecutionsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const theme = useThemeStore((state) => state.theme);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth/callback" element={<OAuthCallbackPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/workflows" replace />} />
        <Route path="workflows" element={<WorkflowListPage />} />
        <Route path="workflows/:id/executions" element={<WorkflowExecutionsPage />} />
        <Route path="workflows/:workflowId" element={<WorkflowDesignerPage />} />
        <Route path="workflows/new" element={<WorkflowDesignerPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
