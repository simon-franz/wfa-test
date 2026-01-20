import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../stores/auth.store';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-6);
`;

const Title = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
`;

const Section = styled.div`
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-4);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-4);
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-4);
`;

const Label = styled.label`
  display: block;
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-700);
`;

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Button = styled.button`
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ $type: 'success' | 'error' }>`
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-4);
  background-color: ${(props) =>
    props.$type === 'success' ? '#d1fae5' : '#fee2e2'};
  color: ${(props) => (props.$type === 'success' ? '#065f46' : '#991b1b')};
  font-size: var(--font-size-sm);
`;

const HelpText = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-top: var(--spacing-1);
`;

export function SettingsPage() {
  const [apiBaseUrl, setApiBaseUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Load current settings
    const token = useAuthStore.getState().accessToken;
    fetch('/api/settings/hrworks', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setApiBaseUrl(data.tenant || 'https://api.hrworks.de');
        setApiKey(data.apiKey || '');
        setApiSecret(data.apiSecret || '');
      })
      .catch((err) => {
        console.error('Failed to load settings:', err);
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const token = useAuthStore.getState().accessToken;
      const response = await fetch('/api/settings/hrworks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          apiKey,
          apiSecret,
          tenant: apiBaseUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setMessage({ type: 'success', text: 'Einstellungen erfolgreich gespeichert!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Fehler beim Speichern',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/settings/hrworks/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiBaseUrl,
          apiKey,
          apiSecret,
        }),
      });

      if (!response.ok) {
        throw new Error('Verbindung fehlgeschlagen');
      }

      setMessage({ type: 'success', text: 'Verbindung erfolgreich getestet!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Verbindung fehlgeschlagen',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Einstellungen</Title>

      {message && <Message $type={message.type}>{message.text}</Message>}

      <Section>
        <SectionTitle>HR WORKS API</SectionTitle>

        <FormGroup>
          <Label>API Base URL</Label>
          <Input
            type="text"
            value={apiBaseUrl}
            onChange={(e) => setApiBaseUrl(e.target.value)}
            placeholder="https://api.hrworks.de"
          />
          <HelpText>Die Basis-URL der HR WORKS API</HelpText>
        </FormGroup>

        <FormGroup>
          <Label>API Key (Access Key)</Label>
          <Input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Ihr API Key"
          />
          <HelpText>Der Access Key aus Ihrem HR WORKS Account</HelpText>
        </FormGroup>

        <FormGroup>
          <Label>API Secret (Secret Access Key)</Label>
          <Input
            type="password"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            placeholder="Ihr API Secret"
          />
          <HelpText>Der Secret Access Key aus Ihrem HR WORKS Account</HelpText>
        </FormGroup>

        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Speichern...' : 'Speichern'}
          </Button>
          <Button
            onClick={handleTest}
            disabled={loading || !apiKey || !apiSecret}
            style={{ backgroundColor: '#6b7280' }}
          >
            Verbindung testen
          </Button>
        </div>
      </Section>
    </Container>
  );
}
