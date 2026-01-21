import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { workflows, type WorkflowDefinitionJson } from 'shared/db';
import { ulid } from 'shared/utils';
import type { CreateWorkflowDto, UpdateWorkflowDto, WorkflowStatus } from 'shared/types';
import { TenantManager } from '../db/tenant-manager';
import { HrworksApiService } from '../hrworks/hrworks-api.service';

@Injectable()
export class WorkflowService {
  private readonly logger = new Logger(WorkflowService.name);

  constructor(
    private tenantManager: TenantManager,
    private hrworksApi: HrworksApiService,
  ) {}

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

  async testNode(tenantId: string, nodeType: string, config: any, context: Record<string, any>) {
    // Handle different node types
    if (nodeType === 'hrworks') {
      return this.executeHrworksNode(tenantId, config, context);
    }

    if (nodeType === 'data-transform') {
      return this.executeDataTransform(config, context);
    }

    if (nodeType === 'manual-trigger' || nodeType === 'scheduled-trigger') {
      return {
        success: true,
        output: { triggered: true, timestamp: new Date().toISOString() },
      };
    }

    return {
      success: true,
      output: { message: 'Node executed successfully', config, context },
    };
  }

  private async executeHrworksNode(tenantId: string, config: any, context: Record<string, any>) {
    const { endpoint, params, parameters } = config;
    const actualParams = params || parameters;

    if (!endpoint) {
      throw new Error('HR WORKS endpoint not configured');
    }

    this.logger.log(`Executing HR WORKS node: ${endpoint} for tenant ${tenantId}`);
    this.logger.log(`Config: ${JSON.stringify(config)}`);
    this.logger.log(`Params: ${JSON.stringify(actualParams)}`);

    try {
      let result: any;

      // Map endpoint to API calls
      switch (endpoint) {
        case 'getPersons':
        case 'persons':
        case 'persons.getAll':
          result = { persons: await this.hrworksApi.getAllPersons(tenantId) };
          break;

        case 'getPerson':
        case 'person':
        case 'persons.get':
          if (!actualParams?.personnelNumber) {
            throw new Error('personnelNumber parameter required for getPerson');
          }
          const resolvedPersonnelNumber = this.resolveTemplatePath(actualParams.personnelNumber, context) || actualParams.personnelNumber;
          result = { person: await this.hrworksApi.getPerson(tenantId, resolvedPersonnelNumber) };
          break;

        case 'persons.create':
        case 'createPerson':
          this.logger.log(`persons.create params: ${JSON.stringify(actualParams)}`);
          const personData = actualParams?.personData || actualParams;
          this.logger.log(`personData after extraction: ${JSON.stringify(personData)}`);
          if (!personData || Object.keys(personData).length === 0) {
            throw new Error('personData parameter required for persons.create');
          }
          const resolvedPersonData = typeof personData === 'string' 
            ? this.resolveTemplatePath(personData, context) 
            : personData;
          this.logger.log(`resolvedPersonData: ${JSON.stringify(resolvedPersonData)}`);
          result = { person: await this.hrworksApi.createPerson(tenantId, resolvedPersonData) };
          break;

        case 'getOrganizationUnits':
        case 'organizationUnits':
        case 'organizationUnits.getAll':
          result = { organizationUnits: await this.hrworksApi.getAllOrganizationUnits(tenantId) };
          break;

        case 'getOrganizationUnit':
        case 'organizationUnit':
        case 'organizationUnits.get':
          if (!actualParams?.orgUnitId) {
            throw new Error('orgUnitId parameter required for getOrganizationUnit');
          }
          const resolvedOrgUnitId = this.resolveTemplatePath(actualParams.orgUnitId, context) || actualParams.orgUnitId;
          result = { organizationUnit: await this.hrworksApi.getOrganizationUnit(tenantId, resolvedOrgUnitId) };
          break;

        default:
          throw new Error(`Unknown HR WORKS endpoint: ${endpoint}`);
      }

      return {
        success: true,
        output: result,
      };
    } catch (error) {
      this.logger.error(`HR WORKS API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private executeDataTransform(config: any, context: Record<string, any>) {
    const { operation, inputPath, fieldPath, filterCondition, mapExpression } = config;

    // Resolve the input value from context using template syntax
    const resolvedInput = this.resolveTemplatePath(inputPath, context);

    let result: any;

    switch (operation) {
      case 'count':
        if (Array.isArray(resolvedInput)) {
          result = resolvedInput.length;
        } else if (resolvedInput && typeof resolvedInput === 'object') {
          result = Object.keys(resolvedInput).length;
        } else {
          result = 0;
        }
        break;

      case 'extract':
        result = this.extractField(resolvedInput, fieldPath);
        break;

      case 'filter':
        if (!Array.isArray(resolvedInput)) {
          throw new Error('Filter operation requires an array input');
        }
        result = this.filterArray(resolvedInput, filterCondition);
        break;

      case 'map':
        if (!Array.isArray(resolvedInput)) {
          throw new Error('Map operation requires an array input');
        }
        result = this.mapArray(resolvedInput, mapExpression);
        break;

      default:
        throw new Error(`Unknown data-transform operation: ${operation}`);
    }

    return {
      success: true,
      output: { result },
    };
  }

  private resolveTemplatePath(path: string, context: Record<string, any>): any {
    if (!path) return undefined;

    // Check if it's a template expression like {{NodeName.field.path}}
    const templateMatch = path.match(/^\{\{(.+)\}\}$/);
    if (templateMatch) {
      let fullPath = templateMatch[1].trim();

      // Handle the case where users include ".output." in the path
      // The context stores values directly under the node name, not under "output"
      // So {{NodeName.output.field}} should be treated as {{NodeName.field}}
      fullPath = fullPath.replace(/\.output\./g, '.');
      fullPath = fullPath.replace(/\.output$/g, '');

      return this.getValueByPath(context, fullPath);
    }

    // Otherwise treat as a direct path
    return this.getValueByPath(context, path);
  }

  private getValueByPath(obj: any, path: string): any {
    if (!obj || !path) return undefined;

    const parts = path.split('.');
    let current = obj;

    for (const part of parts) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[part];
    }

    return current;
  }

  private extractField(input: any, fieldPath: string): any {
    if (!fieldPath) return input;

    if (Array.isArray(input)) {
      return input.map(item => this.getValueByPath(item, fieldPath));
    }

    return this.getValueByPath(input, fieldPath);
  }

  private filterArray(input: any[], condition: string): any[] {
    if (!condition) return input;

    // Simple condition parsing: field == value, field != value, field > value, etc.
    const match = condition.match(/^(\w+)\s*(==|!=|>|<|>=|<=)\s*(.+)$/);
    if (!match) return input;

    const [, field, operator, rawValue] = match;
    const value = this.parseValue(rawValue.trim());

    return input.filter(item => {
      const itemValue = item[field];
      switch (operator) {
        case '==': return itemValue == value;
        case '!=': return itemValue != value;
        case '>': return itemValue > value;
        case '<': return itemValue < value;
        case '>=': return itemValue >= value;
        case '<=': return itemValue <= value;
        default: return true;
      }
    });
  }

  private mapArray(input: any[], expression: string): any[] {
    if (!expression) return input;

    // Simple mapping: extract a field or create an object with selected fields
    // Format: "field1, field2" or just "field1"
    const fields = expression.split(',').map(f => f.trim()).filter(Boolean);

    if (fields.length === 1) {
      return input.map(item => item[fields[0]]);
    }

    return input.map(item => {
      const result: Record<string, any> = {};
      for (const field of fields) {
        result[field] = item[field];
      }
      return result;
    });
  }

  private parseValue(str: string): any {
    // Remove quotes if present
    if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
      return str.slice(1, -1);
    }
    // Try to parse as number
    const num = Number(str);
    if (!isNaN(num)) return num;
    // Try to parse as boolean
    if (str === 'true') return true;
    if (str === 'false') return false;
    // Return as string
    return str;
  }
}
