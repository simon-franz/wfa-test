import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { WorkflowEngineService } from './engine/workflow-engine.service';
import { XStateGenerator } from './engine/xstate-generator';
import { ExpressionService } from './expression/expression.service';
import { ExecutionController } from './execution/execution.controller';
import { ExecutionService } from './execution/execution.service';
import { ExecutionWorker } from './execution/execution.worker';
import { QueueModule } from './queue/queue.module';
import { NodeRegistry } from './nodes/node-registry';
import { HrworksModule } from '../hrworks/hrworks.module';

// Import node types
import { ManualTriggerNode } from './nodes/trigger/manual-trigger.node';
import { ScheduledTriggerNode } from './nodes/trigger/scheduled-trigger.node';
import { HttpRequestNode } from './nodes/action/http-request.node';
import { ConditionNode } from './nodes/action/condition.node';
import { DelayNode } from './nodes/action/delay.node';
import { HrworksNode } from './nodes/action/hrworks.node';
import { DataTransformNode } from './nodes/action/data-transform.node';
import { CalculationNode } from './nodes/action/calculation.node';

@Module({
  imports: [QueueModule, HrworksModule],
  controllers: [WorkflowController, ExecutionController],
  providers: [
    WorkflowService,
    WorkflowEngineService,
    XStateGenerator,
    ExpressionService,
    ExecutionService,
    ExecutionWorker,
    NodeRegistry,
    // Node types
    ManualTriggerNode,
    ScheduledTriggerNode,
    HttpRequestNode,
    ConditionNode,
    DelayNode,
    HrworksNode,
    DataTransformNode,
    CalculationNode,
  ],
  exports: [WorkflowService, WorkflowEngineService, ExecutionService],
})
export class WorkflowModule {}
