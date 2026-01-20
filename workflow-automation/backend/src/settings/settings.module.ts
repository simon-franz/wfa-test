import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
