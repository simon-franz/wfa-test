import { Injectable } from '@nestjs/common';
import type { WorkflowDefinition, BaseNodeConfig } from 'shared/types';

interface XStateMachineConfig {
  id: string;
  initial: string;
  states: Record<string, XStateConfig>;
}

interface XStateConfig {
  on?: Record<string, string>;
  invoke?: {
    id: string;
    src: string;
    onDone?: string | { target: string; actions?: string };
    onError?: string | { target: string; actions?: string };
  };
  type?: 'final';
  meta?: {
    nodeId: string;
    nodeType: string;
    nodeConfig: Record<string, unknown>;
  };
}

@Injectable()
export class XStateGenerator {
  generateMachine(definition: WorkflowDefinition, workflowId: string): XStateMachineConfig {
    const states: Record<string, XStateConfig> = {};

    // Build adjacency list
    const adjacencyList = new Map<string, { nodeId: string; sourceHandle?: string }[]>();
    for (const node of definition.nodes) {
      adjacencyList.set(node.id, []);
    }
    for (const edge of definition.edges) {
      const connections = adjacencyList.get(edge.source) || [];
      connections.push({ nodeId: edge.target, sourceHandle: edge.sourceHandle });
      adjacencyList.set(edge.source, connections);
    }

    // Find trigger node
    const triggerNode = definition.nodes.find(
      (n) => n.type === 'manual-trigger' || n.type === 'scheduled-trigger',
    );

    if (!triggerNode) {
      throw new Error('No trigger node found');
    }

    // Generate states for each node
    for (const node of definition.nodes) {
      const connections = adjacencyList.get(node.id) || [];
      const state = this.generateNodeState(node, connections);
      states[this.getStateName(node.id)] = state;
    }

    // Add error and success final states
    states['__error__'] = { type: 'final' };
    states['__success__'] = { type: 'final' };

    // Find terminal nodes (nodes with no outgoing connections)
    for (const node of definition.nodes) {
      const connections = adjacencyList.get(node.id) || [];
      if (connections.length === 0) {
        const stateName = this.getStateName(node.id);
        const state = states[stateName];
        if (state.invoke && state.invoke.onDone) {
          // Change terminal nodes to go to success state
          if (typeof state.invoke.onDone === 'string') {
            state.invoke.onDone = '__success__';
          } else {
            state.invoke.onDone.target = '__success__';
          }
        }
      }
    }

    return {
      id: workflowId,
      initial: this.getStateName(triggerNode.id),
      states,
    };
  }

  private generateNodeState(
    node: BaseNodeConfig,
    connections: { nodeId: string; sourceHandle?: string }[],
  ): XStateConfig {
    const stateName = this.getStateName(node.id);

    // For condition nodes, handle branching
    if (node.type === 'condition') {
      const trueTarget = connections.find((c) => c.sourceHandle === 'true');
      const falseTarget = connections.find((c) => c.sourceHandle === 'false');

      return {
        invoke: {
          id: `invoke_${node.id}`,
          src: `execute_${node.type}`,
          onDone: {
            target: '__success__', // Will be overridden by transition logic
            actions: 'updateContext',
          },
          onError: {
            target: '__error__',
            actions: 'handleError',
          },
        },
        on: {
          CONDITION_TRUE: trueTarget ? this.getStateName(trueTarget.nodeId) : '__success__',
          CONDITION_FALSE: falseTarget ? this.getStateName(falseTarget.nodeId) : '__success__',
        },
        meta: {
          nodeId: node.id,
          nodeType: node.type,
          nodeConfig: node.config,
        },
      };
    }

    // For regular nodes
    const nextTarget =
      connections.length > 0 ? this.getStateName(connections[0].nodeId) : '__success__';

    return {
      invoke: {
        id: `invoke_${node.id}`,
        src: `execute_${node.type}`,
        onDone: {
          target: nextTarget,
          actions: 'updateContext',
        },
        onError: {
          target: '__error__',
          actions: 'handleError',
        },
      },
      meta: {
        nodeId: node.id,
        nodeType: node.type,
        nodeConfig: node.config,
      },
    };
  }

  private getStateName(nodeId: string): string {
    // XState state names should be valid identifiers
    return `node_${nodeId.replace(/-/g, '_')}`;
  }

  // Generate a visual representation of the state machine (for debugging)
  generateVisualization(config: XStateMachineConfig): string {
    let output = `State Machine: ${config.id}\n`;
    output += `Initial: ${config.initial}\n\n`;
    output += 'States:\n';

    for (const [name, state] of Object.entries(config.states)) {
      output += `  ${name}`;
      if (state.type === 'final') {
        output += ' (final)';
      }
      output += '\n';

      if (state.invoke) {
        output += `    -> invoke: ${state.invoke.src}\n`;
        if (state.invoke.onDone) {
          const target =
            typeof state.invoke.onDone === 'string'
              ? state.invoke.onDone
              : state.invoke.onDone.target;
          output += `    -> onDone: ${target}\n`;
        }
      }

      if (state.on) {
        for (const [event, target] of Object.entries(state.on)) {
          output += `    -> on ${event}: ${target}\n`;
        }
      }
    }

    return output;
  }
}
