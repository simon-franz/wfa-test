import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDesignerStore } from '../../../stores/designer.store';

const TitleContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const TitleInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
  padding: 0;
  outline: none;

  &:focus {
    background: var(--color-bg-tertiary);
    padding: 2px 4px;
    border-radius: var(--radius-sm);
  }
`;

const TitleDisplay = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
  cursor: text;
  padding: 2px 4px;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);

  &:hover {
    background: var(--color-bg-tertiary);
  }
`;

interface EditableNodeTitleProps {
  nodeId: string;
  label: string;
}

export function EditableNodeTitle({ nodeId, label }: EditableNodeTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateNodeLabel = useDesignerStore((state) => state.updateNodeLabel);

  useEffect(() => {
    setValue(label);
  }, [label]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== label) {
      updateNodeLabel(nodeId, trimmed);
    } else {
      setValue(label);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(label);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <TitleContainer>
        <TitleInput
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      </TitleContainer>
    );
  }

  return (
    <TitleContainer>
      <TitleDisplay onClick={() => setIsEditing(true)}>
        {label}
      </TitleDisplay>
    </TitleContainer>
  );
}
