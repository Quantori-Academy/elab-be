import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { EmailService } from '../email/email.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailService],
  exports: [UserService],
})
export class UserModule {}
