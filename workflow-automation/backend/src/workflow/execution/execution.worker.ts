import { Injectable, OnModuleInit, OnModuleDestroy, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Worker, Job } from 'bullmq';
import type { ExecutionContext, WorkflowDefinition } from 'shared/types';
import { TenantManager } from '../../db/tenant-manager';
import { WorkflowService } from '../workflow.service';
import { WorkflowEngineService } from '../engine/workflow-engine.service';
import { ExecutionService } from './execution.service';
import { WORKFLOW_QUEUE } from '../queue/queue.module';

interface ExecutionJobData {
  tenantId: string;
  executionId: string;
  workflowId: string;
}

interface ResumeJobData {
  tenantId: string;
  executionId: string;
  nodeId: string;
}

@Injectable()
export class ExecutionWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ExecutionWorker.name);
  private worker: Worker | null = null;

  constructor(
    private configService: ConfigService,
    private tenantManager: TenantManager,
    private workflowService: WorkflowService,
    private workflowEngine: WorkflowEngineService,
    private executionService: ExecutionService,
  ) {}

  async onModuleInit() {
    this.worker = new Worker<ExecutionJobData | ResumeJobData>(
      WORKFLOW_QUEUE,
      async (job) => {
        if (job.name === 'execute') {
          return this.processExecuteJob(job as Job<ExecutionJobData>);
        } else if (job.name === 'resume') {
          return this.processResumeJob(job as Job<ResumeJobData>);
        }
        throw new Error(`Unknown job type: ${job.name}`);
      },
      {
        connection: {
          host: this.configService.get<string>('REDIS_HOST') || 'localhost',
          port: this.configService.get<number>('REDIS_PORT') || 6379,
        },
        concurrency: 5,
      },
    );

    this.worker.on('completed', (job) => {
      this.logger.log(`Job completed: ${job.id}`);
    });

    this.worker.on('failed', (job, error) => {
      this.logger.error(`Job failed: ${job?.id}`, error);
    });

    this.logger.log('Execution worker started');
  }

  async onModuleDestroy() {
    if (this.worker) {
      await this.worker.close();
    }
  }

  private async processExecuteJob(job: Job<ExecutionJobData>) {
    const { tenantId, executionId, workflowId } = job.data;

    this.logger.log(`Processing execution: ${executionId} for workflow: ${workflowId}`);

    try {
      // Get workflow definition
      const workflow = await this.workflowService.findById(tenantId, workflowId);
      const definition = workflow.definition as WorkflowDefinition;

      // Get current execution to retrieve context
      const execution = await this.executionService.findById(tenantId, executionId);
      const context: ExecutionContext = {
        ...execution.context,
        tenantId,
      };

      // Update status to running
      await this.executionService.updateStatus(tenantId, executionId, 'running', context);

      // Execute workflow
      const resultContext = await this.workflowEngine.executeWorkflow(definition, context);

      // Re-fetch execution to check if it's waiting
      const updatedExecution = await this.executionService.findById(tenantId, executionId);
      
      // Update status to completed (only if not waiting)
      if (updatedExecution.status !== 'waiting') {
        await this.executionService.updateStatus(tenantId, executionId, 'completed', resultContext);
      }

      this.logger.log(`Execution completed: ${executionId}`);

      return resultContext;
    } catch (error) {
      this.logger.error(`Execution failed: ${executionId}`, error);

      // Update status to failed
      await this.executionService.updateStatus(
        tenantId,
        executionId,
        'failed',
        undefined,
        (error as Error).message,
      );

      throw error;
    }
  }

  private async processResumeJob(job: Job<ResumeJobData>) {
    const { tenantId, executionId, nodeId } = job.data;

    this.logger.log(`Resuming execution: ${executionId} from node: ${nodeId}`);

    try {
      // Get execution
      const execution = await this.executionService.findById(tenantId, executionId);
      
      if (execution.status !== 'waiting') {
        this.logger.warn(`Execution ${executionId} is not waiting, skipping resume`);
        return;
      }

      // Get workflow definition
      const workflow = await this.workflowService.findById(tenantId, execution.workflowId);
      const definition = workflow.definition as WorkflowDefinition;

      // Mark waiting node as completed
      const context: ExecutionContext = {
        ...execution.context,
        tenantId,
      };

      if (context.nodeResults[nodeId]) {
        context.nodeResults[nodeId].status = 'completed';
        context.nodeResults[nodeId].completedAt = new Date();
      }

      // Update status to running
      await this.executionService.updateStatus(tenantId, executionId, 'running', context);

      // Continue workflow execution from next nodes
      const resultContext = await this.workflowEngine.resumeWorkflow(
        definition,
        context,
        nodeId,
      );

      // Update status to completed
      await this.executionService.updateStatus(tenantId, executionId, 'completed', resultContext);

      this.logger.log(`Execution resumed and completed: ${executionId}`);

      return resultContext;
    } catch (error) {
      this.logger.error(`Resume failed: ${executionId}`, error);

      await this.executionService.updateStatus(
        tenantId,
        executionId,
        'failed',
        undefined,
        (error as Error).message,
      );

      throw error;
    }
  }
}
