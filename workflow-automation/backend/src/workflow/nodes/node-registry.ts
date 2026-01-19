import { Injectable } from '@nestjs/common';
import { BaseNode } from './base-node';
import { ManualTriggerNode } from './trigger/manual-trigger.node';
import { ScheduledTriggerNode } from './trigger/scheduled-trigger.node';
import { HttpRequestNode } from './action/http-request.node';
import { ConditionNode } from './action/condition.node';
import { DelayNode } from './action/delay.node';

@Injectable()
export class NodeRegistry {
  private nodes: Map<string, BaseNode> = new Map();

  constructor(
    manualTrigger: ManualTriggerNode,
    scheduledTrigger: ScheduledTriggerNode,
    httpRequest: HttpRequestNode,
    condition: ConditionNode,
    delay: DelayNode,
  ) {
    this.registerNode(manualTrigger);
    this.registerNode(scheduledTrigger);
    this.registerNode(httpRequest);
    this.registerNode(condition);
    this.registerNode(delay);
  }

  private registerNode(node: BaseNode) {
    this.nodes.set(node.type, node);
  }

  getNode(type: string): BaseNode | undefined {
    return this.nodes.get(type);
  }

  getAllNodes(): BaseNode[] {
    return Array.from(this.nodes.values());
  }

  getNodesByCategory(category: 'trigger' | 'action' | 'logic'): BaseNode[] {
    return this.getAllNodes().filter((node) => node.category === category);
  }

  getAvailableNodeTypes(): { type: string; category: string; configSchema: Record<string, unknown> }[] {
    return this.getAllNodes().map((node) => ({
      type: node.type,
      category: node.category,
      configSchema: node.getConfigSchema(),
    }));
  }
}
