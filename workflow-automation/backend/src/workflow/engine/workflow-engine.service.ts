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

  private isNodeReady(
    nodeId: string,
    definition: WorkflowDefinition,
    executedNodes: Set<string>,
  ): boolean {
    const incomingEdges = this.getIncomingEdges(nodeId, definition);

    // No incoming edges → always ready (e.g., trigger node)
    if (incomingEdges.length === 0) {
      return true;
    }

    // Check if all source nodes are condition nodes
    const allSourcesAreConditions = incomingEdges.every((edge) => {
      const sourceNode = definition.nodes.find((n) => n.id === edge.source);
      return sourceNode?.type === 'condition';
    });

    if (allSourcesAreConditions) {
      // OR-Join: At least ONE source must be executed
      return incomingEdges.some((edge) => executedNodes.has(edge.source));
    } else {
      // AND-Join: ALL sources must be executed
      return incomingEdges.every((edge) => executedNodes.has(edge.source));
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
    if (!this.isNodeReady(nodeId, definition, executedNodes)) {
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

      // Update result
      const result: NodeExecutionResult = {
        nodeId,
        status: 'completed',
        output: output.output,
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
