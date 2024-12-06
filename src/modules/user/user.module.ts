import { Module } from '@nestjs/common';
import { UserServiceProvider } from './user.service';
import { UserRepositoryProvider } from './user.repository';
import { UserController } from './user.controller';
import { EmailService } from '../../common/services/email/email.service';
import { AuditLogService } from 'src/common/services/auditLog.service';

@Module({
  controllers: [UserController],
  providers: [UserServiceProvider, UserRepositoryProvider, EmailService, AuditLogService],
  exports: [UserServiceProvider],
})
export class UserModule {}
