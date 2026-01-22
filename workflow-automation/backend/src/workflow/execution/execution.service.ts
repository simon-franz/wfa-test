import { Injectable, Inject, NotFoundException, MessageEvent, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { eq, desc } from 'drizzle-orm';
import { Observable, Subject, interval } from 'rxjs';
import { map, takeWhile, finalize } from 'rxjs/operators';
import { workflowExecutions, type ExecutionContextJson } from 'shared/db';
import { ulid } from 'shared/utils';
import type { ExecutionContext, ExecutionStatus, WorkflowExecution } from 'shared/types';
import { TenantManager } from '../../db/tenant-manager';
import { WorkflowService } from '../workflow.service';

export interface TriggerWorkflowOptions {
  triggeredBy: 'manual' | 'scheduled' | 'webhook';
  triggeredByUserId?: string;
  variables?: Record<string, unknown>;
  triggerPayload?: Record<string, unknown>;
}

@Injectable()
export class ExecutionService {
  private readonly logger = new Logger(ExecutionService.name);
  private executionStreams = new Map<string, Subject<WorkflowExecution>>();

  constructor(
    private tenantManager: TenantManager,
    private workflowService: WorkflowService,
    @Inject('WORKFLOW_QUEUE') private workflowQueue: Queue,
  ) {}

  async triggerWorkflow(
    tenantId: string,
    workflowId: string,
    options: TriggerWorkflowOptions,
  ): Promise<WorkflowExecution> {
    const workflow = await this.workflowService.findById(tenantId, workflowId);

    if (workflow.status !== 'active' && options.triggeredBy !== 'manual') {
      throw new Error('Cannot trigger inactive workflow');
    }

    const db = await this.tenantManager.getConnection(tenantId);
    const executionId = ulid();
    const now = new Date();

    const context: ExecutionContextJson = {
      workflowId,
      executionId,
      variables: options.variables || {},
      nodeResults: {},
      trigger: {
        type: options.triggeredBy,
        payload: options.triggerPayload,
      },
    };

    // Create execution record
    db.insert(workflowExecutions)
      .values({
        id: executionId,
        workflowId,
        status: 'pending',
        triggeredBy: options.triggeredBy,
        triggeredByUserId: options.triggeredByUserId,
        context,
        createdAt: now,
        updatedAt: now,
      })
      .run();

    // Queue the execution
    await this.workflowQueue.add(
      'execute',
      {
        tenantId,
        executionId,
        workflowId,
      },
      {
        jobId: executionId,
        attempts: 1, // No retries
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    return this.findById(tenantId, executionId);
  }

  async findById(tenantId: string, executionId: string): Promise<WorkflowExecution> {
    const db = await this.tenantManager.getConnection(tenantId);
    const execution = db
      .select()
      .from(workflowExecutions)
      .where(eq(workflowExecutions.id, executionId))
      .get();

    if (!execution) {
      throw new NotFoundException(`Execution not found: ${executionId}`);
    }

    return this.mapToWorkflowExecution(tenantId, execution);
  }

  async findByWorkflow(tenantId: string, workflowId: string, limit = 50) {
    const db = await this.tenantManager.getConnection(tenantId);
    const executions = db
      .select()
      .from(workflowExecutions)
      .where(eq(workflowExecutions.workflowId, workflowId))
      .orderBy(desc(workflowExecutions.createdAt))
      .limit(limit)
      .all();

    return executions.map((e) => this.mapToWorkflowExecution(tenantId, e));
  }

  async updateStatus(
    tenantId: string,
    executionId: string,
    status: ExecutionStatus,
    context?: ExecutionContext,
    error?: string,
  ) {
    const db = await this.tenantManager.getConnection(tenantId);
    const now = new Date();

    const updateData: Partial<typeof workflowExecutions.$inferInsert> = {
      status,
      updatedAt: now,
    };

    if (status === 'running') {
      updateData.startedAt = now;
    }

    if (status === 'completed' || status === 'failed' || status === 'cancelled') {
      updateData.completedAt = now;
    }

    if (context) {
      updateData.context = context as unknown as ExecutionContextJson;
    }

    if (error) {
      updateData.error = error;
    }

    db.update(workflowExecutions)
      .set(updateData)
      .where(eq(workflowExecutions.id, executionId))
      .run();

    // Emit update to SSE stream if exists
    const stream = this.executionStreams.get(executionId);
    if (stream) {
      const execution = await this.findById(tenantId, executionId);
      stream.next(execution);
    }
  }

  async cancelExecution(tenantId: string, executionId: string) {
    const execution = await this.findById(tenantId, executionId);

    if (execution.status !== 'pending' && execution.status !== 'running') {
      throw new Error(`Cannot cancel execution with status: ${execution.status}`);
    }

    // Remove from queue if pending
    if (execution.status === 'pending') {
      const job = await this.workflowQueue.getJob(executionId);
      if (job) {
        await job.remove();
      }
    }

    await this.updateStatus(tenantId, executionId, 'cancelled');

    return this.findById(tenantId, executionId);
  }

  async resumeWorkflowAfterDelay(
    tenantId: string,
    executionId: string,
    nodeId: string,
    delayMs: number,
  ) {
    // Create delayed job to resume workflow
    await this.workflowQueue.add(
      'resume',
      {
        tenantId,
        executionId,
        nodeId,
      },
      {
        jobId: `${executionId}-resume-${nodeId}`,
        delay: Math.max(0, delayMs), // Ensure non-negative
        attempts: 1,
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    this.logger.log(
      `Scheduled workflow resume: ${executionId} after ${delayMs}ms (node: ${nodeId})`,
    );
  }

  streamExecution(tenantId: string, executionId: string): Observable<MessageEvent> {
    return new Observable((observer) => {
      const stream = new Subject<WorkflowExecution>();
      this.executionStreams.set(executionId, stream);

      let subscription: any;

      // Send initial state
      this.findById(tenantId, executionId)
        .then((execution) => {
          observer.next({ data: JSON.stringify(execution) } as MessageEvent);

          // Subscribe to updates
          subscription = stream.subscribe({
            next: (execution) => {
              observer.next({ data: JSON.stringify(execution) } as MessageEvent);
              
              // Complete stream when execution is done
              if (['completed', 'failed', 'cancelled'].includes(execution.status)) {
                setTimeout(() => observer.complete(), 100);
              }
            },
            error: (err) => observer.error(err),
          });
        })
        .catch((err) => observer.error(err));

      // Cleanup on disconnect
      return () => {
        subscription?.unsubscribe();
        this.executionStreams.delete(executionId);
      };
    });
  }

  private mapToWorkflowExecution(
    tenantId: string,
    record: typeof workflowExecutions.$inferSelect,
  ): WorkflowExecution {
    return {
      id: record.id,
      workflowId: record.workflowId,
      tenantId,
      status: record.status as ExecutionStatus,
      triggeredBy: record.triggeredBy as 'manual' | 'scheduled' | 'webhook',
      triggeredByUserId: record.triggeredByUserId ?? undefined,
      startedAt: record.startedAt ?? undefined,
      completedAt: record.completedAt ?? undefined,
      context: record.context as unknown as ExecutionContext,
      error: record.error ?? undefined,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
