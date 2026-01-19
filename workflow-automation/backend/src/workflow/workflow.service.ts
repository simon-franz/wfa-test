import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { workflows, type WorkflowDefinitionJson } from 'shared/db';
import { ulid } from 'shared/utils';
import type { CreateWorkflowDto, UpdateWorkflowDto, WorkflowStatus } from 'shared/types';
import { TenantManager } from '../db/tenant-manager';

@Injectable()
export class WorkflowService {
  constructor(private tenantManager: TenantManager) {}

  async create(tenantId: string, userId: string, dto: CreateWorkflowDto) {
    const db = await this.tenantManager.getConnection(tenantId);
    const now = new Date();
    const id = ulid();

    db.insert(workflows)
      .values({
        id,
        name: dto.name,
        description: dto.description,
        status: 'draft',
        definition: dto.definition as WorkflowDefinitionJson,
        version: 1,
        createdBy: userId,
        createdAt: now,
        updatedAt: now,
      })
      .run();

    return this.findById(tenantId, id);
  }

  async findAll(tenantId: string) {
    const db = await this.tenantManager.getConnection(tenantId);
    return db.select().from(workflows).orderBy(desc(workflows.updatedAt)).all();
  }

  async findById(tenantId: string, id: string) {
    const db = await this.tenantManager.getConnection(tenantId);
    const workflow = db.select().from(workflows).where(eq(workflows.id, id)).get();

    if (!workflow) {
      throw new NotFoundException(`Workflow not found: ${id}`);
    }

    return workflow;
  }

  async findByStatus(tenantId: string, status: WorkflowStatus) {
    const db = await this.tenantManager.getConnection(tenantId);
    return db.select().from(workflows).where(eq(workflows.status, status)).all();
  }

  async update(tenantId: string, id: string, userId: string, dto: UpdateWorkflowDto) {
    const db = await this.tenantManager.getConnection(tenantId);
    const existing = await this.findById(tenantId, id);
    const now = new Date();

    const updateData: Partial<typeof workflows.$inferInsert> = {
      updatedBy: userId,
      updatedAt: now,
    };

    if (dto.name !== undefined) {
      updateData.name = dto.name;
    }

    if (dto.description !== undefined) {
      updateData.description = dto.description;
    }

    if (dto.status !== undefined) {
      updateData.status = dto.status;
    }

    if (dto.definition !== undefined) {
      updateData.definition = dto.definition as WorkflowDefinitionJson;
      updateData.version = existing.version + 1;
    }

    db.update(workflows).set(updateData).where(eq(workflows.id, id)).run();

    return this.findById(tenantId, id);
  }

  async delete(tenantId: string, id: string) {
    const db = await this.tenantManager.getConnection(tenantId);
    await this.findById(tenantId, id); // Verify it exists

    db.delete(workflows).where(eq(workflows.id, id)).run();
  }

  async activate(tenantId: string, id: string, userId: string) {
    return this.update(tenantId, id, userId, { status: 'active' });
  }

  async deactivate(tenantId: string, id: string, userId: string) {
    return this.update(tenantId, id, userId, { status: 'inactive' });
  }
}
