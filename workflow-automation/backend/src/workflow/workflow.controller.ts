import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantId, CurrentUser } from '../common/decorators/index';
import type { User, CreateWorkflowDto, UpdateWorkflowDto } from 'shared/types';

@Controller('workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}

  @Post()
  async create(
    @TenantId() tenantId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateWorkflowDto,
  ) {
    return this.workflowService.create(tenantId, user.id, dto);
  }

  @Get()
  async findAll(@TenantId() tenantId: string) {
    return this.workflowService.findAll(tenantId);
  }

  @Get(':id')
  async findById(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.workflowService.findById(tenantId, id);
  }

  @Put(':id')
  async update(
    @TenantId() tenantId: string,
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateWorkflowDto,
  ) {
    return this.workflowService.update(tenantId, id, user.id, dto);
  }

  @Delete(':id')
  async delete(@TenantId() tenantId: string, @Param('id') id: string) {
    await this.workflowService.delete(tenantId, id);
    return { deleted: true };
  }

  @Post(':id/activate')
  async activate(
    @TenantId() tenantId: string,
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return this.workflowService.activate(tenantId, id, user.id);
  }

  @Post(':id/deactivate')
  async deactivate(
    @TenantId() tenantId: string,
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return this.workflowService.deactivate(tenantId, id, user.id);
  }

  @Post('test-node')
  async testNode(
    @TenantId() tenantId: string,
    @Body() body: { nodeType: string; config: any; context: Record<string, any> },
  ) {
    return this.workflowService.testNode(tenantId, body.nodeType, body.config, body.context);
  }
}
