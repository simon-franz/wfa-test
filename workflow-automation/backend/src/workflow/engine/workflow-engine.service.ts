import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import type { WorkflowDefinition, ExecutionContext, NodeExecutionResult, BaseNodeConfig } from 'shared/types';
import { NodeRegistry } from '../nodes/node-registry';
import { createNodeResult } from '../nodes/base-node';
import { ExecutionService } from '../execution/execution.service';

@Injectable()
export class WorkflowEngineService {
  private readonly logger = new Logger(WorkflowEngineService.name);

  constructor(
    private nodeRegistry: NodeRegistry,
    @Inject(forwardRef(() => ExecutionService))
    private executionService: ExecutionService,
  ) {}

  async executeWorkflow(
    definition: WorkflowDefinition,
    context: ExecutionContext,
  ): Promise<ExecutionContext> {
    this.logger.log(`Starting workflow execution: ${context.executionId}`);

    // Add workflow definition to context for label-to-id mapping
    context.workflowDefinition = definition;

    // Add global context with system variables
    const now = new Date();
    context.globalContext = {
      currentDate: now.toISOString().split('T')[0],
      currentTime: now.toTimeString().split(' ')[0],
      currentDateTime: now.toISOString(),
      weekday: now.toLocaleDateString('de-DE', { weekday: 'long' }),
    };

    // Add workflow context
    context.workflowContext = {
      name: definition.nodes[0]?.name || 'Unnamed Workflow', // TODO: Get from workflow metadata
      id: context.workflowId,
      variables: {}, // TODO: Load from workflow settings
    };

    // Add execution context
    context.executionContext = {
      variables: {},
    };

    // Find trigger node (entry point)
    const triggerNode = definition.nodes.find(
      (n) => n.type === 'manual-trigger' || n.type === 'scheduled-trigger',
    );

    if (!triggerNode) {
      throw new Error('No trigger node found in workflow');
    }

    // Build adjacency list for traversal
    const adjacencyList = this.buildAdjacencyList(definition);

    // Track executed nodes
    const executedNodes = new Set<string>();

    // Execute nodes starting from trigger
    await this.executeNode(triggerNode, definition, adjacencyList, context, executedNodes);

    this.logger.log(`Workflow execution completed: ${context.executionId}`);
    return context;
  }

  async resumeWorkflow(
    definition: WorkflowDefinition,
    context: ExecutionContext,
    fromNodeId: string,
  ): Promise<ExecutionContext> {
    this.logger.log(`Resuming workflow execution: ${context.executionId} from node: ${fromNodeId}`);

    // Add workflow definition to context
    context.workflowDefinition = definition;

    // Build adjacency list
    const adjacencyList = this.buildAdjacencyList(definition);

    // Track already executed nodes from context
    const executedNodes = new Set<string>(
      Object.keys(context.nodeResults).filter(
        (nodeId) => context.nodeResults[nodeId].status === 'completed',
      ),
    );

    // Get next nodes after the waiting node
    const connections = adjacencyList.get(fromNodeId) || [];
    const nextNodeIds = connections.map((c) => c.nodeId);
    const nextNodes = definition.nodes.filter((n) => nextNodeIds.includes(n.id));

    // Execute next nodes
    for (const nextNode of nextNodes) {
      await this.executeNode(nextNode, definition, adjacencyList, context, executedNodes);
    }

    this.logger.log(`Workflow resumed and completed: ${context.executionId}`);
    return context;
  }

  private buildAdjacencyList(
    definition: WorkflowDefinition,
  ): Map<string, { nodeId: string; sourceHandle?: string }[]> {
    const adjacencyList = new Map<string, { nodeId: string; sourceHandle?: string }[]>();

    // Initialize empty arrays for all nodes
    for (const node of definition.nodes) {
      adjacencyList.set(node.id, []);
    }

    // Build connections from edges
    for (const edge of definition.edges) {
      const connections = adjacencyList.get(edge.source) || [];
      connections.push({
        nodeId: edge.target,
        sourceHandle: edge.sourceHandle,
      });
      adjacencyList.set(edge.source, connections);
    }

    return adjacencyList;
  }

  private getIncomingEdges(
    nodeId: string,
    definition: WorkflowDefinition,
  ): { source: string; sourceHandle?: string }[] {
    return definition.edges
      .filter((edge) => edge.target === nodeId)
      .map((edge) => ({ source: edge.source, sourceHandle: edge.sourceHandle }));
  }

