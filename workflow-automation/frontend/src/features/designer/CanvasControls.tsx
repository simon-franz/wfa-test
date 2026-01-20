import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useReactFlow } from '@xyflow/react';
import { useDesignerStore } from '../../stores/designer.store';
import { useAutoLayout } from './hooks/useAutoLayout';
import { useThemeStore } from '../../stores/theme.store';

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 10;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: var(--color-border);
  margin: 0 4px;
`;

const ControlButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: ${(props) => (props.$disabled ? 'var(--color-text-muted)' : 'var(--color-text)')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: background var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--color-bg-tertiary);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ZoomDisplay = styled.span`
  min-width: 48px;
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const HelpText = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-left: 8px;
`;

// Icons as SVG components
const ZoomOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35M8 11h6" />
  </svg>
);

const ZoomInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
  </svg>
);

const FitViewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const UndoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7v6h6M3 13a9 9 0 1 0 2.5-6.3L3 7" />
  </svg>
);

const RedoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 7v6h-6M21 13a9 9 0 1 1-2.5-6.3L21 7" />
  </svg>
);

const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const LayoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

interface CanvasControlsProps {
  onFullscreen?: () => void;
}

export function CanvasControls({ onFullscreen }: CanvasControlsProps) {
  const { zoomIn, zoomOut, fitView, getZoom } = useReactFlow();
  const { undo, redo, canUndo, canRedo } = useDesignerStore();
  const { applyAutoLayout } = useAutoLayout();
  const { theme, toggleTheme } = useThemeStore();

  // Get current zoom level (React Flow uses 0-x scale, we want percentage)
  const zoomLevel = Math.round(getZoom() * 100);

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 200 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 200 });
  }, [zoomOut]);

  const handleFitView = useCallback(() => {
    fitView({ duration: 200, padding: 0.2 });
  }, [fitView]);

  const handleAutoLayout = useCallback(() => {
    applyAutoLayout({ direction: 'LR', nodeSpacing: 150, rankSpacing: 250 });
    setTimeout(() => fitView({ duration: 200, padding: 0.2 }), 100);
  }, [applyAutoLayout, fitView]);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          if (canRedo()) redo();
        } else {
          if (canUndo()) undo();
        }
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'y') {
        event.preventDefault();
        if (canRedo()) redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return (
    <ControlsContainer>
      {/* Undo/Redo */}
      <ControlGroup>
        <ControlButton
          onClick={undo}
          $disabled={!canUndo()}
          disabled={!canUndo()}
          title="Rückgängig (Ctrl+Z)"
        >
          <UndoIcon />
        </ControlButton>
        <ControlButton
          onClick={redo}
          $disabled={!canRedo()}
          disabled={!canRedo()}
          title="Wiederholen (Ctrl+Shift+Z)"
        >
          <RedoIcon />
        </ControlButton>
      </ControlGroup>

      <Divider />

      {/* Zoom Controls */}
      <ControlGroup>
        <ControlButton onClick={handleZoomOut} title="Verkleinern">
          <ZoomOutIcon />
        </ControlButton>
        <ZoomDisplay>{zoomLevel}%</ZoomDisplay>
        <ControlButton onClick={handleZoomIn} title="Vergrößern">
          <ZoomInIcon />
        </ControlButton>
        <ControlButton onClick={handleFitView} title="Einpassen">
          <FitViewIcon />
        </ControlButton>
      </ControlGroup>

      <Divider />

      {/* Auto Layout */}
      <ControlButton onClick={handleAutoLayout} title="Automatisches Layout (Links nach Rechts)">
        <LayoutIcon />
      </ControlButton>

      <Divider />

      {/* Dark Mode Toggle */}
      <ControlButton onClick={handleToggleTheme} title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </ControlButton>

      <Divider />

      {/* Fullscreen */}
      {onFullscreen && (
        <ControlButton onClick={onFullscreen} title="Vollbild">
          <FullscreenIcon />
        </ControlButton>
      )}

      <HelpText>Ctrl+Z / Ctrl+Shift+Z</HelpText>
    </ControlsContainer>
  );
}
