import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
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

    if (nodeType === 'calculation') {
      return this.executeCalculation(config, context);
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
        case 'persons.getById':
          if (!actualParams?.personnelNumber && !actualParams?.id) {
            throw new Error('personnelNumber or id parameter required for getPerson');
          }
          const personnelNumberRaw = actualParams.personnelNumber || actualParams.id;
          this.logger.log(`Context keys: ${Object.keys(context).join(', ')}`);
          if (context.nodeResults) {
            this.logger.log(`NodeResults keys: ${Object.keys(context.nodeResults).join(', ')}`);
            // Log first nodeResult structure
            const firstKey = Object.keys(context.nodeResults)[0];
            if (firstKey) {
              this.logger.log(`First nodeResult (${firstKey}): ${JSON.stringify(context.nodeResults[firstKey]).substring(0, 300)}`);
            }
          }
          // Test getValueByPath directly
          const testValue = this.getValueByPath(context, 'allPersons.persons[0].personnelNumber');
          this.logger.log(`Direct getValueByPath test: ${testValue}`);
          
          const resolvedPersonnelNumber = this.resolveTemplatePath(personnelNumberRaw, context) || personnelNumberRaw;
          this.logger.log(`personnelNumber raw: ${personnelNumberRaw}, resolved: ${resolvedPersonnelNumber}`);
          result = { person: await this.hrworksApi.getPerson(tenantId, resolvedPersonnelNumber) };
          break;

        case 'persons.create':
        case 'createPerson':
          this.logger.log(`persons.create params: ${JSON.stringify(actualParams)}`);
          this.logger.log(`context keys: ${JSON.stringify(Object.keys(context))}`);
          this.logger.log(`context: ${JSON.stringify(context, null, 2)}`);
          const personData = actualParams?.personData || actualParams;
          this.logger.log(`personData after extraction: ${JSON.stringify(personData)}`);
          if (!personData || Object.keys(personData).length === 0) {
            throw new Error('personData parameter required for persons.create');
          }
          // Resolve all template expressions in the personData object
          const resolvedPersonData = this.resolveTemplatesInObject(personData, context);
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`HR WORKS API error: ${errorMessage}`);
      throw new BadRequestException(errorMessage);
    }
  }

  private executeDataTransform(config: any, context: Record<string, any>) {
    const { operation, inputPath, fieldPath, filterCondition, mapExpression } = config;

    // Resolve the input value from context using template syntax
    const resolvedInput = this.resolveTemplatePath(inputPath, context);
    
    this.logger.log(`DataTransform: operation=${operation}, inputPath=${inputPath}, resolvedInput type=${typeof resolvedInput}, isArray=${Array.isArray(resolvedInput)}, length=${Array.isArray(resolvedInput) ? resolvedInput.length : 'N/A'}`);

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

  private executeCalculation(config: any, context: Record<string, any>) {
    const { operation, inputValue, amount } = config;

    if (!operation || !inputValue || amount === undefined) {
      throw new Error('Calculation requires operation, inputValue, and amount');
    }

    // Ensure globalContext exists for template resolution
    if (!context.globalContext) {
      const now = new Date();
      context.globalContext = {
        currentDate: now.toISOString().split('T')[0],
        currentTime: now.toTimeString().split(' ')[0],
        currentDateTime: now.toISOString(),
        weekday: now.toLocaleDateString('de-DE', { weekday: 'long' }),
      };
    }

    // Resolve template in inputValue
    const resolvedValue = this.resolveTemplatePath(inputValue, context);
    
    if (!resolvedValue) {
      throw new Error(`Could not resolve inputValue: ${inputValue}`);
    }

    // Parse date
    const date = new Date(resolvedValue);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${resolvedValue}`);
    }

    // Perform calculation
    switch (operation) {
      case 'addWeeks':
        date.setDate(date.getDate() + amount * 7);
        break;
      case 'subtractWeeks':
        date.setDate(date.getDate() - amount * 7);
        break;
      case 'addDays':
        date.setDate(date.getDate() + amount);
        break;
      case 'subtractDays':
        date.setDate(date.getDate() - amount);
        break;
      case 'addMonths':
        date.setMonth(date.getMonth() + amount);
        break;
      case 'subtractMonths':
        date.setMonth(date.getMonth() - amount);
        break;
      case 'addYears':
        date.setFullYear(date.getFullYear() + amount);
        break;
      case 'subtractYears':
        date.setFullYear(date.getFullYear() - amount);
        break;
      default:
        throw new Error(`Unknown calculation operation: ${operation}`);
    }

    const result = date.toISOString().split('T')[0]; // YYYY-MM-DD format

    return {
      success: true,
      output: { result },
    };
  }

  /**
   * Recursively resolve all template expressions in an object
   */
  private resolveTemplatesInObject(obj: any, context: Record<string, any>): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'string') {
      return this.resolveTemplatePath(obj, context);
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.resolveTemplatesInObject(item, context));
    }

    if (typeof obj === 'object') {
      const resolved: Record<string, any> = {};
      for (const [key, value] of Object.entries(obj)) {
        resolved[key] = this.resolveTemplatesInObject(value, context);
      }
      return resolved;
    }

    return obj;
  }

  private resolveTemplatePath(path: string, context: Record<string, any>): any {
    if (!path) return undefined;

    // If it's not a string, return as-is
    if (typeof path !== 'string') return path;

    // Check if it's a pure template expression like {{NodeName.field.path}}
    const pureTemplateMatch = path.match(/^\{\{(.+)\}\}$/);
    if (pureTemplateMatch) {
      let fullPath = pureTemplateMatch[1].trim();

      // Handle the case where users include ".output." in the path
      fullPath = fullPath.replace(/\.output\./g, '.');
      fullPath = fullPath.replace(/\.output$/g, '');

      return this.getValueByPath(context, fullPath);
    }

    // Check if it contains any template expressions (mixed strings like "test{{Node.field}}")
    if (path.includes('{{') && path.includes('}}')) {
      return path.replace(/\{\{(.+?)\}\}/g, (match, expression) => {
        let fullPath = expression.trim();

        // Handle the case where users include ".output." in the path
        fullPath = fullPath.replace(/\.output\./g, '.');
        fullPath = fullPath.replace(/\.output$/g, '');

        const value = this.getValueByPath(context, fullPath);
        return value !== undefined ? String(value) : match;
      });
    }

    // No template syntax - return the string as-is
    return path;
  }

  private normalizeToCamelCase(label: string): string {
    const words = label.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    if (words.length === 0) return '';
    return words.map((word, index) => {
      if (index === 0) return word.charAt(0).toLowerCase() + word.slice(1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }

  private getValueByPath(obj: any, path: string): any {
    if (!obj || !path) return undefined;

    // Handle array bracket notation: convert persons[0] to persons.0
    const normalizedPath = path.replace(/\[(\d+)\]/g, '.$1');
    const parts = normalizedPath.split('.');
    
    // Check for context scopes first
    if (parts[0] === 'global' && obj.globalContext) {
      let current = obj.globalContext;
      for (let i = 1; i < parts.length; i++) {
        if (current === null || current === undefined) return undefined;
        current = current[parts[i]];
      }
      return current;
    }

    if (parts[0] === 'workflow' && obj.workflowContext) {
      let current = obj.workflowContext;
      for (let i = 1; i < parts.length; i++) {
        if (current === null || current === undefined) return undefined;
        current = current[parts[i]];
      }
      return current;
    }

    if (parts[0] === 'execution' && obj.executionContext) {
      let current = obj.executionContext;
      for (let i = 1; i < parts.length; i++) {
        if (current === null || current === undefined) return undefined;
        current = current[parts[i]];
      }
      return current;
    }
    
    // Try direct path first
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) {
        break;
      }
      current = current[part];
    }

    if (current !== undefined) {
      return current;
    }

    // Strategy 1: Search in nodeResults (workflow execution context)
    // Structure: { "node-id": { output: { ... } } }
    const remainingParts = parts.slice(1);
    const normalizedFirstPart = this.normalizeToCamelCase(parts[0]);
    
    // First, try to find node by name in workflowDefinition
    let targetNodeId: string | undefined;
    if (obj.workflowDefinition?.nodes) {
      for (const node of obj.workflowDefinition.nodes) {
        const normalizedNodeName = this.normalizeToCamelCase(node.name);
        if (normalizedNodeName === parts[0] || normalizedNodeName === normalizedFirstPart) {
          targetNodeId = node.id;
          break;
        }
      }
    }
    
    // If we found a matching node ID, look it up in nodeResults
    if (targetNodeId && obj.nodeResults?.[targetNodeId]) {
      const nodeResult = obj.nodeResults[targetNodeId];
      if (nodeResult && typeof nodeResult === 'object') {
        // Try with output field first (workflow execution context)
        if ('output' in nodeResult) {
          let current = (nodeResult as any).output;
          
          for (const part of remainingParts) {
            if (current === null || current === undefined) {
              break;
            }
            current = current[part];
          }
          
          if (current !== undefined) {
            return current;
          }
        }
      }
    }
    
    // Fallback: iterate through all nodeResults
    for (const [nodeId, nodeResult] of Object.entries(obj.nodeResults || {})) {
      // Check if this key matches either directly or after normalization
      const normalizedKey = this.normalizeToCamelCase(nodeId);
      const keyMatches = nodeId === parts[0] || normalizedKey === parts[0] || normalizedKey === normalizedFirstPart;
      
      if (keyMatches && nodeResult && typeof nodeResult === 'object') {
        // Try with output field first (workflow execution context)
        if ('output' in nodeResult) {
          let current = (nodeResult as any).output;
          
          for (const part of remainingParts) {
            if (current === null || current === undefined) {
              break;
            }
            current = current[part];
          }
          
          if (current !== undefined) {
            return current;
          }
        }
        
        // Try without output field (test context)
        let current: any = nodeResult;
        for (const part of remainingParts) {
          if (current === null || current === undefined) {
            break;
          }
          current = current[part];
        }
        
        if (current !== undefined) {
          return current;
        }
      }
    }
    
    // Test context: direct keys (no nodeResults)
    for (const [nodeId, nodeResult] of Object.entries(obj)) {
      // Check if this key matches either directly or after normalization
      const normalizedKey = this.normalizeToCamelCase(nodeId);
      const keyMatches = nodeId === parts[0] || normalizedKey === parts[0] || normalizedKey === normalizedFirstPart;
      
      if (keyMatches && nodeResult && typeof nodeResult === 'object') {
        // Try with output field first (workflow execution context)
        if ('output' in nodeResult) {
          let current = (nodeResult as any).output;
          
          for (const part of remainingParts) {
            if (current === null || current === undefined) {
              break;
            }
            current = current[part];
          }
          
          if (current !== undefined) {
            return current;
          }
        }
        
        // Try without output field (test context)
        let current: any = nodeResult;
        for (const part of remainingParts) {
          if (current === null || current === undefined) {
            break;
          }
          current = current[part];
        }
        
        if (current !== undefined) {
          return current;
        }
      }
    }

    // Strategy 2: Search in nested context objects (manual test context)
    // Structure: { "NodeName": { context: { "OtherNode": { ... } } } }
    for (const key of Object.keys(obj)) {
      if (obj[key]?.context) {
        const result = this.getValueByPath(obj[key].context, path);
        if (result !== undefined) {
          return result;
        }
      }
    }

    return undefined;
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
