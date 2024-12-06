import { Module } from '@nestjs/common';
import { AuthServiceProvider } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthRepositoryProvider } from './auth.repository';
import { AuditLogService } from 'src/common/services/auditLog.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthServiceProvider, AuthRepositoryProvider, AuditLogService],
})
export class AuthModule {}
