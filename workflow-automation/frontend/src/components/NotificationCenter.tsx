import { useState } from 'react';
import styled from 'styled-components';
import { useNotificationStore } from '../stores/notification.store';

const Container = styled.div`
  position: relative;
`;

const BellButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: var(--color-gray-600);
  cursor: pointer;
  padding: var(--spacing-2);
  font-size: var(--font-size-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-900);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: var(--color-danger);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: var(--radius-full);
  min-width: 18px;
  text-align: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + var(--spacing-2));
  right: 0;
  width: 400px;
  max-height: 500px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
  overflow: hidden;
  z-index: 1000;
`;

const Header = styled.div`
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);

  &:hover {
    background: var(--color-gray-100);
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div<{ $read: boolean; $type: string }>`
  padding: var(--spacing-3) var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-100);
  background: ${(props) => props.$read ? 'transparent' : 'var(--color-gray-50)'};
  cursor: pointer;
  transition: background var(--transition-fast);
  border-left: 3px solid ${(props) => {
    switch (props.$type) {
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-danger)';
      case 'warning': return 'var(--color-warning)';
      default: return 'var(--color-info)';
    }
  }};
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);

  &:hover {
    background: var(--color-gray-100);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationContent = styled.div`
  display: flex;
  gap: var(--spacing-2);
  align-items: flex-start;
  flex: 1;
`;

const NotificationIcon = styled.div<{ $type: string }>`
  font-size: var(--font-size-lg);
  flex-shrink: 0;
`;

const NotificationText = styled.div`
  flex: 1;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-400);
  cursor: pointer;
  padding: 0;
  font-size: var(--font-size-lg);
  line-height: 1;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity var(--transition-fast);

  ${NotificationItem}:hover & {
    opacity: 1;
  }

  &:hover {
    color: var(--color-gray-600);
  }
`;

const NotificationMessage = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-1);
`;

const NotificationTime = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
`;

const EmptyState = styled.div`
  padding: var(--spacing-8) var(--spacing-4);
  text-align: center;
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
`;

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return '✓';
    case 'error': return '✕';
    case 'warning': return '⚠';
    default: return 'ℹ';
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Gerade eben';
  if (minutes < 60) return `vor ${minutes} Min.`;
  if (hours < 24) return `vor ${hours} Std.`;
  if (days < 7) return `vor ${days} Tag${days > 1 ? 'en' : ''}`;
  
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, clearAll, removeNotification } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeNotification(id);
  };

  const handleClearAll = () => {
    clearAll();
    setIsOpen(false);
  };

  return (
    <Container>
      <BellButton onClick={() => setIsOpen(!isOpen)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && <Badge>{unreadCount > 99 ? '99+' : unreadCount}</Badge>}
      </BellButton>

      {isOpen && (
        <Dropdown>
          <Header>
            <Title>Benachrichtigungen</Title>
            {notifications.length > 0 && (
              <ClearButton onClick={handleClearAll}>Alle löschen</ClearButton>
            )}
          </Header>

          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState>Keine Benachrichtigungen</EmptyState>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  $read={notification.read}
                  $type={notification.type}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <NotificationContent>
                    <NotificationIcon $type={notification.type}>
                      {getIcon(notification.type)}
                    </NotificationIcon>
                    <NotificationText>
                      <NotificationMessage>{notification.message}</NotificationMessage>
                      <NotificationTime>{formatTime(notification.timestamp)}</NotificationTime>
                    </NotificationText>
                  </NotificationContent>
                  <DeleteButton onClick={(e) => handleDelete(e, notification.id)}>
                    ×
                  </DeleteButton>
                </NotificationItem>
              ))
            )}
          </NotificationList>
        </Dropdown>
      )}
    </Container>
  );
}
