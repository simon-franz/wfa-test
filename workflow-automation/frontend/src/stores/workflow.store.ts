import { create } from 'zustand';
import type { Workflow, CreateWorkflowDto, UpdateWorkflowDto, WorkflowExecution } from 'shared/types';
import { apiClient } from '../api/client';

interface WorkflowState {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  executions: WorkflowExecution[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWorkflows: () => Promise<void>;
  fetchWorkflow: (id: string) => Promise<void>;
  createWorkflow: (dto: CreateWorkflowDto) => Promise<Workflow>;
  updateWorkflow: (id: string, dto: UpdateWorkflowDto) => Promise<Workflow>;
  deleteWorkflow: (id: string) => Promise<void>;
  activateWorkflow: (id: string) => Promise<void>;
  deactivateWorkflow: (id: string) => Promise<void>;
  triggerWorkflow: (id: string, payload?: Record<string, unknown>) => Promise<WorkflowExecution>;
  fetchExecutions: (workflowId: string) => Promise<void>;
  fetchExecution: (workflowId: string, executionId: string) => Promise<WorkflowExecution>;
  clearCurrentWorkflow: () => void;
  clearError: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflows: [],
  currentWorkflow: null,
  executions: [],
  isLoading: false,
  error: null,

  fetchWorkflows: async () => {
    set({ isLoading: true, error: null });
    try {
      const workflows = await apiClient.get<Workflow[]>('/workflows');
      set({ workflows, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchWorkflow: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const workflow = await apiClient.get<Workflow>(`/workflows/${id}`);
      set({ currentWorkflow: workflow, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createWorkflow: async (dto: CreateWorkflowDto) => {
    set({ isLoading: true, error: null });
    try {
      const workflow = await apiClient.post<Workflow>('/workflows', dto);
      set((state) => ({
        workflows: [workflow, ...state.workflows],
        currentWorkflow: workflow,
        isLoading: false,
      }));
      return workflow;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateWorkflow: async (id: string, dto: UpdateWorkflowDto) => {
    set({ isLoading: true, error: null });
    try {
      const workflow = await apiClient.put<Workflow>(`/workflows/${id}`, dto);
      set((state) => ({
        workflows: state.workflows.map((w) => (w.id === id ? workflow : w)),
        currentWorkflow: workflow,
        isLoading: false,
      }));
      return workflow;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deleteWorkflow: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete(`/workflows/${id}`);
      set((state) => ({
        workflows: state.workflows.filter((w) => w.id !== id),
        currentWorkflow: state.currentWorkflow?.id === id ? null : state.currentWorkflow,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  activateWorkflow: async (id: string) => {
    try {
      const workflow = await apiClient.post<Workflow>(`/workflows/${id}/activate`);
      set((state) => ({
        workflows: state.workflows.map((w) => (w.id === id ? workflow : w)),
        currentWorkflow: state.currentWorkflow?.id === id ? workflow : state.currentWorkflow,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  deactivateWorkflow: async (id: string) => {
    try {
      const workflow = await apiClient.post<Workflow>(`/workflows/${id}/deactivate`);
      set((state) => ({
        workflows: state.workflows.map((w) => (w.id === id ? workflow : w)),
        currentWorkflow: state.currentWorkflow?.id === id ? workflow : state.currentWorkflow,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  triggerWorkflow: async (id: string, payload?: Record<string, unknown>) => {
    try {
      const execution = await apiClient.post<WorkflowExecution>(
        `/workflows/${id}/executions/trigger`,
        { payload },
      );
      set((state) => ({
        executions: [execution, ...state.executions],
      }));
      return execution;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  fetchExecutions: async (workflowId: string) => {
    try {
      const executions = await apiClient.get<WorkflowExecution[]>(
        `/workflows/${workflowId}/executions`,
      );
      set({ executions });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchExecution: async (workflowId: string, executionId: string) => {
    try {
      const execution = await apiClient.get<WorkflowExecution>(
        `/workflows/${workflowId}/executions/${executionId}`,
      );
      return execution;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  clearCurrentWorkflow: () => set({ currentWorkflow: null }),
  clearError: () => set({ error: null }),
}));
