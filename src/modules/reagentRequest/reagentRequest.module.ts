import { Module } from '@nestjs/common';
import { ReagentRequestController } from './reagentRequest.controller';
import { RequestServiceProvider } from './reagentRequest.service';
import { RequestRepositoryProvider } from './reagentRequest.repository';
import { AuditLogService } from 'src/common/services/auditLog.service';

@Module({
  providers: [RequestServiceProvider, RequestRepositoryProvider, AuditLogService],
  controllers: [ReagentRequestController],
  exports: [RequestRepositoryProvider],
})
export class ReagentRequestModule {}
