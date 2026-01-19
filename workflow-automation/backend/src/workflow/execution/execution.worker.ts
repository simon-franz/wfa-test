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
    this.worker = new Worker<ExecutionJobData>(
      WORKFLOW_QUEUE,
      async (job) => this.processJob(job),
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

  private async processJob(job: Job<ExecutionJobData>) {
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

      // Update status to completed
      await this.executionService.updateStatus(tenantId, executionId, 'completed', resultContext);

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
}
