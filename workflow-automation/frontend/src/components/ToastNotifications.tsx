import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNotificationStore } from '../stores/notification.store';

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: var(--spacing-4);
  right: var(--spacing-4);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  max-width: 400px;
`;

const Toast = styled.div<{ $type: string; $isExiting?: boolean }>`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid ${(props) => {
    switch (props.$type) {
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-danger)';
      case 'warning': return 'var(--color-warning)';
      default: return 'var(--color-info)';
    }
  }};
  animation: ${(props) => props.$isExiting ? slideOut : slideIn} 0.3s ease-out;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
`;

const Icon = styled.div<{ $type: string }>`
  font-size: var(--font-size-xl);
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-400);
  cursor: pointer;
  padding: 0;
  font-size: var(--font-size-lg);
  line-height: 1;
  flex-shrink: 0;

  &:hover {
    color: var(--color-gray-600);
  }
`;

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return '✓';
    case 'error': return '✕';
    case 'warning': return '⚠';
    default: return 'ℹ';
  }
};

export function ToastNotifications() {
  const { notifications, removeNotification } = useNotificationStore();

  // Auto-remove toasts after 5 seconds (but keep in notification center)
  useEffect(() => {
    const timers = notifications
      .filter((n) => !n.read)
      .map((notification) =>
        setTimeout(() => {
          // Mark as read instead of removing
          useNotificationStore.getState().markAsRead(notification.id);
        }, 5000)
      );

    return () => timers.forEach(clearTimeout);
  }, [notifications]);

  // Only show last 3 unread notifications as toasts
  const toasts = notifications.filter((n) => !n.read).slice(0, 3);

  return (
    <ToastContainer>
      {toasts.map((notification) => (
        <Toast key={notification.id} $type={notification.type}>
          <Icon $type={notification.type}>{getIcon(notification.type)}</Icon>
          <Content>{notification.message}</Content>
          <CloseButton onClick={() => removeNotification(notification.id)}>
            ×
          </CloseButton>
        </Toast>
      ))}
    </ToastContainer>
  );
}