  private isPathReachable(nodeId: string, definition: WorkflowDefinition, context: ExecutionContext, visited = new Set<string>()): boolean {
    if (visited.has(nodeId)) return false;
    visited.add(nodeId);
    
    if (context.nodeResults[nodeId]?.status === 'completed') return true;
    
    const incomingEdges = this.getIncomingEdges(nodeId, definition);
    if (incomingEdges.length === 0) return false;
    
    return incomingEdges.some(edge => {
      const sourceNode = definition.nodes.find(n => n.id === edge.source);
      if (sourceNode?.type === 'condition' && edge.sourceHandle) {
        const result = context.nodeResults[edge.source];
        if (result?.nextNodes && !result.nextNodes.includes(edge.sourceHandle)) {
          return false;
        }
      }
      return this.isPathReachable(edge.source, definition, context, visited);
    });
  }

  private isNodeReady(
    nodeId: string,
    definition: WorkflowDefinition,
    executedNodes: Set<string>,
    context: ExecutionContext,
  ): boolean {
    const incomingEdges = this.getIncomingEdges(nodeId, definition);

    this.logger.debug(`Node ${nodeId}: Checking readiness, incoming edges: ${incomingEdges.length}`);

    if (incomingEdges.length === 0) return true;

    const allSourcesAreConditions = incomingEdges.every((edge) => {
      const sourceNode = definition.nodes.find((n) => n.id === edge.source);
      return sourceNode?.type === 'condition';
    });

    this.logger.debug(`Node ${nodeId}: All sources are conditions: ${allSourcesAreConditions}`);

    const edgeStatus = incomingEdges.map((edge) => {
      if (!executedNodes.has(edge.source)) {
        this.logger.debug(`Node ${nodeId}: Source ${edge.source} not executed yet`);
        
        if (!this.isPathReachable(edge.source, definition, context)) {
          this.logger.debug(`Node ${nodeId}: Source ${edge.source} is unreachable (blocked by condition)`);
          return { edge, ready: false, skip: true };
        }
        
        return { edge, ready: false, skip: false };
      }

      const sourceNode = definition.nodes.find((n) => n.id === edge.source);
      const isConditionNode = sourceNode?.type === 'condition';

      if (isConditionNode && edge.sourceHandle) {
        const sourceResult = context.nodeResults[edge.source];
        if (!sourceResult) {
          this.logger.debug(`Node ${nodeId}: Source ${edge.source} has no result`);
          return { edge, ready: false, skip: false };
        }

        const nextNodes = sourceResult.nextNodes;
        const hasNextNodes = nextNodes && Array.isArray(nextNodes);
        const handleMatches = hasNextNodes && nextNodes.includes(edge.sourceHandle);
        this.logger.debug(`Node ${nodeId}: Checking handle ${edge.sourceHandle} from ${edge.source}, nextNodes: ${JSON.stringify(nextNodes)}, matches: ${handleMatches}`);
        
        if (!handleMatches) {
          return { edge, ready: false, skip: true };
        }
        return { edge, ready: true, skip: false };
      }

      this.logger.debug(`Node ${nodeId}: Source ${edge.source} ready (executed)`);
      return { edge, ready: true, skip: false };
    });

    const activeEdges = edgeStatus.filter(e => !e.skip);
    const readyEdges = activeEdges.filter(e => e.ready);

    if (allSourcesAreConditions) {
      const ready = readyEdges.length > 0;
      this.logger.debug(`Node ${nodeId}: OR-Join ready = ${ready} (${readyEdges.length}/${activeEdges.length} active edges ready)`);
      return ready;
    } else {
      const ready = readyEdges.length === activeEdges.length && activeEdges.length > 0;
      this.logger.debug(`Node ${nodeId}: AND-Join ready = ${ready} (${readyEdges.length}/${activeEdges.length} active edges ready, ${edgeStatus.length - activeEdges.length} skipped)`);
      return ready;
    }
  }

