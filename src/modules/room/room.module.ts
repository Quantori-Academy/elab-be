import { Module } from '@nestjs/common';
import { RoomServiceProvider } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepositoryProvider } from './room.repository';
import { AuditLogService } from 'src/common/services/auditLog.service';

@Module({
  controllers: [RoomController],
  providers: [RoomServiceProvider, RoomRepositoryProvider, AuditLogService],
  exports: [RoomServiceProvider, RoomRepositoryProvider],
})
export class RoomModule {}
