import { Module } from '@nestjs/common';
import { AuthServiceProvider } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthServiceProvider, AuthRepository],
})
export class AuthModule {}
