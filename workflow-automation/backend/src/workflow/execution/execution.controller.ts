import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ExecutionService, TriggerWorkflowOptions } from './execution.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TenantId, CurrentUser } from '../../common/decorators/index';
import type { User } from 'shared/types';

interface TriggerDto {
  variables?: Record<string, unknown>;
  payload?: Record<string, unknown>;
}

@Controller('workflows/:workflowId/executions')
@UseGuards(JwtAuthGuard)
export class ExecutionController {
  constructor(private executionService: ExecutionService) {}

  @Post('trigger')
  async triggerWorkflow(
    @TenantId() tenantId: string,
    @CurrentUser() user: User,
    @Param('workflowId') workflowId: string,
    @Body() dto: TriggerDto,
  ) {
    const options: TriggerWorkflowOptions = {
      triggeredBy: 'manual',
      triggeredByUserId: user.id,
      variables: dto.variables,
      triggerPayload: dto.payload,
    };

    return this.executionService.triggerWorkflow(tenantId, workflowId, options);
  }

  @Get()
  async getExecutions(
    @TenantId() tenantId: string,
    @Param('workflowId') workflowId: string,
    @Query('limit') limit?: number,
  ) {
    return this.executionService.findByWorkflow(tenantId, workflowId, limit || 50);
  }

  @Get(':executionId')
  async getExecution(
    @TenantId() tenantId: string,
    @Param('executionId') executionId: string,
  ) {
    return this.executionService.findById(tenantId, executionId);
  }

  @Delete(':executionId')
  async cancelExecution(
    @TenantId() tenantId: string,
    @Param('executionId') executionId: string,
  ) {
    return this.executionService.cancelExecution(tenantId, executionId);
  }
}
