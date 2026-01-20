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

const ContextButton = styled.button`
  padding: var(--spacing-2);
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  white-space: nowrap;
  flex-shrink: 0;
  height: fit-content;

  &:hover {
    background-color: var(--color-gray-200);
  }
`;

interface ContextInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onOpenContext: () => void;
  placeholder?: string;
  multiline?: boolean;
}

export function ContextInput({
  type = 'text',
  value,
  onChange,
  onOpenContext,
  placeholder,
  multiline = false,
}: ContextInputProps) {
  return (
    <InputWrapper>
      {multiline ? (
        <StyledTextarea value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <StyledInput type={type} value={value} onChange={onChange} placeholder={placeholder} />
      )}
      <ContextButton type="button" onClick={onOpenContext} title="Kontext einfügen">
        {'{ }'}
      </ContextButton>
    </InputWrapper>
  );
}
