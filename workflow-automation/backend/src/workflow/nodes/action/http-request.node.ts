import { Injectable } from '@nestjs/common';
import { BaseNode, type NodeExecutionInput, type NodeExecutionOutput } from '../base-node';
import { ExpressionService } from '../../expression/expression.service';

interface HttpRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
  retries?: number;
}

@Injectable()
export class HttpRequestNode extends BaseNode {
  readonly type = 'http-request';
  readonly category = 'action' as const;

  constructor(private expressionService: ExpressionService) {
    super();
  }

  async execute(input: NodeExecutionInput): Promise<NodeExecutionOutput> {
    const config = input.config.config as unknown as HttpRequestConfig;

    // Interpolate expressions in URL
    const url = await this.expressionService.interpolate(config.url, input.context);

    // Interpolate expressions in headers
    const headers: Record<string, string> = {};
    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        headers[key] = await this.expressionService.interpolate(value, input.context);
      }
    }

    // Interpolate expressions in body
    let body: string | undefined;
    if (config.body) {
      body = await this.expressionService.interpolate(config.body, input.context);
    }

    const timeout = config.timeout || 30000;
    const maxRetries = config.retries || 0;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method: config.method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: body,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        let responseBody: unknown;
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
          responseBody = await response.json();
        } else {
          responseBody = await response.text();
        }

        return {
          output: {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: responseBody,
            ok: response.ok,
          },
        };
      } catch (error) {
        lastError = error as Error;

        if (attempt < maxRetries) {
          // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    }

    throw lastError || new Error('HTTP request failed');
  }

  getDefaultConfig(): Record<string, unknown> {
    return {
      method: 'GET',
      url: '',
      headers: {},
      timeout: 30000,
      retries: 0,
    };
  }

  getConfigSchema() {
    return {
      type: 'object',
      required: ['method', 'url'],
      properties: {
        method: {
          type: 'string',
          title: 'HTTP Method',
          enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          default: 'GET',
        },
        url: {
          type: 'string',
          title: 'URL',
          description: 'Request URL. Supports expressions like {{$nodes.prevNode.output.id}}',
        },
        headers: {
          type: 'object',
          title: 'Headers',
          description: 'HTTP headers',
          additionalProperties: { type: 'string' },
        },
        body: {
          type: 'string',
          title: 'Body',
          description: 'Request body (for POST/PUT/PATCH). Supports expressions.',
        },
        timeout: {
          type: 'number',
          title: 'Timeout (ms)',
          default: 30000,
          minimum: 1000,
          maximum: 300000,
        },
        retries: {
          type: 'number',
          title: 'Retries',
          default: 0,
          minimum: 0,
          maximum: 5,
        },
      },
    };
  }
}
