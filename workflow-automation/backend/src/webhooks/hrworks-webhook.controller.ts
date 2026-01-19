import {
  Controller,
  Post,
  Body,
  Headers,
  Param,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { HrworksWebhookService } from './hrworks-webhook.service';
import type { HRWorksWebhookPayload } from 'shared/types';

@Controller('webhooks/hrworks')
export class HrworksWebhookController {
  constructor(private webhookService: HrworksWebhookService) {}

  @Post(':tenantId')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Param('tenantId') tenantId: string,
    @Headers('x-hrworks-signature') signature: string,
    @Body() payload: HRWorksWebhookPayload,
    @Req() req: RawBodyRequest<Request>,
  ) {
    // Get raw body for signature verification
    const rawBody = req.rawBody?.toString() || JSON.stringify(payload);

    // Verify signature
    const isValid = await this.webhookService.verifySignature(tenantId, rawBody, signature);
    if (!isValid) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    // Process the webhook
    await this.webhookService.processWebhook(tenantId, payload);

    return { received: true };
  }
}
