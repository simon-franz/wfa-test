import { useState } from 'react';
import styled from 'styled-components';
import { useWorkflowStore } from '../stores/workflow.store';
import type { Workflow, WorkflowDefinition } from 'shared/types';

interface CreateWorkflowModalProps {
  onClose: () => void;
  onSuccess: (workflow: Workflow) => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-5) var(--spacing-6);
  border-bottom: 1px solid var(--color-gray-200);
`;

const ModalTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
`;

const CloseButton = styled.button`
  padding: var(--spacing-2);
  color: var(--color-gray-500);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-xl);

  &:hover {
    color: var(--color-gray-700);
  }
`;

const ModalBody = styled.div`
  padding: var(--spacing-6);
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-5);
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
  font-size: var(--font-size-base);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: var(--spacing-3);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  resize: vertical;
  min-height: 100px;
  transition: border-color var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  padding: var(--spacing-5) var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
  background-color: var(--color-gray-50);
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: var(--spacing-3) var(--spacing-5);
  font-size: var(--font-size-base);
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  ${(props) =>
    props.$variant === 'primary'
      ? `
    color: var(--color-white);
    background-color: var(--color-primary);
    border: none;
    &:hover {
      background-color: var(--color-primary-hover);
    }
    &:disabled {
      background-color: var(--color-gray-400);
      cursor: not-allowed;
    }
  `
      : `
    color: var(--color-gray-700);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-300);
    &:hover {
      background-color: var(--color-gray-100);
    }
  `}
`;

const ErrorMessage = styled.div`
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-danger);
  background-color: #fce8e8;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
`;

// Default empty workflow definition
const createEmptyDefinition = (): WorkflowDefinition => ({
  nodes: [
    {
      id: 'trigger-1',
      type: 'manual-trigger',
      name: 'Manueller Trigger',
      position: { x: 250, y: 50 },
      config: {
        description: 'Startet den Workflow manuell',
      },
    },
  ],
  edges: [],
  variables: {},
});

export function CreateWorkflowModal({ onClose, onSuccess }: CreateWorkflowModalProps) {
  const { createWorkflow, isLoading, error, clearError } = useWorkflowStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!name.trim()) return;

    try {
      const workflow = await createWorkflow({
        name: name.trim(),
        description: description.trim() || undefined,
        definition: createEmptyDefinition(),
      });
      onSuccess(workflow);
    } catch {
      // Error is handled by store
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Neuer Workflow</ModalTitle>
            <CloseButton type="button" onClick={onClose}>
              ×
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z.B. Onboarding-Prozess"
                required
                autoFocus
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optionale Beschreibung des Workflows..."
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button type="button" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" $variant="primary" disabled={isLoading || !name.trim()}>
              {isLoading ? 'Erstellen...' : 'Workflow erstellen'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Overlay>
  );
}
