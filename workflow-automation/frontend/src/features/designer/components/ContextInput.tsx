import { useRef } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  gap: var(--spacing-2);
`;

const StyledInput = styled.input`
  flex: 1;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  resize: vertical;
  min-height: 80px;
  font-family: monospace;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

interface ContextInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (rect: DOMRect) => void;
  onBlur?: () => void;
  placeholder?: string;
  multiline?: boolean;
}

export function ContextInput({
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  multiline = false,
}: ContextInputProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleFocus = () => {
    if (onFocus && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      onFocus(rect);
    }
  };

  return (
    <InputWrapper>
      {multiline ? (
        <StyledTextarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      ) : (
        <StyledInput
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      )}
    </InputWrapper>
  );
}