  private async executeNode(
    nodeConfig: BaseNodeConfig,
    definition: WorkflowDefinition,
    adjacencyList: Map<string, { nodeId: string; sourceHandle?: string }[]>,
    context: ExecutionContext,
    executedNodes: Set<string>,
  ): Promise<void> {
    const nodeId = nodeConfig.id;

    // Check if already executed
    if (executedNodes.has(nodeId)) {
      return;
    }

    // Check if node is ready (all required predecessors executed)
    if (!this.isNodeReady(nodeId, definition, executedNodes, context)) {
      this.logger.debug(`Node not ready yet: ${nodeId}, skipping`);
      return;
    }

    this.logger.debug(`Executing node: ${nodeId} (${nodeConfig.type})`);

    // Get node implementation
    const node = this.nodeRegistry.getNode(nodeConfig.type);
    if (!node) {
      const result = createNodeResult(nodeId, 'failed', undefined, `Unknown node type: ${nodeConfig.type}`);
      context.nodeResults[nodeId] = result;
      throw new Error(`Unknown node type: ${nodeConfig.type}`);
    }

    // Mark as running
    context.nodeResults[nodeId] = createNodeResult(nodeId, 'running');
    
    // Send SSE update for running state
    if (context.tenantId && context.executionId) {
      await this.executionService.updateStatus(
        context.tenantId,
        context.executionId,
        'running',
        context,
      );
    }

    try {
      const startTime = Date.now();

      // Execute the node
      const output = await node.execute({
        config: nodeConfig,
        context,
      });

      const endTime = Date.now();

      // Check if node wants to wait (delay/approval)
      if (output.waitUntil) {
        const result: NodeExecutionResult = {
          nodeId,
          status: 'waiting',
          output: output.output,
          startedAt: new Date(startTime),
          duration: endTime - startTime,
        };

        context.nodeResults[nodeId] = result;

        this.logger.log(`Node waiting: ${nodeId} until ${new Date(output.waitUntil).toISOString()}`);

        // Save state to DB
        if (context.tenantId && context.executionId) {
          await this.executionService.updateStatus(
            context.tenantId,
            context.executionId,
            'waiting',
            context,
          );

          // Create delayed job to resume workflow
          const delayMs = output.waitUntil - Date.now();
          await this.executionService.resumeWorkflowAfterDelay(
            context.tenantId,
            context.executionId,
            nodeId,
            delayMs,
          );
        }

        // Stop execution here - will be resumed by delayed job
        return;
      }

      // Update result
      const result: NodeExecutionResult = {
        nodeId,
        status: 'completed',
        output: output.output,
        nextNodes: output.nextNodes, // Store which handles were activated
        startedAt: new Date(startTime),
        completedAt: new Date(endTime),
        duration: endTime - startTime,
      };

      context.nodeResults[nodeId] = result;

      // Mark node as executed
      executedNodes.add(nodeId);

      this.logger.debug(`Node completed: ${nodeId} in ${result.duration}ms`);

      // Send SSE update for completed node
      if (context.tenantId && context.executionId) {
        await this.executionService.updateStatus(
          context.tenantId,
          context.executionId,
          'running',
          context,
        );
      }

      // Get next nodes to execute
      const connections = adjacencyList.get(nodeId) || [];
      const nextNodes = this.getNextNodes(connections, output.nextNodes, definition);

      // Execute next nodes
      for (const nextNodeConfig of nextNodes) {
        await this.executeNode(nextNodeConfig, definition, adjacencyList, context, executedNodes);
      }
    } catch (error) {
      const result: NodeExecutionResult = {
        nodeId,
        status: 'failed',
        error: (error as Error).message,
        startedAt: context.nodeResults[nodeId].startedAt,
        completedAt: new Date(),
      };

      context.nodeResults[nodeId] = result;

      this.logger.error(`Node failed: ${nodeId}`, error);
      throw error;
    }
  }

  private getNextNodes(
    connections: { nodeId: string; sourceHandle?: string }[],
    selectedHandles: string[] | undefined,
    definition: WorkflowDefinition,
  ): BaseNodeConfig[] {
    let nextNodeIds: string[];

    if (selectedHandles && selectedHandles.length > 0) {
      // For conditional nodes, only follow the selected handles
      nextNodeIds = connections
        .filter((c) => !c.sourceHandle || selectedHandles.includes(c.sourceHandle))
        .map((c) => c.nodeId);
    } else {
      // For regular nodes, follow all connections
      nextNodeIds = connections.map((c) => c.nodeId);
    }

    return definition.nodes.filter((n) => nextNodeIds.includes(n.id));
  }

  // Validate workflow definition
  validateDefinition(definition: WorkflowDefinition): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for at least one trigger
    const triggers = definition.nodes.filter(
      (n) => n.type === 'manual-trigger' || n.type === 'scheduled-trigger',
    );

    if (triggers.length === 0) {
      errors.push('Workflow must have at least one trigger node');
    }

    if (triggers.length > 1) {
      errors.push('Workflow can only have one trigger node');
    }

    // Check all node types are valid
    for (const node of definition.nodes) {
      const nodeImpl = this.nodeRegistry.getNode(node.type);
      if (!nodeImpl) {
        errors.push(`Unknown node type: ${node.type}`);
      } else {
        const validation = nodeImpl.validate(node);
        errors.push(...validation.errors);
      }
    }

    // Check for orphan nodes (not connected to anything)
    const connectedNodes = new Set<string>();
    for (const edge of definition.edges) {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    }

    // Trigger is allowed to be a source only
    const triggerIds = triggers.map((t) => t.id);

    for (const node of definition.nodes) {
      if (!triggerIds.includes(node.id) && !connectedNodes.has(node.id)) {
        errors.push(`Node "${node.name}" (${node.id}) is not connected`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
