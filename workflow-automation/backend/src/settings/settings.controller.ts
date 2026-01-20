import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettingsService } from './settings.service';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Post('hrworks')
  async saveHRWorksSettings(
    @Request() req: any,
    @Body() body: { apiKey: string; apiSecret: string; tenant: string },
  ) {
    await this.settingsService.saveHRWorksSettings(
      req.user.tenantId,
      body.apiKey,
      body.apiSecret,
      body.tenant,
    );
    return { success: true };
  }

  @Get('hrworks')
  async getHRWorksSettings(@Request() req: any) {
    return this.settingsService.getHRWorksSettings(req.user.tenantId);
  }
}
