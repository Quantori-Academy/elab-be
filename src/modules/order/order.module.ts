import { Module } from '@nestjs/common';
import { OrderServiceProvider } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepositoryProvider } from './order.repository';
import { AuditLogService } from 'src/common/services/auditLog.service';

@Module({
  controllers: [OrderController],
  providers: [OrderServiceProvider, OrderRepositoryProvider, AuditLogService],
  exports: [OrderServiceProvider],
})
export class OrderModule {}
