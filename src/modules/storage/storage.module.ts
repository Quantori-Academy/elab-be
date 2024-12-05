import { Module } from '@nestjs/common';
import { StorageServiceProvider } from './storage.service';
import { StorageController } from './storage.controller';
import { StorageRepositoryProvider } from './storage.repository';
import { RoomModule } from '../room/room.module';
import { AuditLogService } from 'src/common/services/auditLog.service';

@Module({
  imports: [RoomModule],
  controllers: [StorageController],
  providers: [StorageServiceProvider, StorageRepositoryProvider, AuditLogService],
  exports: [StorageServiceProvider],
})
export class StorageModule {}
