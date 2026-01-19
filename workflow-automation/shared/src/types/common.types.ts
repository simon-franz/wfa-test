export type ULID = string;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type NodeStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export type WorkflowStatus = 'draft' | 'active' | 'inactive' | 'archived';

export type ExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}
